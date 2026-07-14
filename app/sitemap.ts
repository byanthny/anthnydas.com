import type { MetadataRoute } from "next"
import { getAllEntries } from "@/lib/log"
import { siteUrl } from "@/lib/site"

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = getAllEntries()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/log`,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/sports`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ]

  const entryRoutes: MetadataRoute.Sitemap = entries.map((entry) => ({
    url: `${siteUrl}/log/${entry.slug}`,
    lastModified: new Date(entry.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }))

  return [...staticRoutes, ...entryRoutes]
}
