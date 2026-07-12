import Link from "next/link"
import { HeroIntro, PanelHeader, SummaryTile, ToolPanel } from "@/components/tool-page"
import { toolCategories, tools, toolsByCategory } from "@/lib/tools"

export default function HomePage() {
  return (
    <div className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-12 lg:py-12">
        <ToolPanel className="sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <HeroIntro eyebrow="Tool directory" title="Browser tools for everyday work.">
                Pick a utility below. Most tools process files and text locally in your browser, so
                quick jobs stay quick.
              </HeroIntro>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:min-w-80">
              <SummaryTile label="Tools" value={tools.length} />
              <SummaryTile label="Groups" value={toolCategories.length} />
              <SummaryTile label="Local" value="Most" />
            </div>
          </div>
        </ToolPanel>

        <section className="mt-6">
          <PanelHeader
            eyebrow="All tools"
            title="Browse by Category"
            badge={`${tools.length} available`}
            badgeClassName="border border-[var(--ink-900)]/10 bg-white text-sm normal-case tracking-normal"
            className="mb-4"
            titleClassName="sm:text-3xl"
          />

          <div className="space-y-8">
            {toolsByCategory.map(({ category, tools }) => (
              <section key={category} aria-labelledby={`${category.toLowerCase()}-tools`}>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--ink-900)]/10 pb-3">
                  <h3
                    id={`${category.toLowerCase()}-tools`}
                    className="text-xl font-semibold text-[var(--ink-900)]"
                  >
                    {category}
                  </h3>
                  <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-700)] shadow-[0_10px_24px_rgba(33,37,41,0.05)]">
                    {tools.length} {tools.length === 1 ? "tool" : "tools"}
                  </span>
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
                        <h4 className="mt-4 text-xl font-semibold text-[var(--ink-900)]">
                          {tool.title}
                        </h4>
                        <p className="mt-3 flex-1 text-sm leading-7 text-[var(--ink-700)]/78">
                          {tool.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
