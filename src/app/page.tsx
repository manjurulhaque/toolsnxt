import Link from "next/link"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { SummaryTile, ToolPanel } from "@/components/tool-page"
import { toolCategories, tools } from "@/lib/tools"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[var(--page-cream)] text-[var(--ink-900)]">
      <SiteHeader />

      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <ToolPanel className="sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                Tool directory
              </p>
              <h1 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
                Browser tools for everyday work.
              </h1>
              <p className="mt-4 text-sm leading-7 text-[var(--ink-700)] sm:text-base">
                Pick a utility below. Most tools process files and text locally in your browser, so
                quick jobs stay quick.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-80">
              <SummaryTile label="Tools" value={tools.length} />
              <SummaryTile label="Groups" value={toolCategories.length} />
              <SummaryTile label="Local" value="Most" />
            </div>
          </div>
        </ToolPanel>

        <section className="mt-6">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                All tools
              </p>
              <h2 className="mt-2 text-2xl font-semibold sm:text-3xl">Choose a Tool</h2>
            </div>
            <p className="rounded-full border border-[var(--ink-900)]/10 bg-white px-4 py-2 text-sm text-[var(--ink-700)]">
              {tools.length} available
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {tools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-[1.4rem] border border-[var(--ink-900)]/8 bg-white p-5 shadow-[0_14px_36px_rgba(33,37,41,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-rust)]/30 hover:shadow-[0_24px_48px_rgba(33,37,41,0.12)]"
              >
                <div className="flex min-h-full flex-col">
                  <span className="w-fit rounded-full bg-[var(--page-cream)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-rust)]">
                    {tool.category}
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-[var(--ink-900)]">{tool.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-[var(--ink-700)]/78">
                    {tool.description}
                  </p>
                  <span className="mt-5 text-sm font-semibold text-[var(--ink-900)] transition group-hover:text-[var(--accent-rust)]">
                    Open tool
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
