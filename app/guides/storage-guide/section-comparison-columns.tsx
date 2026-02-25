"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ResourceLink = {
  label: string;
  href: string;
};

type StorageEntry = {
  name: string;
  version: string;
  creators: string;
  sorts: string;
  speed: string;
  size: string;
  extras: string;
  issues: string;
  links: ResourceLink[];
};

type SectionComparisonColumnsProps = {
  entries: StorageEntry[];
  storageImages: Record<string, string>;
};

function ChevronLeftIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M12.5 4.5L7 10l5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4" aria-hidden="true">
      <path d="M7.5 4.5L13 10l-5.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function SectionComparisonColumns({ entries, storageImages }: SectionComparisonColumnsProps) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [viewerImage, setViewerImage] = useState<{ src: string; alt: string; name: string } | null>(null);

  const getCardOffsets = (scroller: HTMLDivElement) =>
    Array.from(scroller.querySelectorAll<HTMLElement>("[data-storage-card='true']")).map((card) => card.offsetLeft);

  const updateScrollState = useCallback(() => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    const offsets = getCardOffsets(scroller);
    if (!offsets.length) {
      setActiveIndex(0);
      setCanScrollLeft(false);
      setCanScrollRight(false);
      return;
    }

    const currentLeft = scroller.scrollLeft;
    const maxScrollLeft = scroller.scrollWidth - scroller.clientWidth;

    if (maxScrollLeft <= 4) {
      setCanScrollLeft(false);
      setCanScrollRight(false);
    } else {
      setCanScrollLeft(currentLeft > 4);
      setCanScrollRight(currentLeft < maxScrollLeft - 4);
    }

    let nearestIndex = 0;
    let nearestDistance = Number.POSITIVE_INFINITY;
    offsets.forEach((offset, index) => {
      const distance = Math.abs(offset - currentLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    setActiveIndex(nearestIndex);
  }, []);

  useEffect(() => {
    updateScrollState();
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    scroller.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      scroller.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [entries.length, updateScrollState]);

  useEffect(() => {
    if (!viewerImage) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setViewerImage(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [viewerImage]);

  const scrollToNextItem = (direction: -1 | 1) => {
    const scroller = scrollerRef.current;
    if (!scroller) {
      return;
    }

    const offsets = getCardOffsets(scroller);
    if (!offsets.length) {
      return;
    }

    const targetIndex = Math.max(0, Math.min(offsets.length - 1, activeIndex + direction));
    setActiveIndex(targetIndex);
    scroller.scrollTo({ left: offsets[targetIndex], behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => scrollToNextItem(-1)}
        disabled={!canScrollLeft}
        aria-label="Scroll to previous storage"
        className="absolute left-0 top-1/2 z-20 inline-flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-md transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <ChevronLeftIcon />
      </button>

      <button
        type="button"
        onClick={() => scrollToNextItem(1)}
        disabled={!canScrollRight}
        aria-label="Scroll to next storage"
        className="absolute right-0 top-1/2 z-20 inline-flex h-12 w-12 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-md transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <ChevronRightIcon />
      </button>

      <div className="relative">
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-gradient-to-r from-slate-100 to-transparent dark:from-slate-950 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-gradient-to-l from-slate-100 to-transparent dark:from-slate-950 ${
            canScrollRight ? "opacity-100" : "opacity-0"
          }`}
        />

        <div className="overflow-hidden pb-2">
          <div
            ref={scrollerRef}
            className="overflow-x-auto overflow-y-hidden scroll-smooth snap-x snap-mandatory pb-8 -mb-8 pr-1"
          >
            <div
              className="grid min-w-max gap-x-4 gap-y-0"
              style={{
                gridTemplateColumns: `repeat(${entries.length}, minmax(340px, 340px))`,
                gridTemplateRows: "11rem auto auto auto auto auto auto auto",
              }}
            >
              {entries.map((entry) => (
                <article
                  key={entry.name}
                  data-storage-card="true"
                  className="row-span-8 grid snap-start rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  style={{ gridTemplateRows: "subgrid" }}
                >
                <div className="row-start-1 border-b border-slate-200 p-4 dark:border-slate-800">
                  {storageImages[entry.name] ? (
                    <button
                      type="button"
                      onClick={() =>
                        setViewerImage({
                          src: storageImages[entry.name],
                          alt: `${entry.name} preview`,
                          name: entry.name,
                        })
                      }
                      className="block h-full w-full"
                      aria-label={`Open image viewer for ${entry.name}`}
                    >
                      <img
                        src={storageImages[entry.name]}
                        alt={`${entry.name} preview`}
                        className="h-full w-full rounded-lg border border-slate-200 bg-slate-50 object-contain p-1 dark:border-slate-700 dark:bg-slate-950"
                        loading="lazy"
                      />
                    </button>
                  ) : (
                    <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-300 bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-400">
                      No preview
                    </div>
                  )}
                </div>

              <div className="row-start-2 border-b border-slate-200 p-4 dark:border-slate-800">
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-800 dark:text-sky-400">{entry.version}</p>
                <h3 className="mt-1 text-lg font-semibold text-slate-900 dark:text-slate-100">{entry.name}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">By {entry.creators}</p>
              </div>

              <dl className="contents text-sm">
                <div className="row-start-3 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                  <dt className="font-semibold text-slate-900 dark:text-slate-100">Sorts</dt>
                  <dd className="mt-1 text-slate-700 dark:text-slate-300">{entry.sorts}</dd>
                </div>
                <div className="row-start-4 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                  <dt className="font-semibold text-slate-900 dark:text-slate-100">Speed</dt>
                  <dd className="mt-1 text-slate-700 dark:text-slate-300">{entry.speed}</dd>
                </div>
                <div className="row-start-5 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                  <dt className="font-semibold text-slate-900 dark:text-slate-100">Size</dt>
                  <dd className="mt-1 text-slate-700 dark:text-slate-300">{entry.size}</dd>
                </div>
                <div className="row-start-6 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                  <dt className="font-semibold text-slate-900 dark:text-slate-100">Extra features</dt>
                  <dd className="mt-1 text-slate-700 dark:text-slate-300">{entry.extras}</dd>
                </div>
                <div className="row-start-7 border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                  <dt className="font-semibold text-slate-900 dark:text-slate-100">Known notes</dt>
                  <dd className="mt-1 text-slate-700 dark:text-slate-300">{entry.issues}</dd>
                </div>
              </dl>

              <div className="row-start-8 p-4">
                <div className="flex flex-wrap gap-2">
                  {entry.links.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-md border border-sky-300 bg-sky-100 px-3 py-1.5 text-sm font-semibold text-sky-900 transition hover:bg-sky-200 dark:border-sky-500 dark:bg-sky-500 dark:text-white dark:hover:bg-sky-400"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {viewerImage ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <button
            type="button"
            aria-label="Close image viewer"
            className="absolute inset-0 bg-black/70"
            onClick={() => setViewerImage(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${viewerImage.name} image viewer`}
            className="relative z-10 w-full max-w-6xl rounded-2xl border border-slate-300 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">{viewerImage.name}</p>
              <div className="flex items-center gap-2">
                <a
                  href={viewerImage.src}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Open in new tab
                </a>
                <button
                  type="button"
                  onClick={() => setViewerImage(null)}
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            </div>
            <div className="max-h-[82vh] overflow-auto p-3 sm:p-5">
              <img src={viewerImage.src} alt={viewerImage.alt} className="mx-auto h-auto max-h-[74vh] w-auto max-w-full object-contain" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
