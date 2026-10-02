import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { PdfSplitTool } from "./pdf-split-tool"

const pagePath = "/pdf-split"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "PDF Split | Split PDF Files and Extract Pages Online"
const pageDescription =
  "Split PDF files online in your browser. Extract a page range or separate every PDF page into individual downloadable PDF files."

const faqs = [
  {
    question: "What is a PDF Split tool?",
    answer:
      "A PDF Split tool separates pages from a PDF into one or more new PDF files.",
  },
  {
    question: "How does this PDF Split tool work?",
    answer:
      "It loads one PDF in the browser with pdf-lib, copies selected pages into new PDF documents, saves them, and starts downloads.",
  },
  {
    question: "Can I extract only certain pages?",
    answer:
      "Yes. Use Page range mode to extract one continuous range from Start page to End page.",
  },
  {
    question: "Can I split every page into a separate PDF?",
    answer:
      "Yes. Use Every page mode to create one downloaded PDF file per page.",
  },
  {
    question: "Is formatting preserved?",
    answer:
      "The implementation copies PDF pages into new documents, so page appearance is preserved when the source PDF is supported.",
  },
  {
    question: "Does splitting reduce file quality?",
    answer:
      "Splitting copies pages rather than rasterizing them, so it does not intentionally reduce visual quality.",
  },
  {
    question: "Can I split large PDFs?",
    answer:
      "Large PDFs may work, but processing time and memory use depend on your browser, device, and PDF complexity.",
  },
  {
    question: "Can I split password-protected PDFs?",
    answer:
      "The tool loads PDFs with encryption ignored where possible, but it does not provide a password entry flow. Some protected PDFs may fail.",
  },
  {
    question: "Is my PDF uploaded to a server?",
    answer:
      "The splitting runs locally in your browser. The selected PDF is not intentionally uploaded by this tool.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "It uses browser file input and downloads, so support depends on the mobile browser and available memory.",
  },
  {
    question: "Is it free?",
    answer: "Yes. This is a free browser-based PDF splitter.",
  },
  {
    question: "Can I undo splitting?",
    answer:
      "The original PDF remains unchanged. Delete the generated files or use a PDF merge tool if you need to combine outputs again.",
  },
  {
    question: "What happens to bookmarks or metadata?",
    answer:
      "This page copies pages into new PDFs. It does not expose controls for preserving or editing document metadata, outlines, bookmarks, or forms.",
  },
  {
    question: "Can I split scanned PDFs?",
    answer:
      "Yes, if pdf-lib can load the PDF. Scanned pages are still PDF pages and can be copied into output files.",
  },
  {
    question: "Why is my output file size different?",
    answer:
      "New PDF files may have different structure, object references, and overhead than the original, so file sizes can change.",
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
    about: ["PDF Split", "Split PDF", "Extract PDF Pages", "PDF Splitter"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "PDF Split",
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
    name: "PDF Split",
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
        name: "PDF Split",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to split a PDF online",
    description: "Extract a page range or split every page into separate PDF files.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose PDF",
        text: "Select one PDF file from your device.",
      },
      {
        "@type": "HowToStep",
        name: "Choose split mode",
        text: "Select Page range or Every page.",
      },
      {
        "@type": "HowToStep",
        name: "Set range",
        text: "For Page range mode, enter Start page and End page.",
      },
      {
        "@type": "HowToStep",
        name: "Download output",
        text: "Click Download Range or Download Pages to save the generated PDF file or files.",
      },
      {
        "@type": "HowToStep",
        name: "Verify results",
        text: "Open the downloaded PDFs and confirm page order and completeness.",
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

export default function PdfSplitPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
        <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
          <PdfSplitTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is a PDF Split Tool?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                A PDF Split tool separates pages from a PDF into smaller PDF files. It is useful
                for sharing only part of a document, extracting form pages, preparing print packets,
                organizing project files, or separating business, legal, education, government,
                archive, and personal documents.
              </p>
              <p>
                Splitting copies pages into new files. Extracting pages keeps selected pages.
                Deleting pages removes pages from a document, which this page does not do directly;
                instead, the original PDF remains unchanged while new output PDFs are downloaded.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How PDF Split Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Upload PDF", "Choose one PDF file from your device."],
                ["Read page count", "pdf-lib loads the PDF and reports the number of pages."],
                ["Choose mode", "Use Page range or Every page mode."],
                ["Extract range", "Page range mode copies a continuous range into one new PDF."],
                ["Split every page", "Every page mode creates one new PDF per source page."],
                ["Download files", "Generated PDFs are saved through browser download links."],
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
                This page supports standard PDFs that pdf-lib can load and copy. It can process
                single-page and multi-page PDFs, and copied pages can include text, embedded fonts,
                images, vector graphics, and scanned page content as represented in the source PDF.
                It does not provide page previews, password entry, PDF editing, bookmark controls,
                or metadata editing.
              </p>
              <InfoBox>
                Corrupted, unsupported, or encrypted PDFs may fail to load even though the loader
                attempts to ignore encryption where possible.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Options" title="Split Options" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Page range", "Extract one continuous range from Start page to End page into a single PDF."],
                ["Every page", "Create one PDF file per page in the original document."],
                ["Start page", "The first page included in Page range mode."],
                ["End page", "The last page included in Page range mode."],
                ["Clear", "Remove the selected file and reset the page range."],
                ["No preview", "This page shows file details and settings but does not render page previews."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Accuracy" title="Splitting Accuracy" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Page order", "Range output keeps pages in ascending source order."],
                ["Page content", "The tool copies PDF pages rather than editing page contents."],
                ["Range output", "The downloaded range file contains only the selected continuous page range."],
                ["Every-page output", "Each downloaded PDF contains one copied source page."],
                ["Original file", "The source PDF is not modified by the split operation."],
                ["Output names", "Files include the original name plus the selected range or page number."],
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
                ["Report range", "Extract pages 5-10 from a long report."],
                ["Individual pages", "Split a 100-page PDF into one PDF per page."],
                ["Invoices", "Separate invoice pages into individual PDF files."],
                ["Presentation slides", "Extract selected slides from a PDF deck for sharing."],
                ["Email attachment", "Create a smaller PDF by downloading only the relevant page range."],
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
                ["Page count detection", "Show page count and source file size after loading."],
                ["Page range extraction", "Download one PDF containing selected pages."],
                ["Every-page split", "Download one PDF for each source page."],
                ["Browser-based operation", "Processing runs in the browser with pdf-lib."],
                ["Multiple downloads", "Every page mode can trigger many individual downloads."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use PDF Split" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Choose a PDF file.</li>
              <li>Select Page range or Every page mode.</li>
              <li>For Page range mode, enter Start page and End page.</li>
              <li>Click Download Range or Download Pages.</li>
              <li>Open the downloaded PDF files and verify page order and completeness.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Output" title="Understanding the Output" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Range file", "Page range mode downloads one PDF named with the selected start and end pages."],
                ["Page files", "Every page mode downloads one PDF per page with a padded page number."],
                ["Selected pages", "Output PDFs contain only copied pages from the chosen source file."],
                ["File size", "Output file sizes may differ from the original because new PDFs are saved."],
                ["No ZIP archive", "Every page mode starts multiple PDF downloads rather than creating a ZIP file."],
                ["No preview", "The page does not render visual previews of PDF pages or outputs."],
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
                ["Business documents", "Share selected pages from contracts, proposals, and reports."],
                ["Legal paperwork", "Extract exhibits, signature pages, or filing sections for review."],
                ["Educational materials", "Separate handouts, worksheets, readings, or assignment pages."],
                ["Printing", "Prepare only the page range needed for a print job."],
                ["Government forms", "Extract relevant form pages while keeping the original unchanged."],
                ["Project documentation", "Split large documentation PDFs into smaller task-specific files."],
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
                  <li>Split PDFs in the browser without installing desktop software.</li>
                  <li>Extract a smaller PDF for sharing or printing.</li>
                  <li>Create one PDF per page for organization workflows.</li>
                  <li>Keep the original source file unchanged.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Only PDFs that pdf-lib can load and copy are supported.</li>
                  <li>Password entry, page preview, arbitrary page lists, and ZIP export are not implemented.</li>
                  <li>Very large PDFs may require more processing time and browser memory.</li>
                  <li>Splitting reorganizes pages but does not edit text, images, or page content.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Best Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Verify page numbers before splitting.</li>
                  <li>Keep the original PDF as a backup.</li>
                  <li>Use page ranges for large documents when you only need part of the file.</li>
                  <li>Confirm downloaded files before sharing or archiving them.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Selecting the wrong page range.</li>
                  <li>Confusing printed page labels with PDF page numbers.</li>
                  <li>Expecting page content editing instead of page extraction.</li>
                  <li>Forgetting that every-page mode may require saving many downloads.</li>
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
            <PanelHeader eyebrow="Glossary" title="PDF Split Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["PDF", "Portable Document Format, a fixed-layout document format."],
                ["Page Range", "A continuous sequence of pages, such as pages 5 through 10."],
                ["Page Extraction", "Copying selected pages from one PDF into another PDF."],
                ["Split", "Separating a PDF into smaller PDF files."],
                ["Document Structure", "The internal organization of a PDF's pages, objects, and resources."],
                ["Metadata", "Information stored about a document, such as title, creator, or dates."],
                ["Embedded Fonts", "Font data included in a PDF so text can display as intended."],
                ["Vector Graphics", "Shapes described mathematically rather than as fixed pixels."],
                ["Raster Image", "An image made from pixels."],
                ["PDF Object", "An internal building block used by a PDF file."],
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
                  href="https://pdf-lib.js.org/docs/api/classes/pdfpage"
                  rel="noreferrer"
                >
                  pdf-lib. PDFPage API.
                </a>
              </li>
            </ul>
          </ToolPanel>

                  <EducationalDisclaimerCard type="educational">
          <p>
            This PDF Split tool separates PDF pages using the implemented browser-based page
            extraction logic. Results are intended for educational, informational, and general
            productivity use. Splitting a PDF does not modify the content of the extracted pages,
            and the original file remains unchanged. Verify page order, file completeness,
            document properties, and compatibility before sharing, publishing, filing, archiving,
            or using generated PDFs in production workflows.
          </p>
        </EducationalDisclaimerCard>
        </section>
      </main>
    </>
  )
}
