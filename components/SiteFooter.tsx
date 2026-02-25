export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-6 text-sm text-slate-600 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>Built for beginners learning Minecraft storage tech.</p>
        <div className="flex items-center gap-4">
          <a href="https://discord.gg/storage-tech-2-1375556143186837695" target="_blank" rel="noreferrer" className="underline decoration-slate-300 underline-offset-2 hover:text-slate-900 dark:decoration-slate-700 dark:hover:text-slate-100">Join Discord</a>
          <a href="https://storagecatalog.org/" target="_blank" rel="noreferrer" className="underline decoration-slate-300 underline-offset-2 hover:text-slate-900 dark:decoration-slate-700 dark:hover:text-slate-100">Main Site</a>
        </div>
      </div>
    </footer>
  );
}
