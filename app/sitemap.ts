const baseUrl = 'https://maximeluet.com'

export default function sitemap() {
  const routes = ['', '/work/mention', '/work/ekonsilio', '/work/estorie'].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date().toISOString().split('T')[0],
    })
  )
  return routes
}
