import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { PdfCompressTool } from "./pdf-compress-tool"

const pagePath = "/pdf-compress"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "PDF Compressor | Compress PDF Files Online"
const pageDescription =
  "Compress PDF files online in your browser. Reduce PDF size with balanced or smallest mode, compare file size savings, and download an optimized PDF."

const faqs = [
  {
    question: "What is a PDF Compressor?",
    answer:
      "A PDF Compressor reduces a PDF file's size by rewriting or optimizing supported parts of the document.",
  },
  {
    question: "How does this PDF Compressor work?",
    answer:
      "It loads one PDF in the browser with pdf-lib, saves an optimized copy with object streams, and downloads the compressed PDF.",
  },
  {
    question: "Does compression reduce quality?",
    answer:
      "This implementation rewrites PDF structure and metadata settings. It does not expose image quality controls, but output should still be reviewed before use.",
  },
  {
    question: "Can I compress scanned PDFs?",
    answer:
      "Yes, if pdf-lib can load the file. Scanned PDFs may compress less when the embedded images are already optimized.",
  },
  {
    question: "Can I compress password-protected PDFs?",
    answer:
      "The tool attempts to ignore encryption when loading, but it does not provide a password entry flow. Some protected PDFs may fail.",
  },
  {
    question: "Is my PDF uploaded to a server?",
    answer:
      "The compression runs locally in your browser. The selected PDF is not intentionally uploaded by this tool.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "It uses browser file input and downloads, so support depends on the mobile browser, memory, and file size.",
  },
  {
    question: "Is it free?",
    answer: "Yes. This is a free browser-based PDF compression tool.",
  },
  {
    question: "Can I compress multiple PDFs?",
    answer:
      "No. This page compresses one PDF at a time.",
  },
  {
    question: "Why did my PDF not become much smaller?",
    answer:
      "Some PDFs are already optimized, contain compressed images, or have little removable overhead, so savings can be small or zero.",
  },
  {
    question: "Which compression mode should I choose?",
    answer:
      "Use Balanced when you want to keep common document information. Use Smallest when you also want the tool to clear common document metadata before saving.",
  },
  {
    question: "Are fonts preserved?",
    answer:
      "The page rewrites the PDF document rather than offering font editing controls. Fonts are preserved when the PDF can be loaded and saved successfully by the implementation.",
  },
  {
    question: "Is metadata preserved?",
    answer:
      "Balanced sets producer and modification date while keeping document information. Smallest clears common document metadata fields before saving.",
  },
  {
    question: "Can I compress PDFs created by different applications?",
    answer:
      "Usually yes, as long as pdf-lib can load and save the PDF.",
  },
  {
    question: "Is compression reversible?",
    answer:
      "No. The original PDF remains unchanged, but the downloaded compressed copy should be treated as a new file. Keep the original as a backup.",
  },
  {
    question: "What does the saved percentage mean?",
    answer:
      "It compares the original file size with the downloaded compressed file size after the tool finishes saving.",
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
    about: ["PDF Compressor", "Compress PDF", "Reduce PDF Size", "PDF Compression"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PDF Compressor",
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
    name: "PDF Compressor",
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
        name: "PDF Compressor",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to compress a PDF online",
    description: "Reduce PDF file size with the browser-based PDF Compressor.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose PDF",
        text: "Select one PDF file from your device.",
      },
      {
        "@type": "HowToStep",
        name: "Choose mode",
        text: "Select Balanced or Smallest compression mode.",
      },
      {
        "@type": "HowToStep",
        name: "Compress PDF",
        text: "Click Download Compressed PDF to optimize and save the file.",
      },
      {
        "@type": "HowToStep",
        name: "Review results",
        text: "Compare original size, compressed size, and saved percentage.",
      },
      {
        "@type": "HowToStep",
        name: "Verify output",
        text: "Open the downloaded PDF and confirm quality and completeness.",
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

export default function PdfCompressPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-2 lg:py-12">
          <PdfCompressTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is a PDF Compressor?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                A PDF Compressor reduces the size of a PDF file so it is easier to email, upload,
                store, archive, and share. It is useful for business reports, contracts, invoices,
                education materials, government submissions, cloud storage, and personal document
                organization.
              </p>
              <p>
                Compression is different from editing. This tool creates an optimized copy of a
                supported PDF; it does not change page text, rearrange pages, remove pages, or
                provide direct image-quality controls. PDF size reduction can be lossless or lossy
                depending on the method used, but this page documents only the implemented rewrite
                and metadata behavior.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How PDF Compression Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Upload PDF", "Choose one PDF file from your device."],
                ["Read document", "pdf-lib loads the PDF and reports the page count."],
                ["Choose mode", "Balanced keeps common document info; Smallest clears common metadata fields."],
                ["Rewrite structure", "The PDF is saved with compact object streams where supported."],
                ["Download copy", "The optimized file downloads with -compressed added to the name."],
                ["Show savings", "The result compares original size, compressed size, and percentage saved."],
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
                This page supports standard PDFs that pdf-lib can load and save. Supported files
                may include single-page or multi-page documents with text, embedded fonts, images,
                vector graphics, metadata, and scanned page content as represented in the PDF. It
                does not provide visual preview, batch compression, password entry, OCR, page
                editing, or image resampling controls.
              </p>
              <InfoBox>
                Corrupted, unsupported, or encrypted PDFs may fail to load even though the loader
                attempts to ignore encryption where possible.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Options" title="Compression Options" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Balanced", "Keeps common document information and saves the file with compact object streams."],
                ["Smallest", "Also clears common document metadata fields before saving the optimized copy."],
                ["Single PDF", "Compress one PDF file at a time."],
                ["Download", "Save the generated optimized PDF directly from the browser."],
                ["Clear", "Remove the selected PDF and reset the displayed result."],
                ["No preview", "This page reports file details and savings but does not render page previews."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Accuracy" title="Compression Accuracy" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["File contents", "The implementation loads the source PDF and saves an optimized copy."],
                ["Document structure", "Saving with object streams can reduce structural overhead in supported PDFs."],
                ["Metadata behavior", "Balanced updates producer and modification date; Smallest clears common info fields."],
                ["Variable savings", "File size reduction depends on the original PDF's objects, images, fonts, and existing optimization."],
                ["Original file", "The uploaded PDF is not modified."],
                ["Output settings", "The downloaded file reflects the selected Balanced or Smallest mode."],
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
                ["Scanned contract", "Compress a scanned contract before emailing it, then verify readability."],
                ["Upload limit", "Reduce a report to help meet a portal or assignment size limit."],
                ["Invoices", "Optimize invoice PDFs before cloud storage or sharing."],
                ["Lecture notes", "Compress course notes so students can download them more easily."],
                ["Presentation PDF", "Shrink a presentation export before sending it to a team."],
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
                ["PDF compression", "Create a smaller optimized copy when the file structure allows savings."],
                ["Two modes", "Choose Balanced or Smallest."],
                ["Page count display", "Show the number of pages after loading a readable PDF."],
                ["Size summary", "Display original size, compressed size, and saved percentage after compression."],
                ["Browser-based operation", "Processing runs locally in the browser with pdf-lib."],
                ["Direct download", "Download the optimized PDF without creating a separate preview step."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use PDF Compressor" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Choose one PDF file.</li>
              <li>Review the detected page count and original file size.</li>
              <li>Select Balanced or Smallest compression mode.</li>
              <li>Click Download Compressed PDF.</li>
              <li>Compare the size summary and open the downloaded PDF to verify the result.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Output" title="Understanding the Output" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Compressed PDF", "The output is a new PDF downloaded to your device."],
                ["Original size", "The size of the selected source PDF."],
                ["Compressed size", "The size of the newly saved optimized PDF."],
                ["Saved", "The percentage reduction based on original and compressed file sizes."],
                ["File name", "The output name adds -compressed before the .pdf extension."],
                ["No preview", "The page does not render the compressed document before download."],
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
                ["Email attachments", "Reduce PDF size before sending documents."],
                ["Business reports", "Optimize reports, proposals, contracts, and invoices."],
                ["Education", "Share lecture notes, handouts, assignments, and research PDFs."],
                ["Government portals", "Prepare PDFs for systems with upload limits."],
                ["Cloud storage", "Reduce storage use for archives and shared folders."],
                ["Personal records", "Keep smaller copies of scanned paperwork."],
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
                  <li>Compress PDFs in the browser without installing desktop software.</li>
                  <li>Create smaller files for upload, download, sharing, and storage.</li>
                  <li>Compare original and compressed sizes after processing.</li>
                  <li>Keep the original file unchanged while saving an optimized copy.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Only PDFs that pdf-lib can load and save are supported.</li>
                  <li>Batch compression, visual preview, password entry, and image quality sliders are not implemented.</li>
                  <li>Already optimized PDFs may show little or no size reduction.</li>
                  <li>Large PDFs may require more processing time and browser memory.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Best Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Choose Balanced first when you want to keep common document information.</li>
                  <li>Use Smallest when metadata removal is acceptable for your workflow.</li>
                  <li>Keep the original PDF as a backup.</li>
                  <li>Open the downloaded PDF and confirm readability before sharing or filing it.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Expecting large savings from a PDF that is already optimized.</li>
                  <li>Using Smallest without considering metadata changes.</li>
                  <li>Expecting document editing instead of compression.</li>
                  <li>Not reviewing the compressed output before sharing it.</li>
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
                ["PDF Merge", "/pdf-merge"],
                ["PDF Split", "/pdf-split"],
                ["PDF to Images", "/pdf-to-images"],
                ["Image to PDF Converter", "/image-to-pdf"],
                ["Image Converter", "/image-converter"],
                ["Image Resizer", "/image-resizer"],
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
            <PanelHeader eyebrow="Glossary" title="PDF Compression Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["PDF", "Portable Document Format, a fixed-layout document format for exchange and viewing."],
                ["Compression", "Reducing file size through document optimization or data encoding methods."],
                ["Lossless Compression", "Compression that preserves the original data exactly when decoded."],
                ["Lossy Compression", "Compression that can reduce file size by discarding some detail, often used for images."],
                ["File Size", "The amount of storage used by a file, usually shown in KB or MB."],
                ["Metadata", "Document information such as title, author, creator, producer, keywords, and dates."],
                ["Embedded Fonts", "Font data included in a PDF so text can display as intended."],
                ["Vector Graphics", "Shapes described mathematically rather than as fixed pixels."],
                ["Object Stream", "A PDF structure that can pack multiple indirect objects into a compressed stream."],
                ["Document Structure", "The internal organization of PDF objects, pages, resources, streams, and references."],
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
                  href="https://experienceleague.adobe.com/en/docs/document-cloud-learn/acrobat-learning/advanced-tasks/prepare/reduce"
                  rel="noreferrer"
                >
                  Adobe Acrobat Learn. Compress and optimize a PDF.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://pdfa.org/brotli-compression-coming-to-pdf/"
                  rel="noreferrer"
                >
                  PDF Association. PDF compression filters and object streams.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://pdf-lib.js.org/docs/api/classes/pdfdocument"
                  rel="noreferrer"
                >
                  pdf-lib. PDFDocument API.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://pdf-lib.js.org/docs/api/interfaces/saveoptions"
                  rel="noreferrer"
                >
                  pdf-lib. SaveOptions API.
                </a>
              </li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Disclaimer" title="Educational Disclaimer" />
            <p className="mt-6 text-sm leading-7 text-[var(--ink-700)]">
              This PDF Compressor reduces PDF file size using the implemented browser-based
              compression methods. Results are intended for educational, informational, and general
              productivity use. Compression effectiveness depends on document contents and the
              selected mode. Review the compressed PDF, document properties, file size, readability,
              and compatibility before sharing, publishing, printing, filing, archiving, or using
              generated PDFs in production workflows.
            </p>
          </ToolPanel>
        </section>
      </main>
    </>
  )
}
