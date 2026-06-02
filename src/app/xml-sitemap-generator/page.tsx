"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type ChangeFrequency = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"

const samplePaths = ["/", "/about", "/tools/image-converter", "/blog/first-post"].join("\n")
const today = new Date().toISOString().slice(0, 10)
const changeFrequencies: ChangeFrequency[] = [
  "always",
  "hourly",
  "daily",
  "weekly",
  "monthly",
  "yearly",
  "never",
]

export default function XmlSitemapGeneratorPage() {
  const [baseUrl, setBaseUrl] = useState("https://example.com")
  const [pathsText, setPathsText] = useState(samplePaths)
  const [changeFrequency, setChangeFrequency] = useState<ChangeFrequency>("weekly")
  const [priority, setPriority] = useState("0.8")
  const [includeLastModified, setIncludeLastModified] = useState(true)
  const [lastModified, setLastModified] = useState(today)
  const [message, setMessage] = useState("Add URLs or paths to generate a sitemap.xml file.")

  const urls = useMemo(() => buildUrlEntries(baseUrl, pathsText), [baseUrl, pathsText])
  const sitemapXml = useMemo(
    () =>
      generateSitemapXml({
        urls,
        changeFrequency,
        priority,
        lastModified: includeLastModified ? lastModified : "",
      }),
    [changeFrequency, includeLastModified, lastModified, priority, urls],
  )

  async function copySitemap() {
    if (urls.length === 0) {
      setMessage("Add at least one valid URL or path before copying.")
      return
    }

    try {
      await navigator.clipboard.writeText(sitemapXml)
      setMessage("Sitemap XML copied.")
    } catch {
      setMessage("Copy failed. Select the XML and copy it manually.")
    }
  }

  function downloadSitemap() {
    if (urls.length === 0) {
      setMessage("Add at least one valid URL or path before downloading.")
      return
    }

    const blob = new Blob([sitemapXml], { type: "application/xml;charset=utf-8" })
    const downloadUrl = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = "sitemap.xml"
    link.click()
    URL.revokeObjectURL(downloadUrl)
    setMessage("sitemap.xml downloaded.")
  }

  function clearForm() {
    setPathsText("")
    setMessage("URL list cleared.")
  }

  function loadSample() {
    setBaseUrl("https://example.com")
    setPathsText(samplePaths)
    setChangeFrequency("weekly")
    setPriority("0.8")
    setIncludeLastModified(true)
    setLastModified(today)
    setMessage("Sample sitemap loaded.")
  }

  return (
    <main className="min-h-screen bg-[var(--page-cream)] text-[var(--ink-900)]">
      <header className="border-b border-[var(--ink-900)]/10 bg-white/70">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.18em]">
            Quotations Archive
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[var(--ink-900)]/10 bg-white px-4 py-2 text-sm font-medium text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
          >
            Home
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
            SEO tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">XML Sitemap Generator</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Build a valid sitemap.xml from page paths or full URLs. Add metadata once, then copy or
            download the generated XML.
          </p>

          <label htmlFor="base-url" className="mt-6 block text-sm font-medium">
            Base URL
          </label>
          <input
            id="base-url"
            type="url"
            value={baseUrl}
            onChange={(event) => {
              setBaseUrl(event.target.value)
              setMessage("Base URL updated.")
            }}
            placeholder="https://example.com"
            className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
          />

          <label htmlFor="paths" className="mt-5 block text-sm font-medium">
            URLs or paths
          </label>
          <textarea
            id="paths"
            value={pathsText}
            onChange={(event) => {
              setPathsText(event.target.value)
              setMessage("URL list updated.")
            }}
            rows={10}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
            placeholder={"/\n/pricing\nhttps://example.com/contact"}
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={clearForm}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={loadSample}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Load Sample
            </button>
          </div>
        </div>

        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                Output
              </p>
              <h2 className="mt-2 text-2xl font-semibold">Generated XML</h2>
            </div>
            <p className="rounded-full bg-[var(--page-cream)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--ink-700)]">
              {urls.length} URLs
            </p>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label htmlFor="change-frequency" className="block">
              <span className="text-sm font-medium">Change frequency</span>
              <select
                id="change-frequency"
                value={changeFrequency}
                onChange={(event) => setChangeFrequency(event.target.value as ChangeFrequency)}
                className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
              >
                {changeFrequencies.map((frequency) => (
                  <option key={frequency} value={frequency}>
                    {frequency}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor="priority" className="block">
              <span className="text-sm font-medium">Priority</span>
              <input
                id="priority"
                type="number"
                min="0"
                max="1"
                step="0.1"
                value={priority}
                onChange={(event) => setPriority(event.target.value)}
                className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
              />
            </label>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-[auto_1fr] sm:items-end">
            <label className="flex items-center gap-3 rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm font-medium">
              <input
                type="checkbox"
                checked={includeLastModified}
                onChange={(event) => setIncludeLastModified(event.target.checked)}
                className="h-4 w-4 accent-[var(--accent-rust)]"
              />
              Last modified
            </label>

            <label htmlFor="last-modified" className="block">
              <span className="text-sm font-medium">Date</span>
              <input
                id="last-modified"
                type="date"
                value={lastModified}
                disabled={!includeLastModified}
                onChange={(event) => setLastModified(event.target.value)}
                className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)] disabled:opacity-45"
              />
            </label>
          </div>

          <textarea
            value={sitemapXml}
            readOnly
            rows={15}
            className="mt-6 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-xs leading-6 outline-none"
            aria-label="Generated XML sitemap"
          />

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
            <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 text-sm text-[var(--ink-700)]">
              {message}
            </div>
            <button
              type="button"
              onClick={copySitemap}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Copy XML
            </button>
            <button
              type="button"
              onClick={downloadSitemap}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Download
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}

function buildUrlEntries(baseUrl: string, pathsText: string) {
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl)

  return Array.from(
    new Set(
      pathsText
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => normalizeUrl(line, normalizedBaseUrl))
        .filter((url): url is string => Boolean(url)),
    ),
  )
}

function normalizeBaseUrl(value: string) {
  const trimmedValue = value.trim().replace(/\/+$/, "")
  if (!trimmedValue) {
    return ""
  }

  return /^https?:\/\//i.test(trimmedValue) ? trimmedValue : `https://${trimmedValue}`
}

function normalizeUrl(value: string, baseUrl: string) {
  if (/^https?:\/\//i.test(value)) {
    return value
  }

  if (!baseUrl) {
    return ""
  }

  const path = value.startsWith("/") ? value : `/${value}`
  return `${baseUrl}${path}`
}

function generateSitemapXml({
  urls,
  changeFrequency,
  priority,
  lastModified,
}: {
  urls: string[]
  changeFrequency: ChangeFrequency
  priority: string
  lastModified: string
}) {
  const normalizedPriority = normalizePriority(priority)
  const urlEntries = urls
    .map((url) => {
      const lines = [`    <loc>${escapeXml(url)}</loc>`]

      if (lastModified) {
        lines.push(`    <lastmod>${escapeXml(lastModified)}</lastmod>`)
      }

      lines.push(`    <changefreq>${changeFrequency}</changefreq>`)
      lines.push(`    <priority>${normalizedPriority}</priority>`)

      return `  <url>\n${lines.join("\n")}\n  </url>`
    })
    .join("\n")

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    urlEntries,
    "</urlset>",
  ]
    .filter(Boolean)
    .join("\n")
}

function normalizePriority(value: string) {
  const numericValue = Number(value)
  if (!Number.isFinite(numericValue)) {
    return "0.5"
  }

  return Math.min(Math.max(numericValue, 0), 1).toFixed(1)
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
}
