'use client'

import { useEffect, useRef } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { Suspense } from 'react'
import * as THREE from 'three'
import { VERTEX, NOISE_VERTEX, NOISE_FRAGMENT, FRAGMENT } from './shaders'

// ─── Warm dark palette (orange #fb3706 + rust + espresso) ────────────────────
const PALETTE = [
  [0.984, 0.216, 0.024], // #fb3706 — signature orange
  [0.900, 0.350, 0.050], // warm amber
  [0.600, 0.130, 0.010], // deep orange-red
  [0.490, 0.200, 0.055], // ~#7D330E — rouille warm
  [0.220, 0.078, 0.018], // ~#381404 — espresso profond
] as const

// Hardcoded to "Flow-like" preset from the source repo
const NOISE_SCALE_X    = 0.35
const NOISE_SCALE_Y    = 0.55
const WARP_STRENGTH    = 0.4
const WARP_SPEED       = 0.12
const FLUTE_WIDTH      = 70.0
const FLUTE_STRENGTH   = 140.0
const TONE_MAP_EXPOSURE = 0.9
const GRAIN_STRENGTH   = 0.2

// ─── Inner scene component (must be inside <Canvas>) ─────────────────────────
interface SceneProps {
  reducedMotion: boolean
  onLoad?: () => void
}

function FractalScene({ reducedMotion, onLoad }: SceneProps) {
  const { gl, size } = useThree()

  // Noise FBO refs
  const noiseUniformsRef = useRef({
    uTime:        { value: 0 },
    uNoiseScaleX: { value: NOISE_SCALE_X },
    uNoiseScaleY: { value: NOISE_SCALE_Y },
    uWarpSpeed:   { value: WARP_SPEED },
  })
  const noiseFBORef    = useRef<THREE.WebGLRenderTarget | null>(null)
  const noiseSceneRef  = useRef<THREE.Scene | null>(null)
  const noiseCameraRef = useRef<THREE.OrthographicCamera | null>(null)

  // Grain texture — suspends until loaded
  const grainTexture = useLoader(THREE.TextureLoader, '/film_grain_contrasted.jpg')

  // ── Noise FBO: init once (guarded) ─────────────────────────────────────────
  if (!noiseSceneRef.current) {
    const rt = new THREE.WebGLRenderTarget(256, 256, {
      format:    THREE.RGBAFormat,
      magFilter: THREE.LinearFilter,
      minFilter: THREE.LinearFilter,
    })
    rt.texture.wrapS = THREE.MirroredRepeatWrapping
    rt.texture.wrapT = THREE.MirroredRepeatWrapping

    const scene = new THREE.Scene()
    scene.add(new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.ShaderMaterial({
        vertexShader:   NOISE_VERTEX,
        fragmentShader: NOISE_FRAGMENT,
        uniforms:       noiseUniformsRef.current,
      }),
    ))

    noiseFBORef.current    = rt
    noiseSceneRef.current  = scene
    noiseCameraRef.current = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  }

  // ── Main uniforms (initialized after FBO + grain texture are ready) ─────────
  const uniformsRef = useRef({
    uResolution:      { value: new THREE.Vector2(size.width, size.height) },
    uPixelRatio:      { value: Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5) },
    uTime:            { value: 0 },
    uWarpStrength:    { value: WARP_STRENGTH },
    uNoiseMap:        { value: noiseFBORef.current!.texture },
    uGrainTexture:    { value: grainTexture },
    uGrainTextureSize:{ value: new THREE.Vector2(1920, 1260) },
    uGrainStrength:   { value: GRAIN_STRENGTH },
    uFluteWidth:      { value: FLUTE_WIDTH },
    uFluteStrength:   { value: FLUTE_STRENGTH },
    uToneMapExposure: { value: TONE_MAP_EXPOSURE },
    uC1:  { value: new THREE.Vector3(...PALETTE[0]) },
    uC2:  { value: new THREE.Vector3(...PALETTE[1]) },
    uC3:  { value: new THREE.Vector3(...PALETTE[2]) },
    uC4:  { value: new THREE.Vector3(...PALETTE[3]) },
    uC5:  { value: new THREE.Vector3(...PALETTE[4]) },
    uAlgo:{ value: 1 }, // GaussianEllipses
  })

  // Grain texture setup + correct size
  useEffect(() => {
    grainTexture.wrapS = THREE.RepeatWrapping
    grainTexture.wrapT = THREE.RepeatWrapping
    grainTexture.needsUpdate = true
    if (grainTexture.image) {
      uniformsRef.current.uGrainTextureSize.value.set(
        (grainTexture.image as HTMLImageElement).width,
        (grainTexture.image as HTMLImageElement).height,
      )
    }
  }, [grainTexture])

  // Signal parent when canvas is ready (texture loaded, Suspense resolved)
  useEffect(() => { onLoad?.() }, [])

  // Cleanup FBO on unmount
  useEffect(() => () => { noiseFBORef.current?.dispose() }, [])

  // ── Frame loop: noise pass → main uniforms update ─────────────────────────
  useFrame((state, delta) => {
    if (!noiseSceneRef.current || !noiseCameraRef.current || !noiseFBORef.current) return

    if (!reducedMotion) {
      noiseUniformsRef.current.uTime.value += delta
      uniformsRef.current.uTime.value      += delta

    }

    // Render noise warp map to FBO
    gl.setRenderTarget(noiseFBORef.current)
    gl.render(noiseSceneRef.current, noiseCameraRef.current)
    gl.setRenderTarget(null)

    uniformsRef.current.uResolution.value.set(size.width, size.height)
    uniformsRef.current.uPixelRatio.value = Math.min(
      typeof window !== 'undefined' ? window.devicePixelRatio : 1,
      1.5,
    )
  })

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        vertexShader={VERTEX}
        fragmentShader={FRAGMENT}
        uniforms={uniformsRef.current}
      />
    </mesh>
  )
}

// ─── Exported canvas wrapper ──────────────────────────────────────────────────
export interface HeroCanvasProps {
  reducedMotion?: boolean
  onLoad?: () => void
}

export function HeroCanvas({ reducedMotion = false, onLoad }: HeroCanvasProps) {
  return (
    <Canvas
      gl={{ antialias: false }}
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 1] }}
      className="absolute inset-0 w-full h-full"
    >
      <Suspense fallback={null}>
        <FractalScene reducedMotion={reducedMotion} onLoad={onLoad} />
      </Suspense>
    </Canvas>
  )
}
