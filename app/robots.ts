import type { MetadataRoute } from "next";

export const dynamic = "force-static";
export const revalidate = false;

const SITE_URL = (process.env.SITE_URL ?? "https://guide.storagecatalog.org").replace(/\/+$/, "");
const BASE_PATH = (process.env.PAGES_BASE_PATH ?? "").replace(/\/+$/, "");

function absolute(path: string) {
  return `${SITE_URL}${BASE_PATH}${path}`;
}

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: absolute("/sitemap.xml"),
  };
}
