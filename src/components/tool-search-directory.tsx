"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import type { Tool } from "@/lib/tools"
import { PanelHeader } from "@/components/tool-page"
import { useToolPreferences } from "@/lib/user-preferences"
import {
  ArrowRightIcon,
  CategoryIcon,
  ClockHistoryIcon,
  GridIcon,
  RotateCcwIcon,
  SearchIcon,
  StarIcon,
  TrashIcon,
  XIcon,
} from "@/components/icons"

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
  const { favorites, recents, isFavorite, toggleFavorite, clearRecents } = useToolPreferences()

  const normalizedQuery = search.trim().toLowerCase()

  const favoriteTools = useMemo(() => {
    return allTools.filter((tool) => favorites.includes(tool.href))
  }, [allTools, favorites])

  const recentTools = useMemo(() => {
    return recents
      .map((href) => allTools.find((t) => t.href === href))
      .filter((t): t is Tool => Boolean(t))
  }, [allTools, recents])

  const filteredByCategory = useMemo(() => {
    if (activeCategory === "All") {
      return allTools
    }
    if (activeCategory === "Favorites") {
      return favoriteTools
    }
    return allTools.filter((tool) => tool.category === activeCategory)
  }, [allTools, activeCategory, favoriteTools])

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
      return null
    }
    return toolsByCategory
  }, [activeCategory, normalizedQuery, toolsByCategory])

  function resetFilters() {
    setSearch("")
    setActiveCategory("All")
  }

  return (
    <section className="mt-8 space-y-8">
      {/* Search and Category Filter Bar */}
      <div className="rounded-[1.5rem] border border-[var(--ink-900)]/10 bg-white p-4 shadow-[0_12px_32px_rgba(33,37,41,0.05)] sm:p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1">
            <label htmlFor="tool-search-input" className="sr-only">
              Search tools
            </label>
            <SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ink-700)]/50" />
            <input
              id="tool-search-input"
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search 52 browser tools (e.g. pdf, json, image, svg, timer)..."
              className="w-full rounded-full border border-[var(--ink-900)]/12 bg-[var(--page-cream)] pl-11 pr-20 py-3.5 text-sm text-[var(--ink-900)] placeholder:text-[var(--ink-700)]/60 outline-none transition focus:border-[var(--accent-rust)]"
            />
            {search ? (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 inline-flex items-center gap-1 rounded-full bg-black/5 px-2.5 py-1 text-xs font-semibold text-[var(--ink-700)] transition hover:bg-black/10 hover:text-[var(--ink-900)]"
                aria-label="Clear search input"
              >
                <XIcon className="h-3 w-3" />
                <span>Clear</span>
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
            className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition ${
              activeCategory === "All"
                ? "bg-[var(--ink-900)] text-white shadow-xs"
                : "border border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-700)] hover:border-[var(--ink-900)]/25"
            }`}
          >
            <GridIcon className="h-3.5 w-3.5 shrink-0" />
            <span>All ({allTools.length})</span>
          </button>

          {favoriteTools.length > 0 ? (
            <button
              type="button"
              onClick={() => setActiveCategory("Favorites")}
              className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition ${
                activeCategory === "Favorites"
                  ? "bg-[var(--accent-rust)] text-white shadow-xs"
                  : "border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/15 text-[var(--ink-900)] hover:border-[var(--accent-gold)]"
              }`}
            >
              <StarIcon className="h-3.5 w-3.5 shrink-0 fill-amber-400 text-amber-400" />
              <span>Favorites ({favoriteTools.length})</span>
            </button>
          ) : null}

          {categories.map((cat) => {
            const count = allTools.filter((t) => t.category === cat).length
            const isSelected = activeCategory === cat
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.08em] transition ${
                  isSelected
                    ? "bg-[var(--ink-900)] text-white shadow-xs"
                    : "border border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-700)] hover:border-[var(--ink-900)]/25"
                }`}
              >
                <CategoryIcon category={cat} className="h-3.5 w-3.5 shrink-0" />
                <span>{cat} ({count})</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Pinned & Recent Tools Section */}
      {activeCategory === "All" && !normalizedQuery && (favoriteTools.length > 0 || recentTools.length > 0) ? (
        <div className="space-y-6 rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white/70 p-6 backdrop-blur-sm sm:p-8">
          {favoriteTools.length > 0 ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[var(--ink-900)]/10 pb-2">
                <div className="flex items-center gap-2">
                  <StarIcon className="h-5 w-5 fill-amber-500 text-amber-500" />
                  <h3 className="text-lg font-semibold text-[var(--ink-900)]">Pinned Favorites</h3>
                </div>
                <span className="text-xs text-[var(--ink-700)]">
                  {favoriteTools.length} {favoriteTools.length === 1 ? "tool" : "tools"}
                </span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {favoriteTools.map((tool) => (
                  <ToolCard
                    key={tool.href}
                    tool={tool}
                    isFavorite={true}
                    onToggleFavorite={() => toggleFavorite(tool.href)}
                  />
                ))}
              </div>
            </div>
          ) : null}

          {recentTools.length > 0 ? (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between border-b border-[var(--ink-900)]/10 pb-2">
                <div className="flex items-center gap-2">
                  <ClockHistoryIcon className="h-5 w-5 text-[var(--accent-rust)]" />
                  <h3 className="text-lg font-semibold text-[var(--ink-900)]">Recently Visited</h3>
                </div>
                <button
                  type="button"
                  onClick={clearRecents}
                  className="inline-flex items-center gap-1.5 text-xs text-[var(--ink-700)] hover:text-[var(--accent-rust)] transition-colors"
                >
                  <TrashIcon className="h-3.5 w-3.5" />
                  <span>Clear history</span>
                </button>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {recentTools.slice(0, 4).map((tool) => (
                  <Link
                    key={tool.href}
                    href={tool.href}
                    className="group flex items-center justify-between gap-3 rounded-xl border border-[var(--ink-900)]/8 bg-white p-3.5 shadow-xs transition hover:border-[var(--accent-rust)]/30 hover:bg-[var(--page-cream)]/50"
                  >
                    <div className="flex items-center gap-2.5 min-w-0 flex-1">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--page-cream)] text-[var(--accent-rust)] transition group-hover:bg-[var(--accent-rust)]/10">
                        <CategoryIcon category={tool.category} className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[var(--ink-900)] group-hover:text-[var(--accent-rust)]">
                          {tool.title}
                        </p>
                        <p className="truncate text-[11px] text-[var(--ink-700)]">{tool.category}</p>
                      </div>
                    </div>
                    <ArrowRightIcon className="h-3.5 w-3.5 shrink-0 text-[var(--ink-700)]/40 transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--accent-rust)]" />
                  </Link>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Main Tools Catalog */}
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
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent-rust)]/10 text-[var(--accent-rust)] shadow-2xs">
                    <CategoryIcon category={category} className="h-4 w-4" />
                  </span>
                  <h3
                    id={`${category.toLowerCase()}-tools`}
                    className="text-xl font-semibold text-[var(--ink-900)]"
                  >
                    {category}
                  </h3>
                </div>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-[var(--ink-700)] shadow-[0_10px_24px_rgba(33,37,41,0.05)]">
                  {tools.length} {tools.length === 1 ? "tool" : "tools"}
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {tools.map((tool) => (
                  <ToolCard
                    key={tool.href}
                    tool={tool}
                    isFavorite={isFavorite(tool.href)}
                    onToggleFavorite={() => toggleFavorite(tool.href)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-3 border-b border-[var(--ink-900)]/10 pb-3">
            <h3 className="text-xl font-semibold text-[var(--ink-900)]">
              {activeCategory === "Favorites"
                ? "Your Favorite Tools"
                : activeCategory !== "All"
                ? `${activeCategory} Tools`
                : "Search Results"}
              {normalizedQuery ? ` for "${search}"` : ""}
            </h3>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.1em] text-[var(--accent-rust)] transition hover:underline"
            >
              <RotateCcwIcon className="h-3.5 w-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>

          {filteredTools.length === 0 ? (
            <div className="rounded-[1.75rem] border border-dashed border-[var(--ink-900)]/15 bg-white p-12 text-center">
              <SearchIcon className="mx-auto h-10 w-10 text-[var(--ink-700)]/30 mb-3" />
              <p className="text-lg font-semibold text-[var(--ink-900)]">
                {activeCategory === "Favorites"
                  ? "No favorite tools yet"
                  : "No matching tools found"}
              </p>
              <p className="mt-2 text-sm text-[var(--ink-700)]">
                {activeCategory === "Favorites"
                  ? "Click the star icon (★) on any tool card or in the tool header to save it for quick access."
                  : 'Try searching for another keyword like "pdf", "json", "image", or "calculator".'}
              </p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[var(--ink-900)] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
              >
                <GridIcon className="h-4 w-4" />
                <span>Show all {allTools.length} tools</span>
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {filteredTools.map((tool) => (
                <ToolCard
                  key={tool.href}
                  tool={tool}
                  isFavorite={isFavorite(tool.href)}
                  onToggleFavorite={() => toggleFavorite(tool.href)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  )
}

function ToolCard({
  tool,
  isFavorite,
  onToggleFavorite,
}: {
  tool: Tool
  isFavorite?: boolean
  onToggleFavorite?: () => void
}) {
  return (
    <div className="group relative flex flex-col justify-between rounded-[1.4rem] border border-[var(--ink-900)]/8 bg-white p-5 shadow-[0_14px_36px_rgba(33,37,41,0.06)] transition duration-300 hover:-translate-y-1 hover:border-[var(--accent-rust)]/30 hover:shadow-[0_24px_48px_rgba(33,37,41,0.12)]">
      <div className="flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 w-fit rounded-full bg-[var(--page-cream)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--accent-rust)]">
          <CategoryIcon category={tool.category} className="h-3.5 w-3.5 shrink-0" />
          <span>{tool.category}</span>
        </span>

        {onToggleFavorite ? (
          <button
            type="button"
            onClick={onToggleFavorite}
            className={`rounded-full p-1.5 transition ${
              isFavorite
                ? "text-amber-500 bg-amber-500/10 hover:bg-amber-500/20"
                : "text-[var(--ink-700)]/30 opacity-60 group-hover:opacity-100 hover:text-[var(--ink-900)] hover:bg-[var(--page-cream)]"
            }`}
            title={isFavorite ? "Remove favorite" : "Pin favorite"}
            aria-label={isFavorite ? "Remove favorite" : "Pin favorite"}
          >
            <StarIcon
              className={`h-4 w-4 ${isFavorite ? "fill-amber-500 text-amber-500" : ""}`}
            />
          </button>
        ) : null}
      </div>

      <Link href={tool.href} className="mt-4 flex flex-1 flex-col">
        <h4 className="text-xl font-semibold text-[var(--ink-900)] transition-colors group-hover:text-[var(--accent-rust)]">
          {tool.title}
        </h4>
        <p className="mt-3 flex-1 text-sm leading-7 text-[var(--ink-700)]/78">
          {tool.description}
        </p>
      </Link>

      <div className="mt-4 flex items-center justify-between border-t border-[var(--ink-900)]/6 pt-3 text-xs font-semibold text-[var(--ink-700)] transition-colors group-hover:text-[var(--accent-rust)]">
        <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">Launch tool</span>
        <ArrowRightIcon className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
      </div>
    </div>
  )
}
