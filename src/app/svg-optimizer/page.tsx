import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { SvgOptimizerTool } from "./svg-optimizer-tool"

const pagePath = "/svg-optimizer"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "SVG Optimizer & Viewer | Minify, Clean & Preview SVG Online"
const pageDescription =
  "Optimize, minify, and preview SVG vector graphics in your browser. Remove redundant metadata, editor artifacts from Illustrator and Figma, round path coordinates, and export clean SVGs with SVGO."

const faqs = [
  {
    question: "What is an SVG optimizer?",
    answer:
      "An SVG optimizer is a minification tool that cleans Scalable Vector Graphics (SVG) code by removing redundant XML attributes, comments, editor-specific metadata (from Adobe Illustrator, Inkscape, or Figma), unused definitions, and rounding path coordinates to reduce file size without losing visual quality.",
  },
  {
    question: "Which engine powers this SVG optimizer?",
    answer:
      "This tool is powered by the browser build of SVGO (SVG Optimizer), the industry-standard node/browser tool used by major frontend frameworks, build tools (Vite, Webpack), and vector design pipelines.",
  },
  {
    question: "Why do design tools produce bloated SVG files?",
    answer:
      "Graphic design applications like Illustrator, Figma, and Inkscape embed substantial editor metadata (layer names, editing histories, XML namespaces, custom swatches, and default styles) to support re-opening and editing the file later. These elements are completely useless for web display and needlessly inflate page weight.",
  },
  {
    question: "What does 'multipass' optimization do?",
    answer:
      "Multipass runs SVGO multiple consecutive times over the vector markup. Some optimization opportunities (such as collapsing empty container groups or merging path segments) only become possible after earlier cleanup passes have simplified adjacent elements.",
  },
  {
    question: "Why is preserving the 'viewBox' attribute so critical?",
    answer:
      "The viewBox attribute defines the coordinate system and aspect ratio of the SVG. Removing it can break responsive auto-scaling when the vector graphic is resized using CSS width and height in modern web designs.",
  },
  {
    question: "Can I copy the optimized SVG as a Data URI?",
    answer:
      "Yes. The tool automatically generates a URL-encoded SVG Data URI (data:image/svg+xml;utf8,...) suitable for immediate use in CSS background-image declarations or HTML inline image tags.",
  },
  {
    question: "Are my SVG graphics uploaded to an external server?",
    answer:
      "No. All parsing, SVGO plugin transformations, size measurements, and rendering occur 100% locally in your browser memory. Your proprietary vector artwork and logos never leave your computer.",
  },
  {
    question: "Does SVG optimization degrade visual rendering quality?",
    answer:
      "SVGO uses mathematically lossless or near-lossless transformations. Path numbers are rounded slightly (e.g. from 12 decimal places down to 2 or 3), which reduces file size by 30% to 70% with zero perceptible visual degradation at web display resolutions.",
  },
  {
    question: "What is the difference between inline SVG and an <img> tag?",
    answer:
      "An <img> tag loads an SVG as an external static image asset, which cannot be styled with CSS or scripted with JavaScript. Inline SVG embeds the <svg> element directly into the HTML DOM, enabling dynamic CSS color changes (currentColor), hover effects, and DOM event handling.",
  },
  {
    question: "Can I download the optimized SVG file?",
    answer:
      "Yes. You can copy the cleaned markup directly or click 'Download SVG' to save the optimized file directly to your device.",
  },
  {
    question: "Can this tool fix broken or invalid SVG markup?",
    answer:
      "SVGO requires well-formed XML to parse the element tree. If an SVG contains unclosed tags or syntax errors, the tool will report an informative parsing error highlighting the broken markup.",
  },
  {
    question: "What typical file size savings can I expect?",
    answer:
      "Most raw vector graphics exported from Figma or Illustrator achieve 40% to 80% file size reductions, dropping a 50 KB icon file down to 10 KB or less.",
  },
  {
    question: "Does this tool work completely offline?",
    answer:
      "Yes. As part of this PWA suite, the SVG optimizer executes entirely in client-side JavaScript and operates with zero internet connectivity once loaded.",
  },
  {
    question: "Is the SVG Optimizer & Viewer free?",
    answer:
      "Yes. It is 100% free with no limits on file count, no subscriptions, and no advertisements.",
  },
]

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: [
      "SVG Optimizer",
      "SVG Minifier",
      "SVGO Online",
      "Clean SVG",
      "SVG Viewer",
      "Vector Optimization",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "SVG Optimizer & Viewer",
    applicationCategory: "DesignApplication",
    operatingSystem: "Any",
    url: pageUrl,
    description: pageDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "SVGO-powered vector minification",
      "Multipass optimization mode",
      "viewBox attribute preservation toggle",
      "Real-time visual rendered SVG preview",
      "Side-by-side file size reduction comparison",
      "Direct SVG file download",
      "Instant copy markup & CSS Data URI generator",
      "100% private in-browser client execution",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SVG Optimizer & Viewer",
    applicationCategory: "DesignApplication",
    operatingSystem: "Any",
    url: pageUrl,
    description: pageDescription,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "SVG Optimizer",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to optimize SVG files online",
    description: "Step-by-step instructions for minifying and cleaning vector graphics using SVGO.",
    step: [
      {
        "@type": "HowToStep",
        name: "Upload or paste SVG",
        text: "Paste your raw SVG markup into the editor or upload an SVG file from your device.",
      },
      {
        "@type": "HowToStep",
        name: "Configure optimization settings",
        text: "Select single-pass or multipass optimization, and ensure 'Preserve viewBox' is enabled for responsive scaling.",
      },
      {
        "@type": "HowToStep",
        name: "Inspect visual preview",
        text: "Verify the rendered visual preview to ensure path accuracy and check the percentage savings badge.",
      },
      {
        "@type": "HowToStep",
        name: "Export cleaned SVG",
        text: "Copy the cleaned markup, copy the CSS Data URI, or click 'Download' to save the file.",
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
]

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: pagePath,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: pageUrl,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: pageDescription,
  },
}

export default function SvgOptimizerPage() {
  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
        <SvgOptimizerTool />
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-14 sm:px-8">
        {/* Overview */}
        <ToolPanel>
          <PanelHeader eyebrow="Overview" title="What Is SVG Optimization and Why Does It Matter?" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              <strong>Scalable Vector Graphics (SVG)</strong> are XML-based vector image files that define
              shapes, paths, colors, and curves mathematically rather than through pixel grids. Unlike raster
              formats (such as PNG or JPEG), SVGs scale infinitely to any screen resolution without blurriness,
              making them the backbone of modern web icons, logos, and UI graphics.
            </p>
            <p>
              However, software such as Adobe Illustrator, Figma, Sketch, and Inkscape routinely export SVGs
              packed with redundant XML declarations, editor metadata, unused definitions, and excessive coordinate
              precision. This <strong>SVG Optimizer</strong> uses the industry-standard <strong>SVGO</strong> engine
              to strip unnecessary junk, reduce payload weights by up to 80%, and speed up web page load times—all
              safely inside your browser.
            </p>
          </div>
        </ToolPanel>

        {/* What Gets Removed Table */}
        <ToolPanel>
          <PanelHeader eyebrow="Anatomy" title="What Gets Cleaned During SVG Optimization" />
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--ink-900)]/10 text-[var(--ink-900)]">
                  <th className="py-3 pr-4 font-semibold">Element / Attribute</th>
                  <th className="py-3 pr-4 font-semibold">Source</th>
                  <th className="py-3 font-semibold">Why It Gets Removed / Cleaned</th>
                </tr>
              </thead>
              <tbody className="text-[var(--ink-700)]">
                {[
                  ["XML Prolog (<?xml ...?>)", "Standard XML exporters", "Unnecessary in modern HTML5 documents."],
                  ["Doctype Declaration", "Legacy SVG 1.1 specs", "Deprecated and unneeded for web browser rendering."],
                  ["Editor Namespaces (xmlns:sketch, etc.)", "Figma, Illustrator, Sketch", "Proprietary editor data that does not affect visual display."],
                  ["Comments & Metadata (<!-- ... -->)", "Design software & creators", "Contains timestamps, author info, and software build numbers."],
                  ["Empty / Useless Groups (<g>)", "Layer hierarchies in design tools", "Collapses unstyled container tags to flatten the DOM tree."],
                  ["Excessive Coordinate Floats", "Bezier curve math (e.g. 12.3847291)", "Rounds to 2 or 3 decimals with zero visible distortion."],
                  ["Unused IDs and Classes", "Internal canvas object labels", "Prevents DOM namespace pollution and shrinks document size."],
                ].map(([elem, src, why]) => (
                  <tr key={elem} className="border-b border-[var(--ink-900)]/8">
                    <td className="py-3 pr-4 font-mono font-semibold text-[var(--ink-900)]">{elem}</td>
                    <td className="py-3 pr-4">{src}</td>
                    <td className="py-3">{why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </ToolPanel>

        {/* Feature Cards */}
        <ToolPanel>
          <PanelHeader eyebrow="Capabilities" title="Key Features & Processing Controls" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              [
                "SVGO Engine Pipeline",
                "Applies modern AST transformations to merge paths, eliminate empty attributes, and minify coordinates.",
              ],
              [
                "Multipass Optimization",
                "Executes repeated optimization rounds to uncover nested cleanup opportunities that single-pass tools miss.",
              ],
              [
                "viewBox Preservation",
                "Protects the viewBox coordinate boundaries to ensure responsive scaling across mobile and desktop displays.",
              ],
              [
                "Interactive Visual Preview",
                "Inspect the rendered SVG image in real time to visually confirm path integrity and color accuracy.",
              ],
              [
                "CSS Data URI Generator",
                "Instant creation of data:image/svg+xml URIs for embedding inside CSS background-image properties.",
              ],
              [
                "Accurate Savings Counters",
                "Displays exact byte measurements, character counts, and percentage reduction badges.",
              ],
              [
                "Direct File Download",
                "Save your cleaned SVG directly to disk with a single click, ready for your assets directory.",
              ],
              [
                "100% Client-Side Privacy",
                "Proprietary vector artwork, icons, and company logos never leave your browser memory.",
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"
              >
                <h3 className="font-semibold text-[var(--ink-900)]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        {/* How It Works */}
        <ToolPanel>
          <PanelHeader eyebrow="Method" title="How the SVGO Optimization Engine Works" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              The optimization process runs through a series of discrete AST (Abstract Syntax Tree) transformation
              plugins. The raw SVG text is parsed into an XML hierarchy of elements and attributes. SVGO traverses
              this tree, executing plugins in sequence:
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>
                <strong>Structural Cleanup:</strong> Strips doctypes, comments, editor namespaces, empty containers,
                and unreferenced definitions.
              </li>
              <li>
                <strong>Style &amp; Attribute Normalization:</strong> Converts inline styles to attributes where beneficial,
                removes default attribute values, and collapses matrix transforms.
              </li>
              <li>
                <strong>Path Data Compression:</strong> Analyzes SVG path <code>d</code> strings, converting absolute
                commands to relative coordinates when shorter, eliminating redundant coordinate points, and rounding
                floating-point values.
              </li>
            </ul>
          </div>
        </ToolPanel>

        {/* Workflow */}
        <ToolPanel>
          <PanelHeader eyebrow="Workflow" title="How to Optimize and Use SVGs" />
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>
              <strong>Import vector markup:</strong> Paste your SVG markup into the text editor or upload an SVG file.
            </li>
            <li>
              <strong>Configure options:</strong> Enable <em>Multipass</em> for maximal file size reduction, and ensure
              <em>Preserve viewBox</em> is enabled.
            </li>
            <li>
              <strong>Review the preview:</strong> Verify that the rendered SVG image looks crisp and undistorted.
            </li>
            <li>
              <strong>Inspect savings:</strong> Check the reduction badge (e.g. &quot;-62.4%&quot;) and byte counts.
            </li>
            <li>
              <strong>Export:</strong> Click <em>Copy Output</em> for HTML embedding, <em>Copy Data URI</em> for CSS,
              or <em>Download</em> to save the file.
            </li>
          </ol>
        </ToolPanel>

        {/* Use Cases */}
        <ToolPanel>
          <PanelHeader eyebrow="Applications" title="Common Developer & Designer Scenarios" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              [
                "Web Icon Systems & UI Kits",
                "Minify icon sets (e.g. Feather, Lucide, Heroicons) before bundling them into web application components.",
              ],
              [
                "Logos & Brand Assets",
                "Ensure high-visibility company logos load instantly on homepage headers without delaying First Contentful Paint.",
              ],
              [
                "CSS Background Graphics",
                "Generate lightweight, clean Data URIs for subtle background patterns, arrows, and decorative vector flourishes.",
              ],
              [
                "Illustrations & Hero Graphics",
                "Compress complex multi-layer hero illustrations exported from Illustrator before deploying to production websites.",
              ],
            ].map(([title, text]) => (
              <div
                key={title}
                className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"
              >
                <h3 className="font-semibold text-[var(--ink-900)]">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        {/* Benefits & Limitations */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Advantages" title="Benefits of SVG Optimization" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Significantly improves Core Web Vitals (LCP and FCP) on image-heavy pages.</li>
              <li>Reduces mobile cellular data consumption for your site visitors.</li>
              <li>Flattens messy design hierarchies into clean, legible HTML markup.</li>
              <li>Keeps vector graphics razor-sharp across 4K, 5K, and Retina displays.</li>
              <li>Eliminates proprietary metadata that might expose internal designer usernames or file paths.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Boundaries" title="Limitations & Considerations" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Cannot optimize embedded raster images (base64 PNG/JPEGs inside the SVG).</li>
              <li>Complex SMIL or CSS animations should be tested after optimization to confirm keyframes persist.</li>
              <li>Extremely aggressive path rounding on tiny detailed micro-icons can cause minor corner rounding.</li>
              <li>Does not convert raster photos into vector curves.</li>
            </ul>
          </ToolPanel>
        </div>

        {/* Pro Tips & Common Mistakes */}
        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Guidance" title="Pro Tips for SVG Management" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Always keep viewBox enabled so the SVG can fluidly adapt to responsive container sizes.</li>
              <li>Set <code>fill=&quot;currentColor&quot;</code> on icon paths to easily recolor them with CSS.</li>
              <li>Add <code>aria-hidden=&quot;true&quot;</code> to purely decorative icons for better web accessibility.</li>
              <li>Keep the original uncompressed source file in your design repository for future editing.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Avoid" title="Common Pitfalls to Avoid" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Removing the viewBox and replacing it with rigid hard-coded <code>width</code> and <code>height</code>.</li>
              <li>Using inline SVGs with duplicate IDs on the same page, which breaks HTML validation.</li>
              <li>Embedding multi-megabyte PNG screenshots inside an SVG wrapper instead of using real vectors.</li>
              <li>Failing to test responsive scaling across varied screen breakpoints.</li>
            </ul>
          </ToolPanel>
        </div>

        {/* FAQ */}
        <ToolPanel>
          <PanelHeader eyebrow="Questions" title="Frequently Asked Questions" />
          <div className="mt-6 grid gap-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"
              >
                <summary className="cursor-pointer font-semibold text-[var(--ink-900)]">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-6 text-[var(--ink-700)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </ToolPanel>

        {/* Related Tools */}
        <ToolPanel>
          <PanelHeader eyebrow="More Tools" title="Related Design & Developer Tools" />
          <nav
            aria-label="Related tools"
            className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3"
          >
            {[
              ["Image Converter", "/image-converter"],
              ["Image Resizer", "/image-resizer"],
              ["HTML, CSS & JS Minifier", "/html-css-js-minifier"],
              ["QR Code Generator", "/qr-code-generator"],
              ["Base64 Encoder / Decoder", "/base64-encoder-decoder"],
              ["Color Converter", "/color-converter"],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="rounded-[1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 transition hover:border-[var(--accent-rust)]/40"
              >
                {label}
              </Link>
            ))}
          </nav>
        </ToolPanel>

        {/* Glossary */}
        <ToolPanel>
          <PanelHeader eyebrow="Terms" title="SVG & Vector Terminology Glossary" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["SVG", "Scalable Vector Graphics, an XML-based W3C standard for interactive 2D graphics."],
              ["viewBox", "An SVG attribute defining the position and dimension coordinates of the visual viewport."],
              ["Path (<path>)", "The most versatile SVG shape element, defined by a series of drawing commands in 'd'."],
              ["Bezier Curve", "Parametric curves (cubic or quadratic) used to model smooth vector shapes."],
              ["SVGO", "SVG Optimizer, an open-source tool for optimizing SVG vector graphics files."],
              ["Data URI", "A scheme allowing small media files to be embedded directly inline in URLs and code."],
              ["Raster Graphics", "Images composed of a fixed grid of pixels (JPEG, PNG, WebP, GIF)."],
              ["Vector Graphics", "Images composed of mathematical geometries (points, lines, curves, shapes)."],
              ["XML Namespace", "Prefixes (like xmlns:xlink) that identify XML vocabularies and editor extensions."],
              ["Coordinate Precision", "The number of digits after the decimal point stored for vector coordinates."],
              ["currentColor", "A CSS keyword allowing an SVG icon to inherit text color dynamically."],
              ["SMIL", "Synchronized Multimedia Integration Language, declarative animation markup inside SVGs."],
            ].map(([term, definition]) => (
              <div key={term}>
                <h3 className="font-semibold text-[var(--ink-900)]">{term}</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--ink-700)]">{definition}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        {/* References */}
        <ToolPanel>
          <PanelHeader eyebrow="Sources" title="Official Standards & Specifications" />
          <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>
              <a
                href="https://www.w3.org/TR/SVG2/"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                W3C Scalable Vector Graphics (SVG) 2 Specification
              </a>
            </li>
            <li>
              <a
                href="https://github.com/svg/svgo"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                SVGO Project Repository &amp; Plugin Documentation
              </a>
            </li>
            <li>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/SVG/Tutorial"
                className="font-semibold underline"
                rel="noopener noreferrer"
                target="_blank"
              >
                MDN Web Docs: SVG Tutorial &amp; Element Reference
              </a>
            </li>
          </ul>
        </ToolPanel>

        <InfoBox>
          Educational disclaimer: This SVG Optimizer uses client-side SVGO transformations to reduce file size.
          Always check the rendered visual preview before deploying optimized assets to production, especially
          when working with intricate typography curves or complex vector illustrations.
        </InfoBox>
      </section>
    </main>
  )
}
