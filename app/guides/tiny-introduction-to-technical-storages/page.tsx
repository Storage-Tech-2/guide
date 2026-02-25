import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tiny Introduction to Technical Storages",
  description:
    "Beginner guide: recommended videos, proven main storages, what to study, and where to ask for help.",
};

const recommendedVideos = [
  { title: "NoisyMIS", href: "https://youtu.be/LDBwWtsDjxY", author: "RaPsCaLLioN1138" },
  {
    title: "Practical Redstone Reloaded",
    href: "https://youtube.com/playlist?list=PLmEBf0WZp2qs8aoteq1SaMg2pm-IILr88&si=iwNa6Ksk2KLrltTD",
    author: "Emdy",
  },
  { title: "Item Alignment Guide", href: "https://youtu.be/bW4Z35NWKys", author: "NicoisLOST" },
  {
    title: "Clocks Overview + Unusual Components",
    href: "https://youtu.be/_GOG0UWTZ7I",
    author: "ilmango",
    extraHref: "https://youtu.be/0SlBt010FL4",
  },
  {
    title: "Storage Tech playlist",
    href: "https://youtube.com/playlist?list=PL-sDbu5X9LQ6-aQw4BosI3KabdzH8wRPR&si=jaRQiIKEVkXGLAgx",
    author: "SamosTheSage",
  },
];

const mainStorages = [
  {
    level: "Small / Simple",
    name: "Compact Categorizer",
    href: "https://storagecatalog.org/archives/MIS001-Compact-Categorizer/",
  },
  {
    level: "Medium / Intermediate",
    name: "Yamis",
    href: "https://storagecatalog.org/archives/MIS002-YAMIS-Multi-Item-Storage-System/",
    altName: "XianyuMIS v2",
    altHref: "https://storagecatalog.org/archives/MIS010-XianyuMIS-V2/",
  },
  {
    level: "Large / Complex",
    name: "Yams v2",
    href: "https://storagecatalog.org/archives/LS006-Yams-v2-3/",
  },
];

export default function TinyIntroductionGuidePage() {
  return (
    <main className="mx-auto w-full max-w-5xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Link href="/guides/" className="text-sm font-semibold text-sky-800 underline underline-offset-2 dark:text-sky-400">
          Back to guides
        </Link>
      </div>

      <header className="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-800 dark:text-sky-400">Beginner Guide</p>
        <h1 className="mt-2 text-3xl font-semibold leading-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
          Tiny Introduction to Technical Storages
        </h1>
        <p className="mt-3 max-w-3xl text-slate-700 dark:text-slate-300">
          Start here if you are new to storage tech and want a practical path to learning, building, and asking better
          questions.
        </p>
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">Last updated: February 22, 2026</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Author: TPS Nighthunter</p>
      </header>

      <section className="mb-5 rounded-2xl border border-cyan-200 bg-cyan-50 p-5 shadow-sm dark:border-cyan-900 dark:bg-cyan-950/30">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">1. Recommended videos</h2>
        <ul className="mt-3 space-y-2">
          {recommendedVideos.map((video) => (
            <li key={video.title} className="rounded-lg border border-white bg-white/90 px-3 py-2 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              <a href={video.href} target="_blank" rel="noreferrer" className="font-semibold text-sky-800 underline underline-offset-2 dark:text-sky-400">
                {video.title}
              </a>
              {video.extraHref ? (
                <>
                  {" "}
                  and{" "}
                  <a href={video.extraHref} target="_blank" rel="noreferrer" className="font-semibold text-sky-800 underline underline-offset-2 dark:text-sky-400">
                    Unusual Components
                  </a>
                </>
              ) : null}
              <span className="text-slate-500 dark:text-slate-400"> by {video.author}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow-sm dark:border-emerald-900 dark:bg-emerald-950/30">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">2. Complete main storages to use</h2>
        <ul className="mt-3 space-y-2">
          {mainStorages.map((entry) => (
            <li key={entry.name} className="rounded-lg border border-white bg-white/90 px-3 py-2 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
              <span className="font-semibold text-slate-900 dark:text-slate-100">{entry.level}: </span>
              <a href={entry.href} target="_blank" rel="noreferrer" className="font-semibold text-sky-800 underline underline-offset-2 dark:text-sky-400">
                {entry.name}
              </a>
              {entry.altName && entry.altHref ? (
                <>
                  {" "}or{" "}
                  <a href={entry.altHref} target="_blank" rel="noreferrer" className="font-semibold text-sky-800 underline underline-offset-2 dark:text-sky-400">
                    {entry.altName}
                  </a>
                </>
              ) : null}
            </li>
          ))}
          <li className="rounded-lg border border-white bg-white/90 px-3 py-2 text-sm text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
            <Link
              href="/guides/storage-guide/"
              className="font-semibold text-sky-800 underline underline-offset-2 dark:text-sky-400"
            >
              Main Storage List
            </Link>
          </li>
        </ul>
      </section>

      <section className="mb-5 rounded-2xl border border-violet-200 bg-violet-50 p-5 shadow-sm dark:border-violet-900 dark:bg-violet-950/30">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">3. Learning about storage systems</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-800 dark:text-slate-200">
          <li className="rounded-lg border border-white bg-white/90 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
          Read the{" "}
          <a href="https://storagecatalog.org/dictionary/" target="_blank" rel="noreferrer" className="font-semibold text-sky-800 underline underline-offset-2 dark:text-sky-400">
            dictionary
          </a>
          </li>
          <li className="rounded-lg border border-white bg-white/90 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
          Browse the{" "}
          <a href="https://storagecatalog.org/archives/" target="_blank" rel="noreferrer" className="font-semibold text-sky-800 underline underline-offset-2 dark:text-sky-400">
            archive
          </a>
          , test systems in a world, and take them apart to understand behavior.
          </li>
          <li className="rounded-lg border border-white bg-white/90 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">Ask specific questions in <a href="https://discord.gg/EYpcYXDrZt" target="_blank" rel="noreferrer" className="font-semibold text-sky-800 underline underline-offset-2 dark:text-sky-400">Discord</a> with screenshots and exact symptoms.</li>
        </ul>
      </section>

      <section className="rounded-2xl border border-amber-200 bg-amber-50 p-5 shadow-sm dark:border-amber-900 dark:bg-amber-950/30">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">4. Working on a main storage</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-800 dark:text-slate-200">
          <li className="rounded-lg border border-white bg-white/90 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
            <a
              href="https://docs.google.com/document/d/1efPm6aXIggLMwxNIZPTcl0Xtip6hWFsj/edit?usp=sharing&ouid=103572861559058809114&rtpof=true&sd=true"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-sky-800 underline underline-offset-2 dark:text-sky-400"
            >
              Parts and Assembly of Storage Systems
            </a>
            <span className="text-slate-500 dark:text-slate-400"> by giannis</span>
          </li>
          <li className="rounded-lg border border-white bg-white/90 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
            <a
              href="https://youtube.com/playlist?list=PL1K1gkkuhD0jBbfyXOIXwRKEYrRaixUlE&si=RA00G1AjOZeTykG4"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-sky-800 underline underline-offset-2 dark:text-sky-400"
            >
              Designing a Storage System
            </a>
            <span className="text-slate-500 dark:text-slate-400"> by ExperimentalIdea</span>
          </li>
          <li className="rounded-lg border border-white bg-white/90 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">Use Discord channel #756677711111389236 for build-specific discussion.</li>
          <li className="rounded-lg border border-white bg-white/90 px-3 py-2 dark:border-slate-700 dark:bg-slate-900">
            <a
              href="https://storagecatalog.org/item-layout-tool/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-sky-800 underline underline-offset-2 dark:text-sky-400"
            >
              Item Layout Tool
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
