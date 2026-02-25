import type { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/guides";

export const dynamic = "force-static";
export const revalidate = false;

const SITE_URL = (process.env.SITE_URL ?? "https://guide.storagecatalog.org").replace(/\/+$/, "");
const BASE_PATH = (process.env.PAGES_BASE_PATH ?? "").replace(/\/+$/, "");

function absolute(path: string) {
  return `${SITE_URL}${BASE_PATH}${path}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const guides = getAllGuides();

  const corePages: MetadataRoute.Sitemap = [
    {
      url: absolute("/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absolute("/guides/"),
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  const guidePages: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: absolute(`/guides/${guide.slug}/`),
    lastModified: now,
    changeFrequency: "weekly",
    priority: guide.featured ? 0.9 : 0.8,
  }));

  return [...corePages, ...guidePages];
}
