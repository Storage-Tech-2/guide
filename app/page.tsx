import Link from "next/link";
import { getAllGuides, getFeaturedGuide } from "@/lib/guides";

const quickLinks = [
  { label: "Design Archive", href: "https://storagecatalog.org/archives/" },
  { label: "Storage Dictionary", href: "https://storagecatalog.org/dictionary/" },
  { label: "Item Layout Tool", href: "https://storagecatalog.org/item-layout-tool/" },
  { label: "Discord", href: "https://discord.gg/storage-tech-2-1375556143186837695" },
];

export default function HomePage() {
  const featuredGuide = getFeaturedGuide();
  const guides = getAllGuides();

  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
      <header className="mb-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-800 dark:text-sky-400">guide.storagecatalog.org</p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Beginner guides for Minecraft storage tech
        </h1>
        <p className="mt-3 max-w-3xl text-slate-700 dark:text-slate-300">
          Learn concepts and pick reliable systems with step-by-step guide pages.
        </p>
      </header>

      {featuredGuide ? (
        <section className="mb-7 rounded-2xl border border-sky-200 bg-sky-50 p-6 shadow-sm dark:border-sky-900 dark:bg-sky-950/30">
          <p className="text-xs font-semibold uppercase tracking-wide text-sky-800 dark:text-sky-400">Featured Guide</p>
          <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">{featuredGuide.title}</h2>
          <p className="mt-2 text-slate-700 dark:text-slate-300">{featuredGuide.description}</p>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">Updated {featuredGuide.updated}</p>
          <Link
            href={`/guides/${featuredGuide.slug}/`}
            className="mt-4 inline-flex rounded-md border border-sky-300 bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-900 transition hover:bg-sky-200 dark:border-sky-500 dark:bg-sky-500 dark:text-white dark:hover:bg-sky-400"
          >
            Open featured guide
          </Link>
        </section>
      ) : null}

      <section className="mb-7 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">All guides</h2>
          <Link href="/guides/" className="text-sm font-semibold text-sky-800 underline underline-offset-2 dark:text-sky-400">
            View guides
          </Link>
        </div>

        <div className="space-y-3">
          {guides.map((guide) => (
            <article key={guide.slug} className="rounded-xl border border-slate-200 p-4 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{guide.title}</h3>
              <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">{guide.description}</p>
              <Link
                href={`/guides/${guide.slug}/`}
                className="mt-3 inline-flex rounded-md border border-sky-300 bg-sky-100 px-3 py-1.5 text-sm font-semibold text-sky-900 transition hover:bg-sky-200 dark:border-sky-500 dark:bg-sky-500 dark:text-white dark:hover:bg-sky-400"
              >
                Read guide
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">Quick links</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {quickLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-800 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              {item.label}
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
