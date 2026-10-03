import type { MetadataRoute } from "next"
import { SITE_URL } from "@/lib/site"
import { tools } from "@/lib/tools"

export const dynamic = "force-static"
export const revalidate = 86400

const legalLastModified = new Date("2026-07-02T00:00:00.000Z")

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: legalLastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: legalLastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/disclaimer`,
      lastModified: legalLastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/cookies`,
      lastModified: legalLastModified,
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ]

  const toolPages: MetadataRoute.Sitemap = tools.map((tool) => ({
    url: `${SITE_URL}${tool.href}`,
    lastModified: currentDate,
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  return [...staticPages, ...toolPages]
}
