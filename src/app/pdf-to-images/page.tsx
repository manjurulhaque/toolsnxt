import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { PdfToImagesTool } from "./pdf-to-images-tool"

const pagePath = "/pdf-to-images"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "PDF to Images | Convert PDF Pages to PNG or JPG Online"
const pageDescription =
  "Convert PDF pages to images online in your browser. Render selected PDF page ranges as PNG or JPEG with scale, quality, previews, and downloads."

const faqs = [
  {
    question: "What is a PDF to Images converter?",
    answer:
      "A PDF to Images converter renders PDF pages as raster image files such as PNG or JPG.",
  },
  {
    question: "How does this PDF to Images converter work?",
    answer:
      "It reads one PDF in the browser with PDF.js, renders selected pages to canvas at the chosen scale, exports each canvas as PNG or JPEG, and creates download links.",
  },
  {
    question: "Can I convert PDF pages into PNG?",
    answer:
      "Yes. PNG is one of the implemented output formats.",
  },
  {
    question: "Can I convert PDF pages into JPG?",
    answer:
      "Yes. Choose JPEG as the format; the downloaded file extension is .jpg.",
  },
  {
    question: "Will page order be preserved?",
    answer:
      "Yes. Pages are rendered from the selected start page through the selected end page in ascending page order.",
  },
  {
    question: "Is image quality affected?",
    answer:
      "Output quality depends on the source PDF, selected scale, output format, and JPEG quality setting when JPEG is selected.",
  },
  {
    question: "Can I convert multi-page PDFs?",
    answer:
      "Yes. The page reads the PDF page count and lets you render a continuous page range.",
  },
  {
    question: "Can I download all pages together?",
    answer:
      "You can use Download All Images to start individual downloads for all rendered images. This page does not create a ZIP archive.",
  },
  {
    question: "Is my PDF uploaded to a server?",
    answer:
      "The PDF is processed locally in your browser. The selected file is not intentionally uploaded by this tool.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "It uses browser file input, canvas rendering, and download links, so support depends on the mobile browser and device memory.",
  },
  {
    question: "Is it free?",
    answer: "Yes. This is a free browser-based PDF to image converter.",
  },
  {
    question: "What image format should I choose?",
    answer:
      "Use PNG for crisp graphics, text-heavy pages, or transparency-friendly workflows. Use JPEG when smaller photo-style files are more important.",
  },
  {
    question: "Can I convert scanned PDFs?",
    answer:
      "Yes, if PDF.js can render the PDF. Scanned pages are rendered as images like any other page content.",
  },
  {
    question: "Can I convert password-protected PDFs?",
    answer:
      "This page does not provide a password entry flow. Password-protected PDFs may fail to load.",
  },
  {
    question: "Why are my images large?",
    answer:
      "High scale settings, large page sizes, PNG output, and detailed pages can produce large image files.",
  },
  {
    question: "Can I convert only selected pages?",
    answer:
      "You can convert a continuous range using Start page and End page. Non-contiguous page selection is not implemented.",
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
    about: ["PDF to Images", "PDF to JPG", "PDF to PNG", "PDF Page Rendering"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PDF to Images",
    applicationCategory: "UtilitiesApplication",
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
    "@type": "SoftwareApplication",
    name: "PDF to Images",
    applicationCategory: "UtilitiesApplication",
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
        name: "PDF to Images",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert PDF pages to images",
    description: "Render selected PDF pages as PNG or JPEG images.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose PDF",
        text: "Select one PDF file from your device.",
      },
      {
        "@type": "HowToStep",
        name: "Set page range",
        text: "Choose the start and end page for the continuous range to render.",
      },
      {
        "@type": "HowToStep",
        name: "Choose output settings",
        text: "Select PNG or JPEG, choose scale, and set JPEG quality when JPEG is selected.",
      },
      {
        "@type": "HowToStep",
        name: "Render images",
        text: "Click Render Images to create page images.",
      },
      {
        "@type": "HowToStep",
        name: "Download images",
        text: "Download individual page images or start all image downloads.",
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

export default function PdfToImagesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
        <PdfToImagesTool />

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is a PDF to Images Converter?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                A PDF to Images converter renders PDF pages as raster image files. This is useful
                when a page needs to be shared in a presentation, social media post, website,
                design mockup, printed handout, classroom material, or digital publishing workflow.
              </p>
              <p>
                PDFs are fixed-layout documents that can contain text, fonts, vector graphics, and
                embedded images. PNG and JPEG are raster image formats, so converting a PDF page to
                an image turns the rendered page appearance into pixels.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How PDF to Images Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Upload PDF", "Choose one PDF file from your device."],
                ["Read page count", "PDF.js loads the document and reports the number of pages."],
                ["Select page range", "Start page and End page define one continuous range."],
                ["Render pages", "Each selected page is rendered to a browser canvas at the chosen scale."],
                ["Export images", "Each canvas is exported as PNG or JPEG."],
                ["Preview and download", "Rendered page images appear with dimensions, file size, and download buttons."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="PDF Support" title="Supported PDF Features" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                This page relies on PDF.js browser rendering. It supports PDFs that PDF.js can load
                and render through the display layer, including single-page and multi-page
                documents, text rendering, embedded images, vector graphics, and fonts as rendered
                by the engine. Password entry, annotation controls, form export, and PDF editing are
                not implemented.
              </p>
              <InfoBox>
                Corrupted, unsupported, or password-protected PDFs may fail to load or render.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Formats" title="Supported Output Formats" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["PNG", "Useful for crisp text, line art, interface screenshots, and graphics-heavy pages."],
                ["JPEG", "Useful for photo-heavy pages or smaller files when lossy compression is acceptable."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Options" title="Conversion Options" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Start page", "First page in the continuous range to render."],
                ["End page", "Last page in the continuous range to render."],
                ["Format", "Choose PNG or JPEG output."],
                ["Scale", "Choose 1x, 1.5x, 2x, or 3x rendering scale."],
                ["JPEG quality", "Shown only for JPEG and adjustable from 55% to 100%."],
                ["Download all images", "Starts individual downloads for all rendered image files."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Accuracy" title="Conversion Accuracy" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Rendering engine", "Each page is rendered using the implemented PDF.js workflow."],
                ["Page order", "Rendered images follow ascending page order from start to end."],
                ["Rasterization", "Text, vector graphics, and embedded images become pixels in the output image."],
                ["Dimensions", "Image dimensions come from the PDF.js viewport at the selected scale."],
                ["JPEG background", "JPEG output fills the canvas with white before rendering."],
                ["Quality", "Output quality depends on the original PDF, scale, format, and JPEG quality setting."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Examples" title="Common Examples" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Presentation pages", "Convert slides from a PDF into PNG images."],
                ["Social media", "Render selected document pages for visual posts."],
                ["Scanned documents", "Convert scanned PDF pages into JPEG files."],
                ["Website assets", "Create page images for documentation or previews."],
                ["Digital publishing", "Prepare document preview images for online articles or catalogs."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Features" title="Implemented Features" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Single PDF input", "Load one PDF file at a time."],
                ["Multi-page conversion", "Render a continuous page range from a multi-page PDF."],
                ["PNG and JPEG output", "Choose the implemented raster image format."],
                ["Scale control", "Render at 1x, 1.5x, 2x, or 3x."],
                ["Image previews", "Preview rendered pages in a responsive grid."],
                ["Downloads", "Download each image or start all rendered image downloads."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use PDF to Images" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Choose a PDF file.</li>
              <li>Confirm the loaded page count.</li>
              <li>Set Start page and End page for the continuous range.</li>
              <li>Select PNG or JPEG output.</li>
              <li>Choose a scale and adjust JPEG quality when JPEG is selected.</li>
              <li>Click Render Images, preview the pages, then download individual images or all rendered images.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Output" title="Understanding the Output" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Converted images", "Each rendered page appears as one image file."],
                ["File name", "Each output includes the original PDF name and page number."],
                ["Dimensions", "Each preview lists image width and height in pixels."],
                ["File size", "Each preview lists the output image size."],
                ["Download", "Every image has a Download button."],
                ["No ZIP archive", "Download All starts multiple image downloads rather than creating a ZIP file."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Applications" title="Common Use Cases" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Presentations", "Turn PDF slides into images for decks or thumbnails."],
                ["Social media", "Share page visuals where PDFs are not accepted."],
                ["Graphic design", "Use rendered page images in layouts or mockups."],
                ["Documentation", "Create visual examples from manual or report pages."],
                ["Education", "Share worksheets, excerpts, or study pages as images."],
                ["OCR preprocessing", "Create page images for OCR workflows outside this tool."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Practical Notes" title="Benefits, Limitations, Tips and Mistakes" />
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h2 className="text-lg font-semibold">Benefits</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Converts PDF pages in the browser without installing desktop software.</li>
                  <li>Supports PNG and JPEG output for common sharing workflows.</li>
                  <li>Provides page-range, scale, JPEG quality, previews, and download controls.</li>
                  <li>Useful for personal, educational, and professional document imaging tasks.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Only PDFs that PDF.js can load and render are supported.</li>
                  <li>Password entry and ZIP archive export are not implemented.</li>
                  <li>Large PDFs or high scale settings can take more time and memory.</li>
                  <li>Raster images do not retain editable text, vector scalability, forms, or layers.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Best Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Use a high-quality source PDF.</li>
                  <li>Choose PNG for text-heavy pages and graphics.</li>
                  <li>Choose JPEG for photo-heavy pages or smaller files.</li>
                  <li>Preview converted pages and keep the original PDF for future edits.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Uploading corrupted or password-protected PDFs.</li>
                  <li>Expecting editable text after conversion.</li>
                  <li>Using JPEG for pages that need crisp text edges.</li>
                  <li>Confusing PDF page size with output image pixel resolution.</li>
                </ul>
              </div>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="FAQ" title="Frequently Asked Questions" />
            <div className="mt-6 grid gap-3">
              {faqs.map((faq) => (
                <details
                  key={faq.question}
                  className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4"
                >
                  <summary className="cursor-pointer text-sm font-semibold text-[var(--ink-900)]">
                    {faq.question}
                  </summary>
                  <p className="mt-3 text-sm leading-7 text-[var(--ink-700)]">{faq.answer}</p>
                </details>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="More Tools" title="Related Tools" />
            <nav aria-label="Related tools" className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3">
              {[
                ["PDF Compress", "/pdf-compress"],
                ["PDF Merge", "/pdf-merge"],
                ["PDF Split", "/pdf-split"],
                ["Image Converter", "/image-converter"],
                ["Image Resizer", "/image-resizer"],
                ["Image to PDF Converter", "/image-to-pdf"],
                ["QR Code Generator", "/qr-code-generator"],
              ].map(([label, href]) => (
                <Link
                  key={href}
                  className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4 transition hover:bg-white"
                  href={href}
                >
                  {label}
                </Link>
              ))}
            </nav>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Glossary" title="PDF and Image Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["PDF", "Portable Document Format, a fixed-layout document format."],
                ["Raster Image", "An image made from pixels."],
                ["Vector Graphics", "Shapes described mathematically rather than as fixed pixels."],
                ["DPI", "Dots per inch, commonly used for print output discussions."],
                ["Resolution", "The pixel dimensions or detail level of an output image."],
                ["PNG", "A lossless raster image format often useful for text and graphics."],
                ["JPEG", "A lossy raster image format often useful for photos and smaller files."],
                ["WebP", "A web image format not implemented as an output on this page."],
                ["Page Rendering", "Drawing a PDF page's visual appearance into a canvas or display surface."],
                ["Rasterization", "Converting text, vectors, and page content into pixels."],
                ["Compression", "Encoding data to reduce file size."],
                ["Rendering Engine", "Software that interprets document content and draws the visible result."],
              ].map(([term, definition]) => (
                <div key={term}>
                  <dt className="font-semibold text-[var(--ink-900)]">{term}</dt>
                  <dd>{definition}</dd>
                </div>
              ))}
            </dl>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Sources" title="References" />
            <ul className="mt-6 space-y-3 text-sm leading-7 text-[var(--ink-700)]">
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.iso.org/standard/51502.html"
                  rel="noreferrer"
                >
                  ISO 32000-1:2008. Document management - Portable document format - Part 1: PDF 1.7.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.adobe.com/acrobat/about-adobe-pdf.html"
                  rel="noreferrer"
                >
                  Adobe Acrobat. What is a PDF?
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://mozilla.github.io/pdf.js/getting_started/?lang=en"
                  rel="noreferrer"
                >
                  Mozilla PDF.js. Getting Started.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://mozilla.github.io/pdf.js/examples/index.html"
                  rel="noreferrer"
                >
                  Mozilla PDF.js. Rendering PDF pages to canvas.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob"
                  rel="noreferrer"
                >
                  MDN Web Docs. HTMLCanvasElement: toBlob() method.
                </a>
              </li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Disclaimer" title="Educational Disclaimer" />
            <p className="mt-6 text-sm leading-7 text-[var(--ink-700)]">
              This PDF to Images tool converts PDF pages into raster images using the implemented
              PDF.js rendering workflow. Results are intended for educational, informational, and
              general productivity use. Converted images may not retain editable PDF text, forms,
              vector scalability, annotations, layers, or metadata. Verify image quality, page
              accuracy, and format suitability before publishing, printing, archiving, or production
              use.
            </p>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
