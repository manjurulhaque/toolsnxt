"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { toolCategories, tools } from "@/lib/tools"
import { useToolPreferences } from "@/lib/user-preferences"
import {
  ArrowRightIcon,
  CategoryIcon,
  CornerDownLeftIcon,
  GridIcon,
  RotateCcwIcon,
  SearchIcon,
  StarIcon,
  XIcon,
} from "@/components/icons"

type ToolSearchDialogProps = {
  isOpen: boolean
  onClose: () => void
}

function ToolSearchModal({ onClose }: { onClose: () => void }) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("All")
  const [highlightedIndex, setHighlightedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const { favorites, isFavorite, toggleFavorite } = useToolPreferences()

  // Focus search input on mount
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Global keyboard shortcuts (Cmd+K / Ctrl+K and Esc to close)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        onClose()
      } else if (e.key === "Escape") {
        e.preventDefault()
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onClose])

  // Prevent background body scroll when open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [])

  const filteredTools = useMemo(() => {
    const q = query.trim().toLowerCase()
    const base = tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "All" ||
        (activeCategory === "Favorites"
          ? favorites.includes(tool.href)
          : tool.category.toLowerCase() === activeCategory.toLowerCase())
      if (!matchesCategory) return false

      if (!q) return true
      return (
        tool.title.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q) ||
        tool.category.toLowerCase().includes(q)
      )
    })

    // On initial view without search, pin favorites to top
    if (!q && activeCategory === "All") {
      const favs = base.filter((t) => favorites.includes(t.href))
      const others = base.filter((t) => !favorites.includes(t.href))
      return [...favs, ...others]
    }

    return base
  }, [query, activeCategory, favorites])

  const safeHighlightedIndex = Math.min(
    Math.max(0, highlightedIndex),
    Math.max(0, filteredTools.length - 1),
  )

  function handleQueryChange(value: string) {
    setQuery(value)
    setHighlightedIndex(0)
  }

  function handleCategoryChange(cat: string) {
    setActiveCategory(cat)
    setHighlightedIndex(0)
  }

  function handleInputKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setHighlightedIndex((prev) => {
        const next = Math.min(prev + 1, filteredTools.length - 1)
        scrollToItem(next)
        return next
      })
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setHighlightedIndex((prev) => {
        const next = Math.max(prev - 1, 0)
        scrollToItem(next)
        return next
      })
    } else if (e.key === "Enter") {
      e.preventDefault()
      const targetTool = filteredTools[safeHighlightedIndex]
      if (targetTool) {
        navigateToTool(targetTool.href)
      }
    }
  }

  function scrollToItem(index: number) {
    if (!listRef.current) return
    const items = listRef.current.querySelectorAll<HTMLElement>("[data-tool-item]")
    const target = items[index]
    if (target) {
      target.scrollIntoView({ block: "nearest", behavior: "smooth" })
    }
  }

  function navigateToTool(href: string) {
    onClose()
    router.push(href)
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search tools"
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 p-4 pt-12 sm:pt-20 backdrop-blur-sm animate-rise"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="flex max-h-[82vh] w-full max-w-2xl flex-col overflow-hidden rounded-[1.75rem] border border-[var(--ink-900)]/15 bg-white shadow-[0_24px_64px_rgba(33,37,41,0.22)]">
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[var(--ink-900)]/10 px-4 py-3 sm:px-6">
          <SearchIcon className="h-5 w-5 shrink-0 text-[var(--ink-700)]/70" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Type a tool name, category, or task..."
            className="flex-1 bg-transparent px-3 py-1.5 text-base text-[var(--ink-900)] outline-none placeholder:text-[var(--ink-700)]/60 sm:text-sm"
          />
          {query ? (
            <button
              type="button"
              onClick={() => {
                handleQueryChange("")
                inputRef.current?.focus()
              }}
              className="mr-2 inline-flex items-center justify-center rounded-full p-1 text-xs text-[var(--ink-700)] hover:bg-[var(--ink-900)]/5 hover:text-[var(--ink-900)] transition-colors"
              title="Clear search"
            >
              <XIcon className="h-4 w-4" />
            </button>
          ) : null}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-2 py-1 text-xs font-mono text-[var(--ink-700)] transition hover:border-[var(--ink-900)]/30"
          >
            ESC
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto border-b border-[var(--ink-900)]/10 bg-[var(--page-cream)]/50 px-4 py-2.5 sm:px-6">
          <button
            type="button"
            onClick={() => handleCategoryChange("All")}
            className={`inline-flex items-center gap-1 shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ${
              activeCategory === "All"
                ? "bg-[var(--ink-900)] text-white shadow-sm"
                : "border border-[var(--ink-900)]/10 bg-white text-[var(--ink-700)] hover:border-[var(--ink-900)]/30 hover:text-[var(--ink-900)]"
            }`}
          >
            <GridIcon className="h-3 w-3 shrink-0" />
            <span>All ({tools.length})</span>
          </button>

          {favorites.length > 0 ? (
            <button
              type="button"
              onClick={() => handleCategoryChange("Favorites")}
              className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition ${
                activeCategory === "Favorites"
                  ? "bg-[var(--accent-rust)] text-white shadow-sm"
                  : "border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/20 text-[var(--ink-900)] hover:border-[var(--accent-gold)]"
              }`}
            >
              <StarIcon className="h-3 w-3 fill-amber-400 text-amber-400" />
              <span>Favorites ({favorites.length})</span>
            </button>
          ) : null}

          {toolCategories.map((category) => {
            const count = tools.filter((t) => t.category === category).length
            const isSelected = activeCategory === category
            return (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`inline-flex items-center gap-1 shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ${
                  isSelected
                    ? "bg-[var(--ink-900)] text-white shadow-sm"
                    : "border border-[var(--ink-900)]/10 bg-white text-[var(--ink-700)] hover:border-[var(--ink-900)]/30 hover:text-[var(--ink-900)]"
                }`}
              >
                <CategoryIcon category={category} className="h-3 w-3 shrink-0" />
                <span>{category} ({count})</span>
              </button>
            )
          })}
        </div>

        {/* Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 sm:p-3">
          {filteredTools.length === 0 ? (
            <div className="py-12 text-center">
              <SearchIcon className="mx-auto h-8 w-8 text-[var(--ink-700)]/30 mb-2" />
              <p className="text-sm font-semibold text-[var(--ink-900)]">No tools found</p>
              <p className="mt-1 text-xs text-[var(--ink-700)]">
                No matching tools for &ldquo;{query}&rdquo;
                {activeCategory !== "All" ? ` in category "${activeCategory}"` : ""}.
              </p>
              <button
                type="button"
                onClick={() => {
                  handleQueryChange("")
                  handleCategoryChange("All")
                  inputRef.current?.focus()
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-1.5 text-xs font-medium text-[var(--ink-800)] hover:border-[var(--ink-900)]/25"
              >
                <RotateCcwIcon className="h-3 w-3" />
                <span>Reset filters</span>
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredTools.map((tool, index) => {
                const isHighlighted = index === safeHighlightedIndex
                const favorited = isFavorite(tool.href)
                return (
                  <div
                    key={tool.href}
                    data-tool-item
                    role="button"
                    tabIndex={0}
                    onClick={() => navigateToTool(tool.href)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        navigateToTool(tool.href)
                      }
                    }}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`group flex w-full cursor-pointer items-start justify-between gap-3 rounded-2xl p-3 text-left transition ${
                      isHighlighted
                        ? "bg-[var(--page-cream)] ring-1 ring-[var(--accent-rust)]"
                        : "hover:bg-[var(--page-cream)]/60"
                    }`}
                  >
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white border border-[var(--ink-900)]/8 text-[var(--accent-rust)] group-hover:bg-[var(--accent-rust)]/10 transition-colors">
                        <CategoryIcon category={tool.category} className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-[var(--ink-900)] group-hover:text-[var(--accent-rust)]">
                            {tool.title}
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full border border-[var(--ink-900)]/10 bg-white px-2 py-0.5 text-[10px] font-medium text-[var(--ink-700)]">
                            <CategoryIcon category={tool.category} className="h-2.5 w-2.5 text-[var(--accent-rust)]" />
                            <span>{tool.category}</span>
                          </span>
                          {favorited ? (
                            <StarIcon className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                          ) : null}
                        </div>
                        <p className="mt-1 line-clamp-1 text-xs text-[var(--ink-700)]">
                          {tool.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 self-center text-xs text-[var(--ink-700)]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(tool.href)
                        }}
                        className={`rounded-full p-1.5 transition ${
                          favorited
                            ? "text-amber-500 opacity-100 bg-amber-500/10 hover:bg-amber-500/20"
                            : "text-[var(--ink-700)]/30 opacity-0 group-hover:opacity-100 hover:text-[var(--ink-900)] hover:bg-white"
                        }`}
                        title={favorited ? "Remove from favorites" : "Add to favorites"}
                      >
                        <StarIcon className={`h-4 w-4 ${favorited ? "fill-amber-500 text-amber-500" : ""}`} />
                      </button>

                      {isHighlighted ? (
                        <span className="flex items-center gap-1 rounded bg-white px-2 py-1 font-mono text-[10px] font-semibold text-[var(--accent-rust)] shadow-sm">
                          <span>Open</span>
                          <CornerDownLeftIcon className="h-3 w-3" />
                        </span>
                      ) : (
                        <ArrowRightIcon className="h-3.5 w-3.5 text-[var(--ink-700)]/30 group-hover:text-[var(--accent-rust)] transition-transform group-hover:translate-x-0.5" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-[var(--ink-900)]/10 bg-[var(--page-cream)]/40 px-4 py-2.5 text-[11px] text-[var(--ink-700)] sm:px-6">
          <div className="hidden sm:flex sm:items-center sm:gap-4">
            <span>
              <kbd className="rounded bg-white px-1.5 py-0.5 font-mono shadow-sm">↑</kbd>{" "}
              <kbd className="rounded bg-white px-1.5 py-0.5 font-mono shadow-sm">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="rounded bg-white px-1.5 py-0.5 font-mono shadow-sm">↵</kbd> to select
            </span>
            <span>
              <kbd className="rounded bg-white px-1.5 py-0.5 font-mono shadow-sm">esc</kbd> to close
            </span>
          </div>
          <div>
            <span>
              {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"} available
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function ToolSearchDialog({ isOpen, onClose }: ToolSearchDialogProps) {
  if (!isOpen) return null
  return <ToolSearchModal onClose={onClose} />
}
