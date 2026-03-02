"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type ResourceLink = {
  label: string;
  href: string;
};

type GalleryImage = {
  label: string;
  src: string;
};

type HowToStep = {
  caption: string;
  src: string;
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
  gallery?: GalleryImage[];
  howTo?: HowToStep[];
};

type SectionComparisonColumnsProps = {
  entries: StorageEntry[];
  storageImages: Record<string, string>;
};

type ModalState =
  | { kind: "image"; src: string; alt: string; name: string }
  | { kind: "gallery"; entryName: string; images: GalleryImage[] }
  | { kind: "howto"; entryName: string; steps: HowToStep[] };

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
  const [modal, setModal] = useState<ModalState | null>(null);

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
    if (!modal) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setModal(null);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modal]);

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

  const secondaryButtonClass =
    "rounded-md border border-slate-300 bg-slate-100 px-3 py-1.5 text-sm font-semibold text-slate-800 transition hover:bg-slate-200 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700";

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
          className={`pointer-events-none absolute inset-y-0 left-0 z-10 w-6 bg-linear-to-r from-slate-100 to-transparent dark:from-slate-950 ${
            canScrollLeft ? "opacity-100" : "opacity-0"
          }`}
        />
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-y-0 right-0 z-10 w-6 bg-linear-to-l from-slate-100 to-transparent dark:from-slate-950 ${
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
                        setModal({
                          kind: "image",
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
                  {entry.gallery && entry.gallery.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setModal({ kind: "gallery", entryName: entry.name, images: entry.gallery! })}
                      className={secondaryButtonClass}
                    >
                      Open gallery
                    </button>
                  )}
                  {entry.howTo && entry.howTo.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setModal({ kind: "howto", entryName: entry.name, steps: entry.howTo! })}
                      className={secondaryButtonClass}
                    >
                      Guide
                    </button>
                  )}
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

      {modal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8">
          <button
            type="button"
            aria-label="Close"
            className="absolute inset-0 bg-black/70"
            onClick={() => setModal(null)}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={
              modal.kind === "image"
                ? `${modal.name} image viewer`
                : modal.kind === "gallery"
                ? `${modal.entryName} gallery`
                : `${modal.entryName} filter guide`
            }
            className="relative z-10 flex w-full max-w-3xl flex-col rounded-2xl border border-slate-300 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
            style={{ maxHeight: "90vh" }}
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 dark:border-slate-700">
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {modal.kind === "image"
                  ? modal.name
                  : modal.kind === "gallery"
                  ? `${modal.entryName} — Gallery`
                  : `${modal.entryName} — How to set filters`}
              </p>
              <div className="flex items-center gap-2">
                {modal.kind === "image" && (
                  <a
                    href={modal.src}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                  >
                    Open in new tab
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => setModal(null)}
                  className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:text-slate-200 dark:hover:bg-slate-800"
                >
                  Close
                </button>
              </div>
            </div>

            {modal.kind === "image" ? (
              <div className="overflow-auto p-3 sm:p-5">
                <img src={modal.src} alt={modal.alt} className="mx-auto h-auto w-auto max-w-full object-contain" />
              </div>
            ) : modal.kind === "gallery" ? (
              <div className="overflow-y-auto p-4">
                <div className="space-y-4">
                  {modal.images.map((img) => (
                    <div key={img.src}>
                      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">{img.label}</p>
                      <img src={img.src} alt={img.label} className="w-full rounded-lg object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="overflow-y-auto p-4">
                <div className="space-y-6">
                  {modal.steps.map((step, i) => (
                    <div key={step.src}>
                      <p className="mb-2 text-sm text-slate-700 dark:text-slate-300">
                        <span className="font-bold text-slate-900 dark:text-slate-100">Step {i + 1}. </span>
                        {step.caption}
                      </p>
                      <img src={step.src} alt={step.caption} className="w-full rounded-lg object-contain" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
