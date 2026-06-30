"use client"

import { useMemo, useState } from "react"
import { ToolIntro, ToolPage, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { copyToClipboard } from "@/lib/browser-actions"

type TwitterCard = "summary" | "summary_large_image"

const sample = {
  title: "Web Tools - Fast Browser Utilities",
  description: "A compact collection of practical calculators, converters, and generators.",
  url: "https://example.com/tools",
  siteName: "Web Tools",
  imageUrl: "https://example.com/og-image.png",
  robots: "index, follow",
}

export default function MetaTagGeneratorPage() {
  const [title, setTitle] = useState(sample.title)
  const [description, setDescription] = useState(sample.description)
  const [url, setUrl] = useState(sample.url)
  const [siteName, setSiteName] = useState(sample.siteName)
  const [imageUrl, setImageUrl] = useState(sample.imageUrl)
  const [robots, setRobots] = useState(sample.robots)
  const [twitterCard, setTwitterCard] = useState<TwitterCard>("summary_large_image")
  const [message, setMessage] = useState("Fill in page details to generate SEO and social tags.")

  const tags = useMemo(
    () =>
      generateMetaTags({
        title,
        description,
        url,
        siteName,
        imageUrl,
        robots,
        twitterCard,
      }),
    [description, imageUrl, robots, siteName, title, twitterCard, url],
  )
  const stats = useMemo(() => getMetaStats(title, description), [description, title])

  async function copyTags() {
    if (!tags.trim()) {
      setMessage("Add page details before copying.")
      return
    }

    try {
      await copyToClipboard(tags)
      setMessage("Meta tags copied.")
    } catch {
      setMessage("Copy failed. Select the tags and copy them manually.")
    }
  }

  function clearAll() {
    setTitle("")
    setDescription("")
    setUrl("")
    setSiteName("")
    setImageUrl("")
    setRobots("index, follow")
    setTwitterCard("summary_large_image")
    setMessage("Workspace cleared.")
  }

  function loadSample() {
    setTitle(sample.title)
    setDescription(sample.description)
    setUrl(sample.url)
    setSiteName(sample.siteName)
    setImageUrl(sample.imageUrl)
    setRobots(sample.robots)
    setTwitterCard("summary_large_image")
    setMessage("Sample metadata loaded.")
  }

  return (
    <ToolPage>
        <ToolPanel>
          <ToolIntro eyebrow="SEO tool" title="Meta Tag Generator">
            Generate page title, description, robots, canonical, Open Graph, and Twitter card tags
            with live search and social previews.
          </ToolIntro>

          <div className="mt-6 grid gap-4">
            <TextInput id="meta-title" label="Title" value={title} onChange={setTitle} />
            <label htmlFor="meta-description" className="block">
              <span className="text-sm font-medium">Description</span>
              <textarea
                id="meta-description"
                value={description}
                onChange={(event) => {
                  setDescription(event.target.value)
                  setMessage("Description updated.")
                }}
                rows={4}
                className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
                placeholder="Describe the page..."
              />
            </label>
            <TextInput id="meta-url" label="Canonical URL" value={url} onChange={setUrl} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextInput id="meta-site" label="Site name" value={siteName} onChange={setSiteName} />
              <label htmlFor="meta-robots" className="block">
                <span className="text-sm font-medium">Robots</span>
                <select
                  id="meta-robots"
                  value={robots}
                  onChange={(event) => {
                    setRobots(event.target.value)
                    setMessage("Robots setting updated.")
                  }}
                  className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
                >
                  <option value="index, follow">index, follow</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="index, nofollow">index, nofollow</option>
                  <option value="noindex, nofollow">noindex, nofollow</option>
                </select>
              </label>
            </div>
            <TextInput id="meta-image" label="Social image URL" value={imageUrl} onChange={setImageUrl} />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-2">
            {(["summary_large_image", "summary"] as TwitterCard[]).map((card) => (
              <button
                key={card}
                type="button"
                onClick={() => {
                  setTwitterCard(card)
                  setMessage("Twitter card updated.")
                }}
                className={`rounded-full px-3 py-2 text-xs font-semibold transition sm:text-sm ${
                  twitterCard === card
                    ? "bg-[var(--ink-900)] text-white"
                    : "border border-[var(--ink-900)]/10 bg-[var(--page-cream)] text-[var(--ink-700)] hover:bg-white"
                }`}
              >
                {card === "summary_large_image" ? "Large image" : "Summary"}
              </button>
            ))}
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
              onClick={loadSample}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Load Sample
            </button>
          </div>
        </ToolPanel>

        <div className="space-y-6">
          <ToolPanel>
            <PanelHeader eyebrow="Preview" title="Search Result" badge={`${stats.titleLength}/${stats.descriptionLength}`} />

            <div className="mt-6 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-5">
              <p className="break-all text-xs text-[var(--ink-700)]">{url || "https://example.com/page"}</p>
              <h3 className="mt-2 text-xl font-semibold text-blue-700">
                {title || "Page title preview"}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">
                {description || "Meta description preview will appear here."}
              </p>
            </div>

            <div className="mt-5 rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
              <div className="aspect-[1.91/1] rounded-[1rem] border border-[var(--ink-900)]/10 bg-white">
                {imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={imageUrl} alt="" className="h-full w-full rounded-[1rem] object-cover" />
                ) : null}
              </div>
              <p className="mt-3 text-xs uppercase tracking-[0.16em] text-[var(--ink-700)]">
                {siteName || "Site name"}
              </p>
              <h3 className="mt-1 text-lg font-semibold">{title || "Social title preview"}</h3>
              <p className="mt-1 text-sm leading-6 text-[var(--ink-700)]">
                {description || "Social description preview will appear here."}
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Markup" title="Generated Tags" badge={`${tags.split("\n").filter(Boolean).length} tags`} />

            <textarea
              value={tags}
              readOnly
              rows={14}
              spellCheck={false}
              className="mt-6 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-xs leading-6 outline-none"
              placeholder="Generated meta tags will appear here..."
            />

            <div className="mt-5 grid gap-3 sm:grid-cols-[1fr_auto]">
              <InfoBox>
                {message}
          </InfoBox>
              <button
                type="button"
                onClick={copyTags}
                className="rounded-full bg-[var(--ink-900)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
              >
                Copy Tags
              </button>
            </div>
          </ToolPanel>
        </div>
    </ToolPage>
  )
}

function TextInput({
  id,
  label,
  value,
  onChange,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label htmlFor={id} className="block">
      <span className="text-sm font-medium">{label}</span>
      <input
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="mt-2 w-full rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 text-sm outline-none transition focus:border-[var(--accent-rust)]"
      />
    </label>
  )
}

function generateMetaTags({
  title,
  description,
  url,
  siteName,
  imageUrl,
  robots,
  twitterCard,
}: {
  title: string
  description: string
  url: string
  siteName: string
  imageUrl: string
  robots: string
  twitterCard: TwitterCard
}) {
  const tags = [
    title ? `<title>${escapeHtml(title)}</title>` : "",
    description ? `<meta name="description" content="${escapeHtml(description)}">` : "",
    robots ? `<meta name="robots" content="${escapeHtml(robots)}">` : "",
    url ? `<link rel="canonical" href="${escapeHtml(url)}">` : "",
    title ? `<meta property="og:title" content="${escapeHtml(title)}">` : "",
    description ? `<meta property="og:description" content="${escapeHtml(description)}">` : "",
    url ? `<meta property="og:url" content="${escapeHtml(url)}">` : "",
    siteName ? `<meta property="og:site_name" content="${escapeHtml(siteName)}">` : "",
    imageUrl ? `<meta property="og:image" content="${escapeHtml(imageUrl)}">` : "",
    `<meta property="og:type" content="website">`,
    `<meta name="twitter:card" content="${twitterCard}">`,
    title ? `<meta name="twitter:title" content="${escapeHtml(title)}">` : "",
    description ? `<meta name="twitter:description" content="${escapeHtml(description)}">` : "",
    imageUrl ? `<meta name="twitter:image" content="${escapeHtml(imageUrl)}">` : "",
  ]

  return tags.filter(Boolean).join("\n")
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function getMetaStats(title: string, description: string) {
  return {
    titleLength: title.length,
    descriptionLength: description.length,
  }
}
