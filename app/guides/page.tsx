import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Storage Tech Guides",
  description:
    "Browse all beginner and reference guides for Minecraft storage technology.",
  alternates: {
    canonical: "/guides/",
  },
  openGraph: {
    title: "Storage Tech Guides",
    description:
      "Browse all beginner and reference guides for Minecraft storage technology.",
    url: "/guides/",
    type: "website",
  },
};

export default function GuidesIndexPage() {
  const guides = getAllGuides();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Storage Tech Guides",
          url: "https://guide.storagecatalog.org/guides/",
          description:
            "Browse all beginner and reference guides for Minecraft storage technology.",
          hasPart: guides.map((guide) => ({
            "@type": "Article",
            headline: guide.title,
            url: `https://guide.storagecatalog.org/guides/${guide.slug}/`,
            description: guide.description,
          })),
        }}
      />
      <header className="mb-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-800 dark:text-sky-400">Guides</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100 sm:text-4xl">Storage tech guides</h1>
        <p className="mt-3 text-slate-700 dark:text-slate-300">Each guide page is custom-built for clarity.</p>
      </header>

      <section className="space-y-4">
        {guides.map((guide) => (
          <article key={guide.slug} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">{guide.title}</h2>
            <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">{guide.description}</p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Updated {guide.updated}</p>
            <Link
              href={`/guides/${guide.slug}/`}
              className="mt-4 inline-flex rounded-md border border-sky-300 bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-900 transition hover:bg-sky-200 dark:border-sky-500 dark:bg-sky-500 dark:text-white dark:hover:bg-sky-400"
            >
              Open guide
            </Link>
          </article>
        ))}
      </section>
    </main>
  );
}
