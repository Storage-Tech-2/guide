"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { getAllGuides } from "@/lib/guides";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/guides/", label: "Guides" },
  { href: "https://storagecatalog.org/archives/", label: "Design Archive", external: true },
  { href: "https://storagecatalog.org/dictionary/", label: "Dictionary", external: true },
] as const;

function normalizePath(pathname: string) {
  if (pathname.length > 1 && pathname.endsWith("/")) return pathname.slice(0, -1);
  return pathname;
}

function isCurrentPage(currentPath: string, href: string) {
  return normalizePath(currentPath) === normalizePath(href);
}

function isActivePath(currentPath: string, href: string) {
  const normalizedHref = normalizePath(href);
  if (normalizedHref === "/") return currentPath === "/";
  return currentPath === normalizedHref || currentPath.startsWith(`${normalizedHref}/`);
}

export function SiteHeader() {
  const pathname = usePathname() ?? "/";
  const currentPath = useMemo(() => normalizePath(pathname), [pathname]);
  const mobileMenuRef = useRef<HTMLDetailsElement | null>(null);
  const guides = getAllGuides();

  useEffect(() => {
    if (mobileMenuRef.current) {
      mobileMenuRef.current.open = false;
    }
  }, [currentPath]);

  const navLinkBase = "rounded-md px-3 py-2 font-medium transition";
  const navLinkInactive = "hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-900 dark:hover:text-slate-100";
  const navLinkActive = "text-slate-900 underline decoration-sky-500 decoration-2 underline-offset-[10px] dark:text-slate-100 dark:decoration-sky-400";

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 dark:border-slate-800 dark:bg-slate-950/85 dark:supports-[backdrop-filter]:bg-slate-950/70">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 rounded-lg px-1 py-1 transition hover:bg-slate-100 dark:hover:bg-slate-900">
          <Image
            src="/logo.png"
            alt="Minecraft Storage Catalog logo"
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg"
            priority
          />
          <div className="leading-tight">
            <p className="text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-100">Minecraft Storage Catalog</p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Beginner Guides</p>
          </div>
        </Link>

        <nav className="ml-auto hidden items-center gap-1 text-sm text-slate-700 dark:text-slate-300 md:flex">
          {navItems.map((item) => {
            if (item.href === "/guides/") {
              const active = isActivePath(currentPath, item.href);
              const current = isCurrentPage(currentPath, item.href);

              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-haspopup="menu"
                    aria-current={current ? "page" : undefined}
                    className={`${navLinkBase} ${active ? navLinkActive : navLinkInactive}`}
                  >
                    {item.label}
                  </Link>

                  <div className="pointer-events-none absolute left-1/2 top-full z-40 w-96 -translate-x-1/2 translate-y-2 pt-4 opacity-0 transition-all group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100">
                    <div className="relative">
                      <div className="pointer-events-none absolute left-1/2 -top-2 z-20 -translate-x-1/2">
                        <div className="h-0 w-0 border-x-8 border-x-transparent border-b-8 border-b-sky-300/90 dark:border-b-sky-700/90" />
                      </div>
                      <div role="menu" aria-label="Guide subpages" className="rounded-2xl border border-sky-300 bg-white p-2 shadow-lg dark:border-sky-700 dark:bg-slate-900">
                        <Link
                          href="/guides/"
                          aria-current={isCurrentPage(currentPath, "/guides/") ? "page" : undefined}
                          className={isCurrentPage(currentPath, "/guides/")
                            ? "block rounded-xl bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                            : "block rounded-xl px-3 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
                          }
                        >
                          Guides Overview
                        </Link>

                        <div className="my-2 h-px bg-slate-200 dark:bg-slate-700" />

                        {guides.map((guide) => {
                          const href = `/guides/${guide.slug}/`;
                          const isCurrent = isCurrentPage(currentPath, href);

                          return (
                            <Link
                              key={guide.slug}
                              href={href}
                              aria-current={isCurrent ? "page" : undefined}
                              className={isCurrent
                                ? "block rounded-xl bg-slate-100 px-3 py-2 dark:bg-slate-800"
                                : "block rounded-xl px-3 py-2 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
                              }
                            >
                              <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">{guide.title}</div>
                              <div className="mt-0.5 text-xs text-slate-600 dark:text-slate-400">{guide.description}</div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            if (item.external) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${navLinkBase} ${navLinkInactive}`}
                >
                  {item.label}
                </a>
              );
            }

            const active = isActivePath(currentPath, item.href);
            const current = isCurrentPage(currentPath, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={`${navLinkBase} ${active ? navLinkActive : navLinkInactive}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <details ref={mobileMenuRef} className="relative ml-auto md:hidden">
          <summary className="list-none rounded-full border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800">
            Menu
          </summary>
          <div className="absolute right-0 z-40 mt-2 w-72 rounded-2xl border border-slate-200 bg-white p-2 shadow-lg dark:border-slate-700 dark:bg-slate-900">
            <div className="flex flex-col gap-1 text-sm">
              <Link
                href="/"
                aria-current={isCurrentPage(currentPath, "/") ? "page" : undefined}
                className={isActivePath(currentPath, "/")
                  ? "rounded-xl bg-slate-100 px-3 py-2 font-medium text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                  : "rounded-xl px-3 py-2 font-medium text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
                }
              >
                Home
              </Link>

              <Link
                href="/guides/"
                aria-current={isCurrentPage(currentPath, "/guides/") ? "page" : undefined}
                className={isActivePath(currentPath, "/guides/")
                  ? "rounded-xl bg-slate-100 px-3 py-2 font-medium text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                  : "rounded-xl px-3 py-2 font-medium text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
                }
              >
                Guides
              </Link>

              <div className="ml-3 border-l border-slate-200 pl-3 dark:border-slate-700">
                {guides.map((guide) => {
                  const href = `/guides/${guide.slug}/`;
                  const isCurrent = isCurrentPage(currentPath, href);
                  return (
                    <Link
                      key={guide.slug}
                      href={href}
                      aria-current={isCurrent ? "page" : undefined}
                      className={isCurrent
                        ? "mt-1 block rounded-lg bg-slate-100 px-3 py-2 text-sm font-medium text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                        : "mt-1 block rounded-lg px-3 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
                      }
                    >
                      {guide.title}
                    </Link>
                  );
                })}
              </div>

              <a
                href="https://storagecatalog.org/archives/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl px-3 py-2 font-medium text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Design Archive
              </a>
              <a
                href="https://storagecatalog.org/dictionary/"
                target="_blank"
                rel="noreferrer"
                className="rounded-xl px-3 py-2 font-medium text-slate-900 hover:bg-slate-100 dark:text-slate-100 dark:hover:bg-slate-800"
              >
                Dictionary
              </a>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
