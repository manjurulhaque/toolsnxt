"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import type { Tool } from "@/lib/tools"
import { PanelHeader } from "@/components/tool-page"

type ToolSearchDirectoryProps = {
  allTools: Tool[]
  categories: string[]
  toolsByCategory: Array<{ category: string; tools: Tool[] }>
}

export function ToolSearchDirectory({
  allTools,
  categories,
  toolsByCategory,
}: ToolSearchDirectoryProps) {
  const [search, setSearch] = useState("")
  const [activeCategory, setActiveCategory] = useState<string>("All")

  const normalizedQuery = search.trim().toLowerCase()

  const filteredByCategory = useMemo(() => {
    if (activeCategory === "All") {
      return allTools
    }
    return allTools.filter((tool) => tool.category === activeCategory)
  }, [allTools, activeCategory])

  const filteredTools = useMemo(() => {
    if (!normalizedQuery) {
      return filteredByCategory
    }
    return filteredByCategory.filter(
      (tool) =>
        tool.title.toLowerCase().includes(normalizedQuery) ||
        tool.description.toLowerCase().includes(normalizedQuery) ||
        tool.category.toLowerCase().includes(normalizedQuery),
    )
  }, [filteredByCategory, normalizedQuery])

  const displayedGroups = useMemo(() => {
    if (activeCategory !== "All" || normalizedQuery) {
      // Flat view when filtering
      return null
    }
    return toolsByCategory
  }, [activeCategory, normalizedQuery, toolsByCategory])

  function resetFilters() {
    setSearch("")
    setActiveCategory("All")
  }

  return (
    <section className="mt-8 space-y-6">
      <div className="rounded-[1.5rem] border border-[var(--ink-900)]/10 bg-white p-4 shadow-[0_12px_32px_rgba(33,37,41,0.05)] sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <label htmlFor="tool-search-input" className="sr-only">
              Search tools
            </label>
            <input
              id="tool-search-input"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 52 browser tools (e.g. pdf, json, image, svg, timer)..."
              className="w-full rounded-full border border-[var(--ink-900)]/12 bg-[var(--page-cream)] px-5 py-3.5 text-sm text-[var(--ink-900)] placeholder:text-[var(--ink-700)]/60 outline-none transition focus:border-[var(--accent-rust)]"
            />
            {search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full px-2 py-1 text-xs font-semibold text-[var(--ink-700)] hover:text-[var(--ink-900)]"
                aria-label="Clear search input"
              >
                Clear
              </button>
            ) : null}
          </div>

          <div className="text-sm text-[var(--ink-700)]">
            Showing <strong className="text-[var(--ink-900)]">{filteredTools.length}</strong> of{" "}
            {allTools.length} tools
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2 pt-2 border-t border-[var(--ink-900)]/6">
          <button
            type="button"
            onClick={() => setActiveCategory("All")}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition ${
              activeCategory === "All"
                ? "bg-[var(--ink-900)] text-white"
                : "border border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-700)] hover:border-[var(--ink-900)]/25"
            }`}
          >
            All ({allTools.length})
          </button>
          {categories.map((cat) => {
            const count = allTools.filter((t) => t.category === cat).length
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition ${
                  activeCategory === cat
                    ? "bg-[var(--ink-900)] text-white"
                    : "border border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-700)] hover:border-[var(--ink-900)]/25"
                }`}
              >
                {cat} ({count})
              </button>
            )
          })}
        </div>
      </div>

      {displayedGroups ? (
        <div className="space-y-10">
          <PanelHeader
            eyebrow="Directory"
            title="Browse by Category"
            badge={`${allTools.length} available`}
            badgeClassName="border border-[var(--ink-900)]/10 bg-white text-sm normal-case tracking-normal"
            className="mb-4"
            titleClassName="sm:text-3xl"
          />

          {displayedGroups.map(({ category, tools }) => (
            <section key={category} aria-labelledby={`${category.toLowerCase()}-tools`}>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--ink-900)]/10 pb-3">
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
                  <ToolCard key={tool.href} tool={tool} />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--ink-900)]/10 pb-3">
            <h3 className="text-xl font-semibold text-[var(--ink-900)]">
              {activeCategory !== "All" ? `${activeCategory} Tools` : "Search Results"}
              {normalizedQuery ? ` for "${search}"` : ""}
            </h3>
            <button
              type="button"
              onClick={resetFilters}
              className="text-xs font-semibold uppercase tracking-[0.1em] text-[var(--accent-rust)] hover:underline"
            >
              Reset Filters
            </button>
          </div>

          {filteredTools.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-[var(--ink-900)]/15 bg-white p-12 text-center">
              <p className="text-lg font-semibold text-[var(--ink-900)]">No matching tools found</p>
              <p className="mt-2 text-sm text-[var(--ink-700)]">
                Try searching for another keyword like &quot;pdf&quot;, &quot;json&quot;, &quot;image&quot;, or &quot;calculator&quot;.
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 rounded-full bg-[var(--ink-900)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
              >
                Show all {allTools.length} tools
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {filteredTools.map((tool) => (
                <ToolCard key={tool.href} tool={tool} />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={tool.href}
      className="group rounded-[1.4rem] border border-[var(--ink-900)]/8 bg-white p-5 shadow-[0_14px_36px_rgba(33,37,41,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-rust)]/30 hover:shadow-[0_24px_48px_rgba(33,37,41,0.12)]"
    >
      <div className="flex min-h-full flex-col">
        <span className="w-fit rounded-full bg-[var(--page-cream)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-rust)]">
          {tool.category}
        </span>
        <h4 className="mt-4 text-xl font-semibold text-[var(--ink-900)] group-hover:text-[var(--accent-rust)] transition-colors">
          {tool.title}
        </h4>
        <p className="mt-3 flex-1 text-sm leading-7 text-[var(--ink-700)]/78">
          {tool.description}
        </p>
      </div>
    </Link>
  )
}
