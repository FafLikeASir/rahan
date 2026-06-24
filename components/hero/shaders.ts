// GLSL strings for the fractal glass gradient hero background.
// Adapted from https://github.com/franky-adl/fractal-glass-gradients (MIT)
// Changes: warm dark palette, uMouse parallax, background #1f1f1f.

// ─── Simplex noise 2D (Ashima Arts, MIT) ──────────────────────────────────────
const SNOISE_2D = `
vec3 mod289_3(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289_2(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289_3(((x * 34.0) + 10.0) * x); }
float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289_2(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}
`

// ─── Vertex shader — main pass ────────────────────────────────────────────────
export const VERTEX = /* glsl */`
uniform vec2 uResolution;
uniform vec2 uGrainTextureSize;
uniform float uPixelRatio;

varying vec2 vUv;
varying vec2 vUvA;
varying vec3 vPos;

void main() {
  vUv = uv;
  vPos = position;
  float aspect = uResolution.x / uResolution.y;
  if (aspect < 1.0 || aspect > 2.3) {
    vUvA = uResolution * uPixelRatio / uGrainTextureSize * uv;
  } else {
    vUvA = uv;
  }
  gl_Position = vec4(position, 1.0);
}
`

// ─── Vertex shader — noise pass (minimal, vUvA = uv) ─────────────────────────
export const NOISE_VERTEX = /* glsl */`
varying vec2 vUvA;
void main() {
  vUvA = uv;
  gl_Position = vec4(position, 1.0);
}
`

// ─── Noise fragment (simplex noise → animated warp map) ───────────────────────
export const NOISE_FRAGMENT = /* glsl */`
${SNOISE_2D}

uniform float uTime;
uniform float uNoiseScaleX;
uniform float uNoiseScaleY;
uniform float uWarpSpeed;
varying vec2 vUvA;

void main() {
  float t = uTime * uWarpSpeed;
  float nx = snoise(vUvA * vec2(uNoiseScaleX, uNoiseScaleY) + t * 0.5);
  float ny = snoise(vUvA * vec2(uNoiseScaleX, uNoiseScaleY) * 0.93 - t * 0.3);
  gl_FragColor = vec4(nx * 0.5 + 0.5, ny * 0.5 + 0.5, 0.0, 1.0);
}
`

// ─── Main fragment (Gaussian ellipses + fluted glass + grain + tone mapping) ──
// Adaptation: warm dark palette (#1f1f1f bg), uMouse parallax, GaussianEllipses only.
export const FRAGMENT = /* glsl */`
#define PI 3.14159265359

uniform float uPixelRatio;
uniform float uTime;
uniform vec2 uResolution;
uniform float uWarpStrength;
uniform sampler2D uNoiseMap;
uniform sampler2D uGrainTexture;
uniform float uGrainStrength;
uniform float uFluteWidth;
uniform float uFluteStrength;
uniform float uToneMapExposure;
uniform vec3 uC1;
uniform vec3 uC2;
uniform vec3 uC3;
uniform vec3 uC4;
uniform vec3 uC5;
uniform int uAlgo;
varying vec2 vUv;
varying vec2 vUvA;

vec2 rotate2d(vec2 v, float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat2(c, -s, s, c) * v;
}

vec3 GaussianBlobs(vec2 uv) {
  float t = uTime * 0.6 + 3.5;
  vec2 p1 = vec2(-0.28 + sin(t * 0.7 + 0.5) * 0.15,  0.06 + cos(t * 0.5) * 0.12);
  vec2 p2 = vec2(-0.06 + sin(t * 0.4 + 1.2) * 0.18,  0.16 + cos(t * 0.6) * 0.15);
  vec2 p3 = vec2( 0.07 + sin(t * 0.5 + 3.4) * 0.2,   0.00 + cos(t * 0.4) * 0.14);
  vec2 p4 = vec2( 0.22 + sin(t * 0.3 + 2.3) * 0.24, -0.10 + cos(t * 0.7) * 0.14);
  vec2 p5 = vec2( 0.30 + sin(t * 0.6 + 1.1) * 0.18,  0.06 + cos(t * 0.4) * 0.13);
  vec2 warpNoise = texture2D(uNoiseMap, vUv).rg * 2.0 - 1.0;
  vec2 warpedUv = uv + warpNoise * uWarpStrength;
  float d1 = dot(warpedUv - p1, warpedUv - p1);
  float d2 = dot(warpedUv - p2, warpedUv - p2);
  float d3 = dot(warpedUv - p3, warpedUv - p3);
  float d4 = dot(warpedUv - p4, warpedUv - p4);
  float d5 = dot(warpedUv - p5, warpedUv - p5);
  // warm dark base (#1f1f1f)
  vec3 color = vec3(0.122, 0.122, 0.122);
  color += uC1 * exp(-d1 * 12.0) * 1.4;
  color += uC2 * exp(-d2 * 20.0) * 2.0;
  color += uC3 * exp(-d3 *  9.0) * 1.6;
  color += uC4 * exp(-d4 * 15.0) * 1.3;
  color += uC5 * exp(-d5 * 25.0) * 0.8;
  return color;
}

vec3 GaussianEllipses(vec2 uv) {
  float t = uTime * 0.6 + 3.5;
  vec2 p1 = vec2(-0.32 + sin(t * 0.5 + 1.8) * 0.20, -0.12 + cos(t * 0.8 + 0.3) * 0.16);
  vec2 p2 = vec2( 0.10 + sin(t * 0.6 + 2.5) * 0.14,  0.24 + cos(t * 0.3 + 1.7) * 0.18);
  vec2 p3 = vec2(-0.15 + sin(t * 0.9 + 0.7) * 0.22, -0.08 + cos(t * 0.5 + 2.9) * 0.11);
  vec2 p4 = vec2( 0.28 + sin(t * 0.4 + 3.1) * 0.17,  0.18 + cos(t * 0.6 + 0.9) * 0.20);
  vec2 p5 = vec2(-0.05 + sin(t * 0.7 + 4.2) * 0.13, -0.20 + cos(t * 0.9 + 1.5) * 0.15);
  vec2 warpNoise = texture2D(uNoiseMap, vUv).rg * 2.0 - 1.0;
  vec2 warpedUv = uv + vec2(warpNoise.r * uWarpStrength, warpNoise.g * uWarpStrength * 0.2);
  vec2 dv1 = warpedUv - p1;
  vec2 dv2 = warpedUv - p2;
  vec2 dv3 = warpedUv - p3;
  vec2 dv4 = warpedUv - p4;
  vec2 dv5 = warpedUv - p5;
  vec2 r1 = rotate2d(dv1,  0.3);
  vec2 r2 = rotate2d(dv2, -1.1);
  vec2 r3 = rotate2d(dv3,  0.8);
  vec2 r4 = rotate2d(dv4, -0.5);
  vec2 r5 = rotate2d(dv5,  1.4);
  float e1 = r1.x * r1.x *  8.0 + r1.y * r1.y *  1.0;
  float e2 = r2.x * r2.x * 25.0 + r2.y * r2.y * 12.0;
  float e3 = r3.x * r3.x *  6.0 + r3.y * r3.y * 14.0;
  float e4 = r4.x * r4.x * 20.0 + r4.y * r4.y *  8.0;
  float e5 = r5.x * r5.x * 30.0 + r5.y * r5.y * 15.0;
  // warm dark base (#1f1f1f)
  vec3 color = vec3(0.122, 0.122, 0.122);
  color += uC1 * exp(-e1) * 1.4;
  color += uC2 * exp(-e2) * 2.0;
  color += uC3 * exp(-e3) * 1.6;
  color += uC4 * exp(-e4) * 1.3;
  color += uC5 * exp(-e5) * 0.8;
  return color;
}

void main() {
  vec2 mappedCoords = gl_FragCoord.xy / uPixelRatio - uResolution * 0.5;

  vec2 scaledUv = mappedCoords / vec2(uFluteWidth);
  vec2 fractUv  = vec2(fract(scaledUv.x), scaledUv.y);
  float flutedX = uFluteStrength * (fractUv.x - 0.5);
  float flutedY = -uFluteStrength * atanh(pow(fractUv.x, 6.0));
  vec2 flutedCoords = vec2(mappedCoords.x + flutedX, mappedCoords.y + flutedY);
  vec2 flutedUv = flutedCoords / 1000.0;

  vec3 color = (uAlgo == 0) ? GaussianBlobs(flutedUv) : GaussianEllipses(flutedUv);

  // Exponential tone mapping
  color = 1.0 - exp(-color * uToneMapExposure);

  // Film grain
  float grain = texture2D(uGrainTexture, vUvA).r * 2.0 - 1.0;
  color += grain * uGrainStrength * max(color.r, max(color.g, color.b));
  color = clamp(color, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
`
