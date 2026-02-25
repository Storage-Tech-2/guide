import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="mx-auto flex min-h-[60vh] w-full max-w-4xl flex-col items-start justify-center px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-wide text-sky-800 dark:text-sky-400">404</p>
      <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">Page not found</h1>
      <p className="mt-3 max-w-2xl text-slate-700 dark:text-slate-300">
        This page does not exist. If you were looking for a guide, browse the guide index below.
      </p>
      <Link href="/guides/" className="mt-6 inline-flex rounded-md border border-sky-300 bg-sky-100 px-4 py-2 text-sm font-semibold text-sky-900 hover:bg-sky-200 dark:border-sky-500 dark:bg-sky-500 dark:text-white dark:hover:bg-sky-400">
        Go to guides
      </Link>
    </main>
  );
}
