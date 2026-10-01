"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { toolCategories, tools } from "@/lib/tools"
import { useToolPreferences } from "@/lib/user-preferences"

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
    if (!q && activeCategory === "All" && favorites.length > 0) {
      return [
        ...base.filter((t) => favorites.includes(t.href)),
        ...base.filter((t) => !favorites.includes(t.href)),
      ]
    }

    return base
  }, [query, activeCategory, favorites])

  const safeHighlightedIndex =
    filteredTools.length > 0 ? Math.min(highlightedIndex, filteredTools.length - 1) : 0

  function handleQueryChange(newQuery: string) {
    setQuery(newQuery)
    setHighlightedIndex(0)
  }

  function handleCategoryChange(newCategory: string) {
    setActiveCategory(newCategory)
    setHighlightedIndex(0)
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (filteredTools.length === 0) return

    if (e.key === "ArrowDown") {
      e.preventDefault()
      const nextIndex = (safeHighlightedIndex + 1) % filteredTools.length
      setHighlightedIndex(nextIndex)
      scrollHighlightedIntoView(nextIndex)
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      const prevIndex = (safeHighlightedIndex - 1 + filteredTools.length) % filteredTools.length
      setHighlightedIndex(prevIndex)
      scrollHighlightedIntoView(prevIndex)
    } else if (e.key === "Enter") {
      e.preventDefault()
      const selected = filteredTools[safeHighlightedIndex]
      if (selected) {
        navigateToTool(selected.href)
      }
    }
  }

  function scrollHighlightedIntoView(index: number) {
    if (!listRef.current) return
    const items = listRef.current.querySelectorAll<HTMLButtonElement>("[data-tool-item]")
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
          <svg
            className="h-5 w-5 shrink-0 text-[var(--ink-700)]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
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
              className="mr-2 rounded-full p-1 text-xs text-[var(--ink-700)] hover:bg-[var(--ink-900)]/5 hover:text-[var(--ink-900)]"
              title="Clear search"
            >
              ✕
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
            className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ${
              activeCategory === "All"
                ? "bg-[var(--ink-900)] text-white shadow-sm"
                : "border border-[var(--ink-900)]/10 bg-white text-[var(--ink-700)] hover:border-[var(--ink-900)]/30 hover:text-[var(--ink-900)]"
            }`}
          >
            All ({tools.length})
          </button>

          {favorites.length > 0 ? (
            <button
              type="button"
              onClick={() => handleCategoryChange("Favorites")}
              className={`flex shrink-0 items-center gap-1 rounded-full px-3 py-1 text-xs font-medium transition ${
                activeCategory === "Favorites"
                  ? "bg-[var(--accent-rust)] text-white shadow-sm"
                  : "border border-[var(--accent-gold)]/40 bg-[var(--accent-gold)]/20 text-[var(--ink-900)] hover:border-[var(--accent-gold)]"
              }`}
            >
              <span>★</span>
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
                className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium transition ${
                  isSelected
                    ? "bg-[var(--ink-900)] text-white shadow-sm"
                    : "border border-[var(--ink-900)]/10 bg-white text-[var(--ink-700)] hover:border-[var(--ink-900)]/30 hover:text-[var(--ink-900)]"
                }`}
              >
                {category} ({count})
              </button>
            )
          })}
        </div>

        {/* Results List */}
        <div ref={listRef} className="flex-1 overflow-y-auto p-2 sm:p-3">
          {filteredTools.length === 0 ? (
            <div className="py-12 text-center">
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
                className="mt-4 rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-1.5 text-xs font-medium text-[var(--ink-800)] hover:border-[var(--ink-900)]/25"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="space-y-1">
              {filteredTools.map((tool, index) => {
                const isHighlighted = index === safeHighlightedIndex
                const favorited = isFavorite(tool.href)
                return (
                  <button
                    key={tool.href}
                    data-tool-item
                    type="button"
                    onClick={() => navigateToTool(tool.href)}
                    onMouseEnter={() => setHighlightedIndex(index)}
                    className={`group flex w-full items-start justify-between gap-3 rounded-2xl p-3 text-left transition ${
                      isHighlighted
                        ? "bg-[var(--page-cream)] ring-1 ring-[var(--accent-rust)]"
                        : "hover:bg-[var(--page-cream)]/60"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-[var(--ink-900)] group-hover:text-[var(--accent-rust)]">
                          {tool.title}
                        </span>
                        <span className="rounded-full border border-[var(--ink-900)]/10 bg-white px-2 py-0.5 text-[11px] font-medium text-[var(--ink-700)]">
                          {tool.category}
                        </span>
                        {favorited ? (
                          <span
                            className="text-xs text-[var(--accent-rust)]"
                            title="Favorited tool"
                          >
                            ★
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 line-clamp-1 text-xs text-[var(--ink-700)]">
                        {tool.description}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2 self-center text-xs text-[var(--ink-700)]">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleFavorite(tool.href)
                        }}
                        className={`rounded-full p-1 transition ${
                          favorited
                            ? "text-[var(--accent-rust)] opacity-100"
                            : "text-[var(--ink-700)]/30 opacity-0 group-hover:opacity-100 hover:text-[var(--ink-900)]"
                        }`}
                        title={favorited ? "Remove from favorites" : "Add to favorites"}
                      >
                        <span className="text-sm">{favorited ? "★" : "☆"}</span>
                      </button>

                      {isHighlighted ? (
                        <span className="flex items-center gap-1 rounded bg-white px-2 py-1 font-mono text-[10px] font-semibold text-[var(--accent-rust)] shadow-sm">
                          Open <span className="text-xs">↵</span>
                        </span>
                      ) : (
                        <span className="text-[var(--ink-700)]/40 group-hover:text-[var(--accent-rust)]">
                          →
                        </span>
                      )}
                    </div>
                  </button>
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
