import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRightIcon,
  CloudOffIcon,
  ShieldCheckIcon,
  WrenchIcon,
} from "@/components/icons"
import { OfflineActions } from "@/app/offline/offline-actions"
import { SITE_NAME } from "@/lib/site"
import { tools } from "@/lib/tools"

export const metadata: Metadata = {
  title: `Offline Mode | ${SITE_NAME}`,
  description: `Offline workspace. All 52 utilities execute locally in your browser with zero network dependencies.`,
  robots: {
    index: false,
    follow: false,
  },
}

export default function OfflinePage() {
  const popularTools = tools.slice(0, 12)

  return (
    <main className="min-h-[80vh] bg-[var(--page-cream)] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Offline Status Card */}
        <div className="rounded-[2rem] border border-[var(--ink-900)]/10 bg-white p-8 shadow-[0_18px_50px_rgba(33,37,41,0.06)] sm:p-12">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
                <CloudOffIcon className="h-6 w-6" />
              </span>
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-800">
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                  Offline Runtime Active
                </span>
                <h1 className="mt-1 font-serif text-2xl font-bold text-[var(--ink-900)] sm:text-3xl">
                  You Are Browsing Offline
                </h1>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-600/20 bg-emerald-50 px-3.5 py-1.5 text-xs font-semibold text-emerald-800">
              <ShieldCheckIcon className="h-4 w-4 text-emerald-600" />
              <span>100% In-Browser Execution</span>
            </div>
          </div>

          <p className="mt-6 max-w-2xl text-sm leading-7 text-[var(--ink-700)] sm:text-base">
            No internet connection was detected for this request. However, because{" "}
            <strong>{SITE_NAME}</strong> processes everything directly on your device using Web
            Workers, WebAssembly, and HTML5 APIs, your cached tools and data remain fully
            functional without any network connection.
          </p>

          <OfflineActions />
        </div>

        {/* Offline Ready Utilities Directory */}
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-xs sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <WrenchIcon className="h-5 w-5 text-[var(--accent-rust)]" />
              <h2 className="text-lg font-bold text-[var(--ink-900)]">
                Cached Offline Utilities
              </h2>
            </div>
            <span className="text-xs text-[var(--ink-700)]">
              52 Local Tools Available
            </span>
          </div>

          <p className="mt-2 text-xs leading-5 text-[var(--ink-700)]">
            Click on any utility below to open its offline workspace immediately:
          </p>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {popularTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group flex flex-col justify-between rounded-2xl border border-[var(--ink-900)]/8 bg-[var(--page-cream)]/60 p-4 transition hover:border-[var(--accent-rust)]/40 hover:bg-white hover:shadow-xs"
              >
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--accent-rust)]">
                    {tool.category}
                  </span>
                  <h3 className="mt-1 text-sm font-semibold text-[var(--ink-900)] group-hover:text-[var(--accent-rust)]">
                    {tool.title}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs leading-5 text-[var(--ink-700)]">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-[var(--accent-rust)]">
                  <span>Launch offline</span>
                  <ArrowRightIcon className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 text-center border-t border-[var(--ink-900)]/8 pt-4">
            <Link
              href="/"
              className="text-xs font-semibold text-[var(--accent-rust)] underline hover:text-[var(--ink-900)]"
            >
              Browse all 52 tools in directory &rarr;
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
