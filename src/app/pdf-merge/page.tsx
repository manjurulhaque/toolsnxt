import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { PdfMergeTool } from "./pdf-merge-tool"

const pagePath = "/pdf-merge"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "PDF Merge | Combine PDF Files Online"
const pageDescription =
  "Merge PDF files online in your browser. Combine multiple PDFs into one merged PDF, reorder files, remove files, and download merged.pdf."

const faqs = [
  {
    question: "What is a PDF Merge tool?",
    answer:
      "A PDF Merge tool combines pages from multiple PDF files into one output PDF.",
  },
  {
    question: "How does this PDF Merge tool work?",
    answer:
      "It loads selected PDFs in the browser with pdf-lib, copies all pages from each file in the displayed order, saves one merged PDF, and downloads it.",
  },
  {
    question: "Can I merge multiple PDF files?",
    answer:
      "Yes. Select two or more PDFs, arrange them, and download one merged PDF.",
  },
  {
    question: "Does merging affect document quality?",
    answer:
      "The implementation copies PDF pages rather than rasterizing them, so it does not intentionally reduce visual quality.",
  },
  {
    question: "Can I rearrange files before merging?",
    answer:
      "Yes. Use the Up and Down buttons to change document order before merging.",
  },
  {
    question: "Can I remove a PDF before merging?",
    answer:
      "Yes. Use Remove on a selected PDF, or Clear to reset the full selection.",
  },
  {
    question: "Can I merge scanned PDFs?",
    answer:
      "Yes, if pdf-lib can load the files. Scanned PDFs are still PDF documents with pages that can be copied.",
  },
  {
    question: "Can I merge password-protected PDFs?",
    answer:
      "The loader uses encryption-ignore behavior where possible, but there is no password entry flow. Some protected PDFs may fail.",
  },
  {
    question: "Is my PDF uploaded to a server?",
    answer:
      "The merge runs locally in your browser. The selected files are not intentionally uploaded by this tool.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "It uses browser file inputs and downloads, so support depends on the mobile browser and available memory.",
  },
  {
    question: "Is it free?",
    answer: "Yes. This is a free browser-based PDF merger.",
  },
  {
    question: "What happens to bookmarks or metadata?",
    answer:
      "This page copies pages into a new PDF and does not expose controls for preserving or editing document metadata, outlines, bookmarks, or forms.",
  },
  {
    question: "Can I merge very large PDF files?",
    answer:
      "Large files may work, but processing time and memory use depend on your browser, device, file count, and PDF complexity.",
  },
  {
    question: "Why is my merged file larger than expected?",
    answer:
      "A new PDF can have different object structure and overhead, and merging keeps page resources needed by the selected files.",
  },
  {
    question: "Can I merge PDFs created by different applications?",
    answer:
      "Usually yes, as long as pdf-lib can load the files and copy their pages.",
  },
  {
    question: "Is the page order preserved?",
    answer:
      "Yes. The merged output follows the visible file order, and each source PDF contributes its pages in original order.",
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
    about: ["PDF Merge", "Merge PDF", "Combine PDF Files", "PDF Merger"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PDF Merge",
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
    name: "PDF Merge",
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
        name: "PDF Merge",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to merge PDF files online",
    description: "Combine multiple selected PDF files into one merged PDF.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose PDFs",
        text: "Select two or more PDF files from your device.",
      },
      {
        "@type": "HowToStep",
        name: "Arrange order",
        text: "Use Up, Down, Remove, or Clear to adjust the file list.",
      },
      {
        "@type": "HowToStep",
        name: "Merge PDFs",
        text: "Click Download Merged PDF to combine pages in the displayed order.",
      },
      {
        "@type": "HowToStep",
        name: "Download output",
        text: "Save the generated merged.pdf file.",
      },
      {
        "@type": "HowToStep",
        name: "Verify result",
        text: "Open the merged PDF and confirm file order, page order, and completeness.",
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

export default function PdfMergePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.88fr_1.12fr] lg:py-12">
          <PdfMergeTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is a PDF Merge Tool?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                A PDF Merge tool combines multiple PDF documents into one file. It is useful for
                business workflows, legal packets, education materials, reports, contracts,
                invoices, project documentation, personal records, and other situations where
                several documents need to travel together.
              </p>
              <p>
                Merging and combining both mean placing documents into one PDF. Attaching documents
                can mean embedding files inside a PDF, which this page does not do. This tool copies
                pages from selected PDFs into a new merged document.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How PDF Merge Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Upload multiple PDFs", "Select two or more PDF files from your device."],
                ["Read page counts", "The page attempts to read each file's page count with pdf-lib."],
                ["Arrange order", "Use Up, Down, Remove, and Clear to control the selected file list."],
                ["Copy pages", "All pages from each PDF are copied in the displayed order."],
                ["Create output", "The copied pages are assembled into one new PDF document."],
                ["Download merged.pdf", "The final merged PDF downloads as merged.pdf."],
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
                This page supports standard PDFs that pdf-lib can load and copy. It can combine
                single-page and multi-page PDFs, and copied pages can include text, embedded fonts,
                images, vector graphics, and scanned page content as represented in each source PDF.
                It does not provide visual previews, password entry, attachment embedding, bookmark
                controls, form controls, or metadata editing.
              </p>
              <InfoBox>
                Corrupted, unsupported, or encrypted PDFs may fail to load even though the loader
                attempts to ignore encryption where possible.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Options" title="Merge Options" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Multiple PDF upload", "Add multiple PDF files using the file picker."],
                ["Manual ordering", "Move files up or down before merging."],
                ["Remove file", "Remove an individual PDF from the list."],
                ["Clear list", "Reset all selected files."],
                ["Single merged output", "Create one combined PDF file."],
                ["No preview", "This page lists files and page counts but does not render document previews."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Accuracy" title="Merge Accuracy" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["File order", "The merged PDF follows the visible order of selected files."],
                ["Page order", "Each source PDF contributes pages in its original order."],
                ["Page content", "The tool copies pages rather than editing page contents."],
                ["Single output", "All copied pages are saved into one merged PDF."],
                ["Original files", "Source PDFs remain unchanged."],
                ["Output name", "The downloaded file is named merged.pdf."],
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
                ["Invoices", "Combine multiple invoice PDFs into one monthly packet."],
                ["Presentations", "Merge separate slide deck exports into one document."],
                ["Contracts", "Join scanned contract sections for client delivery."],
                ["eBook draft", "Combine chapter PDFs into one draft file."],
                ["Project reports", "Merge status reports before sharing with a team."],
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
                ["Multiple PDF uploads", "Select more than one PDF file."],
                ["Document reordering", "Use Up and Down buttons to arrange the merge order."],
                ["File removal", "Remove individual PDFs before merging."],
                ["Page count display", "Show known page counts for readable PDFs."],
                ["Browser-based merge", "Processing runs in the browser with pdf-lib."],
                ["Single merged output", "Download one merged PDF file."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use PDF Merge" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Choose two or more PDF files.</li>
              <li>Review the selected file list and page counts where available.</li>
              <li>Use Up, Down, Remove, or Clear to arrange the desired merge order.</li>
              <li>Click Download Merged PDF.</li>
              <li>Open the downloaded merged.pdf and verify document order and completeness.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Output" title="Understanding the Output" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Merged PDF", "One output file is created from all selected PDFs."],
                ["Combined page order", "Pages appear file by file, following the displayed list."],
                ["File size", "The selected list shows total source size; final size may differ after saving."],
                ["Download option", "The primary action downloads merged.pdf."],
                ["No visual preview", "The page does not render the merged document before download."],
                ["Minimum files", "At least two PDFs are required before merging."],
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
                ["Business reports", "Combine summaries, appendices, and supporting PDFs."],
                ["Contracts and legal documents", "Assemble agreements, exhibits, and signature pages."],
                ["Education", "Join readings, worksheets, and assignment materials."],
                ["Invoices and receipts", "Create one file for accounting or reimbursement."],
                ["Printing", "Prepare one PDF packet instead of many separate files."],
                ["Personal archives", "Organize related records into a single document."],
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
                  <li>Merge PDFs in the browser without installing desktop software.</li>
                  <li>Organize related documents into a single shareable file.</li>
                  <li>Preserve page content by copying pages instead of rasterizing them.</li>
                  <li>Reorder and remove files before creating the merged output.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Only PDFs that pdf-lib can load and copy are supported.</li>
                  <li>Password entry, visual preview, page-level rearranging, and ZIP output are not implemented.</li>
                  <li>Very large PDF collections may require more processing time and browser memory.</li>
                  <li>Merge order affects the final document.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Best Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Arrange files in the correct order before merging.</li>
                  <li>Keep original PDFs as backups.</li>
                  <li>Use a PDF Split tool first if you need to remove unnecessary pages.</li>
                  <li>Open and verify merged.pdf before sharing, printing, or filing it.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Uploading files in the wrong order.</li>
                  <li>Forgetting to rearrange documents before merging.</li>
                  <li>Expecting text or page editing instead of document merging.</li>
                  <li>Not reviewing the merged document after download.</li>
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
                ["PDF Split", "/pdf-split"],
                ["PDF Compress", "/pdf-compress"],
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
            <PanelHeader eyebrow="Glossary" title="PDF Merge Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["PDF", "Portable Document Format, a fixed-layout document format."],
                ["Merge", "Combining multiple PDFs into one PDF file."],
                ["Combine", "Another common word for merging documents into one file."],
                ["Document Order", "The order of source PDFs in the merge list."],
                ["Page Order", "The sequence of pages inside the final merged PDF."],
                ["Metadata", "Information stored about a document, such as title, creator, or dates."],
                ["Embedded Fonts", "Font data included in a PDF so text can display as intended."],
                ["Vector Graphics", "Shapes described mathematically rather than as fixed pixels."],
                ["PDF Object", "An internal building block used by a PDF file."],
                ["Document Structure", "The internal organization of pages, objects, resources, and references."],
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
                  href="https://developer.adobe.com/open/standards/"
                  rel="noreferrer"
                >
                  Adobe Developer. Adobe open standards and PDF.
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
                  href="https://pdf-lib.js.org/"
                  rel="noreferrer"
                >
                  pdf-lib. Create and modify PDF documents in JavaScript.
                </a>
              </li>
            </ul>
          </ToolPanel>

                  <EducationalDisclaimerCard type="educational">
          <p>
            This PDF Merge tool combines multiple PDF documents using the implemented
            browser-based merge logic. Results are intended for educational, informational, and
            general productivity use. Merging preserves document content as supported by the
            implementation and follows the selected file order. Verify document order, page order,
            file completeness, document properties, and compatibility before sharing, publishing,
            printing, filing, archiving, or using generated PDFs in production workflows.
          </p>
        </EducationalDisclaimerCard>
        </section>
      </main>
    </>
  )
}
