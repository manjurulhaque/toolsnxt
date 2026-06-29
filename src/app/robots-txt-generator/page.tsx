"use client"

import { useMemo, useState } from "react"
import { PanelHeader, ToolIntro, ToolPage, InfoBox, SummaryTile, ToolPanel } from "@/components/tool-page"
import { copyToClipboard, downloadTextFile } from "@/lib/browser-actions"

type Preset = "public" | "block-all" | "admin-private"

const sampleAllow = "/"
const sampleDisallow = ["/admin", "/api", "/private"].join("\n")

export default function RobotsTxtGeneratorPage() {
  const [userAgent, setUserAgent] = useState("*")
  const [allowText, setAllowText] = useState(sampleAllow)
  const [disallowText, setDisallowText] = useState(sampleDisallow)
  const [sitemapUrl, setSitemapUrl] = useState("https://example.com/sitemap.xml")
  const [hostUrl, setHostUrl] = useState("https://example.com")
  const [crawlDelay, setCrawlDelay] = useState("")
  const [message, setMessage] = useState("Add crawler rules to generate robots.txt.")

  const robotsText = useMemo(
    () =>
      generateRobotsTxt({
        userAgent,
        allowText,
        disallowText,
        sitemapUrl,
        hostUrl,
        crawlDelay,
      }),
    [allowText, crawlDelay, disallowText, hostUrl, sitemapUrl, userAgent],
  )
  const stats = useMemo(() => getRobotsStats(robotsText), [robotsText])

  async function copyRobots() {
    if (!robotsText.trim()) {
      setMessage("Add rules before copying.")
      return
    }

    try {
      await copyToClipboard(robotsText)
      setMessage("robots.txt copied.")
    } catch {
      setMessage("Copy failed. Select the robots.txt output and copy it manually.")
    }
  }

  function downloadRobots() {
    if (!robotsText.trim()) {
      setMessage("Add rules before downloading.")
      return
    }

    downloadTextFile(robotsText, "robots.txt")
    setMessage("robots.txt downloaded.")
  }

  function loadPreset(preset: Preset) {
    if (preset === "public") {
      setUserAgent("*")
      setAllowText("/")
      setDisallowText("")
      setMessage("Public site preset loaded.")
    }

    if (preset === "block-all") {
      setUserAgent("*")
      setAllowText("")
      setDisallowText("/")
      setMessage("Block all preset loaded.")
    }

    if (preset === "admin-private") {
      setUserAgent("*")
      setAllowText("/")
      setDisallowText(sampleDisallow)
      setMessage("Private admin preset loaded.")
    }
  }

  function clearAll() {
    setUserAgent("*")
    setAllowText("")
    setDisallowText("")
    setSitemapUrl("")
    setHostUrl("")
    setCrawlDelay("")
    setMessage("Workspace cleared.")
  }

  return (
    <ToolPage>
        <ToolPanel>
          <ToolIntro eyebrow="SEO tool" title="Robots.txt Generator">
            Build crawler rules with allow and disallow paths, sitemap references, host hints, and
            optional crawl delay.
          </ToolIntro>

          <div className="mt-6 grid grid-cols-3 gap-2">
            <PresetButton label="Public" onClick={() => loadPreset("public")} />
            <PresetButton label="Block All" onClick={() => loadPreset("block-all")} />
            <PresetButton label="Private" onClick={() => loadPreset("admin-private")} />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <TextInput id="robots-agent" label="User-agent" value={userAgent} onChange={setUserAgent} />
            <TextInput
              id="crawl-delay"
              label="Crawl delay"
              value={crawlDelay}
              onChange={setCrawlDelay}
              placeholder="Optional seconds"
            />
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <PathList
              id="allow-paths"
              label="Allow paths"
              value={allowText}
              onChange={(value) => {
                setAllowText(value)
                setMessage("Allow rules updated.")
              }}
              placeholder={"/\n/public"}
            />
            <PathList
              id="disallow-paths"
              label="Disallow paths"
              value={disallowText}
              onChange={(value) => {
                setDisallowText(value)
                setMessage("Disallow rules updated.")
              }}
              placeholder={"/admin\n/api"}
            />
          </div>

          <div className="mt-5 grid gap-4">
            <TextInput
              id="sitemap-url"
              label="Sitemap URL"
              value={sitemapUrl}
              onChange={setSitemapUrl}
              placeholder="https://example.com/sitemap.xml"
            />
            <TextInput
              id="host-url"
              label="Host"
              value={hostUrl}
              onChange={setHostUrl}
              placeholder="https://example.com"
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={clearAll}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => loadPreset("admin-private")}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Load Sample
            </button>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Output" title="Generated robots.txt" badge={"{stats.directives} directives"} />

          <textarea
            value={robotsText}
            readOnly
            rows={21}
            spellCheck={false}
            className="mt-6 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none"
            placeholder="Generated robots.txt will appear here..."
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Allow" value={stats.allow} />
            <SummaryTile label="Disallow" value={stats.disallow} />
            <SummaryTile label="Lines" value={stats.lines} />
          </div>

          <div className="mt-5 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--ink-700)]">
              Summary
            </h3>
            <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
              {stats.disallow === 0
                ? "No blocked paths are listed."
                : `${stats.disallow} blocked path${stats.disallow === 1 ? "" : "s"} listed.`}{" "}
              {sitemapUrl.trim() ? "A sitemap reference is included." : "No sitemap reference is included."}
            </p>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto_auto]">
            <InfoBox>
              {message}
          </InfoBox>
            <button
              type="button"
              onClick={copyRobots}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Copy
            </button>
            <button
              type="button"
              onClick={downloadRobots}
              className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
            >
              Download
            </button>
          </div>
        </ToolPanel>
    </ToolPage>
  )
}

function PresetButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-3 py-2 text-xs font-semibold text-[var(--ink-700)] transition hover:bg-white sm:text-sm"
    >
      {label}
    </button>
  )
}

function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
      />
    </label>
  )
}

function PathList({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <textarea
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={7}
        spellCheck={false}
        placeholder={placeholder}
        className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
      />
    </label>
  )
}

function generateRobotsTxt({
  userAgent,
  allowText,
  disallowText,
  sitemapUrl,
  hostUrl,
  crawlDelay,
}: {
  userAgent: string
  allowText: string
  disallowText: string
  sitemapUrl: string
  hostUrl: string
  crawlDelay: string
}) {
  const lines = [`User-agent: ${userAgent.trim() || "*"}`]
  const allowPaths = getPaths(allowText)
  const disallowPaths = getPaths(disallowText)
  const delay = Number(crawlDelay)

  allowPaths.forEach((path) => lines.push(`Allow: ${path}`))
  disallowPaths.forEach((path) => lines.push(`Disallow: ${path}`))

  if (crawlDelay.trim() && Number.isFinite(delay) && delay >= 0) {
    lines.push(`Crawl-delay: ${delay}`)
  }

  if (sitemapUrl.trim()) {
    lines.push("", `Sitemap: ${sitemapUrl.trim()}`)
  }

  if (hostUrl.trim()) {
    lines.push(`Host: ${hostUrl.trim()}`)
  }

  return lines.join("\n")
}

function getPaths(value: string) {
  return Array.from(
    new Set(
      value
        .split(/\r?\n/)
        .map((line) => line.trim())
        .filter(Boolean)
        .map((path) => (path.startsWith("/") || path === "*" ? path : `/${path}`)),
    ),
  )
}

function getRobotsStats(value: string) {
  const lines = value.split(/\r?\n/).filter(Boolean)

  return {
    lines: lines.length,
    allow: lines.filter((line) => line.startsWith("Allow:")).length,
    disallow: lines.filter((line) => line.startsWith("Disallow:")).length,
    directives: lines.filter((line) => line.includes(":")).length,
  }
}
