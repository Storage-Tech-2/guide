export type GuideMeta = {
  slug: string;
  title: string;
  description: string;
  updated: string;
  author?: string;
  featured?: boolean;
};

const guides: GuideMeta[] = [
  {
    slug: "tiny-introduction-to-technical-storages",
    title: "Tiny Introduction to Technical Storages",
    description:
      "A beginner path for learning storage tech: recommended videos, proven main storages, and where to ask focused questions.",
    updated: "February 22, 2026",
    author: "TPS Nighthunter",
    featured: true,
  },
  {
    slug: "storage-guide",
    title: "List of Complete Main Storages",
    description:
      "A structured index of published complete storage systems with sorting capabilities, speed, size, and reference links.",
    updated: "February 1, 2026",
  },
];

export function getAllGuides() {
  return guides;
}

export function getFeaturedGuide() {
  return guides.find((guide) => guide.featured) ?? guides[0] ?? null;
}

export function getGuideBySlug(slug: string) {
  return guides.find((guide) => guide.slug === slug) ?? null;
}
