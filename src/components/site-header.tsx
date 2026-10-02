"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { SiteBrand } from "@/components/site-brand"
import { ToolSearchDialog } from "@/components/tool-search-dialog"
import { GridIcon, KeyboardIcon, SearchIcon, StarIcon } from "@/components/icons"
import { openShortcutsDialog } from "@/components/keyboard-shortcuts-dialog"
import { useToolPreferences } from "@/lib/user-preferences"
import { tools } from "@/lib/tools"

export function SiteHeader() {
  const pathname = usePathname()
  const compact = pathname !== "/"
  const [searchOpen, setSearchOpen] = useState(false)
  const { isFavorite, toggleFavorite, recordRecent } = useToolPreferences()

  const isToolPage = tools.some((t) => t.href === pathname)

  // Record tool page visit in recents
  useEffect(() => {
    if (isToolPage && pathname) {
      recordRecent(pathname)
    }
  }, [isToolPage, pathname, recordRecent])

  // Global keyboard shortcut to open search (Cmd+K / Ctrl+K and /)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setSearchOpen((prev) => !prev)
        return
      }

      // Open on "/" when not focused in an input/textarea
      if (e.key === "/" && !searchOpen) {
        const target = e.target as HTMLElement | null
        const isInputField =
          target?.tagName === "INPUT" ||
          target?.tagName === "TEXTAREA" ||
          target?.isContentEditable
        if (!isInputField) {
          e.preventDefault()
          setSearchOpen(true)
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [searchOpen])

  return (
    <>
      <header
        className={`border-b border-[var(--ink-900)]/10 ${
          compact ? "bg-white/80 backdrop-blur-md" : "bg-[var(--page-cream)]/90 backdrop-blur-xl"
        }`}
      >
        <nav
          className={`mx-auto flex items-center justify-between gap-4 px-5 py-3.5 sm:px-8 ${
            compact ? "max-w-6xl" : "max-w-7xl lg:px-12"
          }`}
        >
          <Link
            href="/"
            className={
              compact
                ? "text-sm font-semibold uppercase tracking-[0.18em]"
                : "flex min-w-0 items-center gap-3"
            }
          >
            <SiteBrand compact={compact} />
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {isToolPage ? (
              <button
                type="button"
                onClick={() => toggleFavorite(pathname)}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition sm:px-3.5 sm:py-2 ${
                  isFavorite(pathname)
                    ? "border-[var(--accent-gold)] bg-[var(--accent-gold)]/20 text-[var(--ink-900)] shadow-xs"
                    : "border-[var(--ink-900)]/10 bg-white text-[var(--ink-700)] hover:border-[var(--ink-900)]/30 hover:text-[var(--ink-900)]"
                }`}
                title={isFavorite(pathname) ? "Remove from favorites" : "Add to favorites"}
                aria-label={isFavorite(pathname) ? "Remove from favorites" : "Add to favorites"}
              >
                <StarIcon
                  filled={isFavorite(pathname)}
                  className={`h-3.5 w-3.5 ${
                    isFavorite(pathname) ? "text-[var(--accent-rust)]" : "text-[var(--ink-700)]/60"
                  }`}
                />
                <span className="hidden sm:inline">
                  {isFavorite(pathname) ? "Favorited" : "Favorite"}
                </span>
              </button>
            ) : null}

            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 rounded-full border border-[var(--ink-900)]/10 bg-white px-3 py-1.5 text-xs font-medium text-[var(--ink-800)] shadow-xs transition hover:border-[var(--ink-900)]/30 hover:bg-[var(--page-cream)]/50 sm:px-4 sm:py-2 sm:text-sm"
              aria-label="Search tools"
              title="Search tools (⌘K)"
            >
              <SearchIcon className="h-3.5 w-3.5 text-[var(--ink-700)] sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">
                {compact ? "Search tools..." : "Quick search 52 tools..."}
              </span>
              <span className="sm:hidden">Search</span>
              <kbd className="hidden rounded bg-[var(--page-cream)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--ink-700)] sm:inline">
                ⌘K
              </kbd>
            </button>

            <button
              type="button"
              onClick={openShortcutsDialog}
              aria-label="Keyboard shortcuts"
              title="Keyboard shortcuts (?)"
              className="hidden sm:flex h-9 w-9 items-center justify-center rounded-full border border-[var(--ink-900)]/10 bg-white text-[var(--ink-700)] shadow-xs transition hover:border-[var(--ink-900)]/30 hover:bg-[var(--page-cream)]/50 hover:text-[var(--ink-900)]"
            >
              <KeyboardIcon className="h-4 w-4" />
            </button>

            {compact ? (
              <Link
                href="/"
                className="flex items-center gap-1.5 rounded-full border border-[var(--ink-900)]/10 bg-white px-3.5 py-1.5 text-xs font-medium text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25 hover:bg-[var(--page-cream)]/50 sm:px-4 sm:py-2 sm:text-sm"
              >
                <GridIcon className="h-3.5 w-3.5 text-[var(--ink-700)]" />
                <span>All Tools</span>
              </Link>
            ) : null}
          </div>
        </nav>
      </header>

      <ToolSearchDialog isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
