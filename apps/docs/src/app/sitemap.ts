import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://fync-docs.vercel.app'
  
  const apis = [
    'github',
    'spotify',
    'gitlab',
    'npm',
    'google-calendar',
    'google-drive',
    'vercel',
    'discord',
    'notion'
  ]

  const apiRoutes = apis.map(function createApiRoute(api) {
    return {
      url: `${baseUrl}/docs/${api}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }
  })

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...apiRoutes,
  ]
}
