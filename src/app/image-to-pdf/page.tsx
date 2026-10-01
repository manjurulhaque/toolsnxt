import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { ImageToPdfTool } from "./image-to-pdf-tool"

const pagePath = "/image-to-pdf"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Image to PDF Converter | Convert JPG, PNG, WebP and GIF Online"
const pageDescription =
  "Convert images to PDF online in your browser. Combine JPG, PNG, WebP, GIF, and other browser-supported image files into a downloadable PDF."

const faqs = [
  {
    question: "What is an Image to PDF Converter?",
    answer:
      "An Image to PDF Converter creates a PDF document from one or more uploaded image files.",
  },
  {
    question: "How does this Image to PDF Converter work?",
    answer:
      "It loads selected images in the browser, draws each image to a canvas, encodes each page as JPEG data, builds a PDF file, and downloads it.",
  },
  {
    question: "Is this Image to PDF Converter free?",
    answer: "Yes. This is a free online image to PDF converter.",
  },
  {
    question: "Which image formats are supported?",
    answer:
      "The picker accepts image files. The interface lists JPG, PNG, WebP, and GIF, and conversion depends on the browser being able to decode the selected image.",
  },
  {
    question: "Can I merge multiple images into one PDF?",
    answer:
      "Yes. Select multiple images and the converter creates one PDF with one page for each image.",
  },
  {
    question: "Can I reorder images?",
    answer:
      "Yes. Use the Up and Down buttons on each selected image card to change the PDF page order.",
  },
  {
    question: "Can I remove an image before converting?",
    answer:
      "Yes. Use Remove on a selected image card, or Clear to remove the whole selection.",
  },
  {
    question: "Will image quality change?",
    answer:
      "The tool converts pages to JPEG using the selected image quality value, so quality and file size can change based on that setting.",
  },
  {
    question: "Does it work on mobile devices?",
    answer:
      "Yes. The tool uses standard browser file input and controls that work on modern mobile and desktop browsers.",
  },
  {
    question: "Is my data uploaded to a server?",
    answer:
      "The page processes images locally in your browser. The selected files are not intentionally uploaded by this converter.",
  },
  {
    question: "Can I print the generated PDF?",
    answer:
      "The tool downloads a PDF that can usually be opened in a PDF reader and printed from that reader.",
  },
  {
    question: "Does it support large images?",
    answer:
      "Large images may work, but very large files can use substantial browser memory and may create large PDFs.",
  },
  {
    question: "Is there a file size limit?",
    answer:
      "This page does not show a fixed size limit, but practical limits depend on your browser, device memory, and the size of the selected images.",
  },
  {
    question: "Can I convert PNG to PDF?",
    answer:
      "Yes, if your browser can decode the PNG file selected through the image picker.",
  },
  {
    question: "Can I convert JPG to PDF?",
    answer:
      "Yes. JPG and JPEG images are suitable inputs for this converter.",
  },
  {
    question: "Is the generated PDF compatible with Adobe Reader?",
    answer:
      "The file is written as a basic PDF 1.4 document with JPEG image pages and should open in common PDF readers, but critical workflows should be tested.",
  },
  {
    question: "Does this converter perform OCR?",
    answer:
      "No. It places images into a PDF and does not extract searchable text from photos or scans.",
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
    about: ["Image to PDF Converter", "JPG to PDF", "PNG to PDF", "PDF Document"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Image to PDF Converter",
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
    name: "Image to PDF Converter",
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
        name: "Image to PDF Converter",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert images to PDF",
    description: "Create a downloadable PDF from one or more browser-supported image files.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose images",
        text: "Select one or more image files from your device.",
      },
      {
        "@type": "HowToStep",
        name: "Arrange pages",
        text: "Use Up, Down, Remove, or Clear to control the selected image list.",
      },
      {
        "@type": "HowToStep",
        name: "Set image quality",
        text: "Adjust the image quality slider if needed.",
      },
      {
        "@type": "HowToStep",
        name: "Download PDF",
        text: "Click Download PDF to create and save the PDF file.",
      },
      {
        "@type": "HowToStep",
        name: "Review output",
        text: "Open the downloaded PDF and verify pages before printing or sharing.",
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

export default function ImageToPdfPage() {
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
          <ImageToPdfTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is an Image to PDF Converter?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                An Image to PDF Converter turns photos, scans, screenshots, and graphics into a
                PDF document. PDF is widely used because it presents fixed-layout pages that are
                easy to share, open, archive, and print across many systems.
              </p>
              <p>
                This tool is useful for document scans, assignments, business reports, contracts,
                invoices, receipts, portfolios, presentations, image archiving, and printable photo
                documents. It creates the PDF locally in the browser from the images you choose.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How the Image to PDF Converter Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Upload images", "Choose one or more image files using the file picker."],
                ["Page order", "Selected images appear in the order they will be written to the PDF."],
                ["Reorder and remove", "Use Up, Down, Remove, and Clear before creating the file."],
                ["Quality slider", "The JPEG quality setting controls the canvas export quality used for PDF pages."],
                ["Automatic page sizing", "Each PDF page uses the pixel width and height of the rendered image canvas."],
                ["Download PDF", "The converter creates and downloads a PDF from the selected pages."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Formats" title="Supported Image Formats" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                The file picker accepts image files and the interface lists JPG, PNG, WebP, and
                GIF. In practice, conversion depends on browser image decoding through
                <code className="mx-1 rounded bg-[var(--page-cream)] px-1">createImageBitmap</code>
                and canvas rendering. Unsupported or damaged image files may fail during conversion.
              </p>
              <InfoBox>
                The generated PDF embeds each rendered page as JPEG image data. It does not keep
                PNG transparency, animated GIF frames, layers, vector objects, or OCR text.
              </InfoBox>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Output" title="PDF Output Accuracy" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Image placement", "Each selected image becomes one PDF page in the current order."],
                ["Page size", "Page dimensions match the rendered image canvas dimensions."],
                ["Quality", "The quality slider affects JPEG export quality and PDF file size."],
                ["Background", "Images are drawn onto a white canvas before PDF creation."],
                ["Download name", "One image uses the original file name with .pdf; multiple images download as images.pdf."],
                ["No preview", "The page shows selected image thumbnails, but it does not display a rendered PDF preview."],
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
                ["Receipts", "Combine scanned receipts into one PDF for expense records."],
                ["Assignments", "Convert homework photos into a single PDF submission."],
                ["Product images", "Merge product photos into a simple catalog PDF."],
                ["Printing", "Create a printable PDF from one or more images."],
                ["Screenshots", "Combine screenshots into a single shareable PDF."],
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
                ["Multiple image upload", "Select more than one image file at a time."],
                ["Image thumbnails", "Review selected images before generating the PDF."],
                ["Image reordering", "Move each image up or down in the page list."],
                ["Image removal", "Remove individual images or clear the full selection."],
                ["Image quality", "Set JPEG quality from 55% to 100%."],
                ["PDF download", "Generate and download the PDF directly from the browser."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use the Image to PDF Converter" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Choose one or more image files.</li>
              <li>Review the selected images in the PDF page list.</li>
              <li>Use Up, Down, Remove, or Clear to adjust the selection.</li>
              <li>Set the image quality slider if you want a different quality and file-size balance.</li>
              <li>Click Download PDF.</li>
              <li>Open the downloaded PDF and verify the pages before sharing, printing, or submitting it.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Results" title="Understanding the Output" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Generated PDF", "A PDF file is created from the selected image list."],
                ["Number of pages", "The status message confirms how many pages were created."],
                ["Selected images", "The right panel shows thumbnails, file names, and file sizes."],
                ["Total size", "The badge shows selected file count and total uploaded-image size."],
                ["Downloaded file", "The browser downloads the generated PDF file."],
                ["Errors", "If conversion fails, the status message asks you to try different image files."],
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
                ["Education", "Submit worksheets, homework photos, notes, and assignments as one PDF."],
                ["Office documents", "Turn scans, receipts, invoices, contracts, and reports into portable files."],
                ["Business records", "Collect signed pages, delivery proofs, expense images, and product references."],
                ["Portfolios", "Combine design, art, photography, or presentation images into a PDF packet."],
                ["Printing", "Prepare image pages for review in a PDF reader before printing."],
                ["Archiving", "Store related image records together in a single document file."],
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
                  <li>Combines multiple images into one downloadable PDF.</li>
                  <li>Runs directly in the browser without intentional file upload.</li>
                  <li>Supports page ordering and individual image removal.</li>
                  <li>Creates a format that is easy to share, open, and print.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Output depends on browser-supported image decoding.</li>
                  <li>Very large images may increase memory use and PDF file size.</li>
                  <li>The converter does not perform OCR or PDF/A certification.</li>
                  <li>Image quality depends on the uploaded images and selected JPEG quality.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Best Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Use clear, high-resolution source images.</li>
                  <li>Upload images in the desired page order or reorder them before download.</li>
                  <li>Crop unnecessary borders before uploading when needed.</li>
                  <li>Review the downloaded PDF before sharing, printing, or submitting it.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Uploading unsupported or corrupted image files.</li>
                  <li>Using blurry, low-resolution, or rotated images.</li>
                  <li>Forgetting to arrange the page order.</li>
                  <li>Expecting OCR, selectable text, PDF/A, or accessibility tagging.</li>
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
                ["PDF Compress", "/pdf-compress"],
                ["PDF to Images", "/pdf-to-images"],
                ["Image Resizer", "/image-resizer"],
                ["Image Converter", "/image-converter"],
                ["Base64 Encoder / Decoder", "/base64-encoder-decoder"],
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
                ["Raster Image", "An image made from pixels, such as a photo or screenshot."],
                ["Resolution", "The pixel dimensions or detail level of an image."],
                ["DPI", "Dots per inch, commonly used when discussing print resolution."],
                ["Compression", "Reducing file size by encoding data more efficiently."],
                ["JPEG", "A common lossy image format used for photos."],
                ["PNG", "A common lossless image format often used for screenshots and graphics."],
                ["Page Orientation", "Whether a page is portrait or landscape."],
                ["Page Size", "The width and height of a PDF page."],
                ["PDF Document", "A file containing one or more fixed-layout pages."],
                ["Image Scaling", "Changing how large an image appears on a page."],
                ["Lossless Compression", "Compression that preserves original image data when decoded."],
                ["Lossy Compression", "Compression that can discard some data to reduce file size."],
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
                  href="https://developer.mozilla.org/en-US/docs/Web/Media/Guides/Formats/Image_types"
                  rel="noreferrer"
                >
                  MDN Web Docs. Image file type and format guide.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.w3.org/WAI/tutorials/images/"
                  rel="noreferrer"
                >
                  W3C WAI. Images Tutorial.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.section508.gov/create/pdfs/"
                  rel="noreferrer"
                >
                  Section508.gov. Create Accessible PDFs.
                </a>
              </li>
            </ul>
          </ToolPanel>

                  <EducationalDisclaimerCard type="educational">
          <p>
            This Image to PDF Converter generates PDF documents from uploaded images using the
            implemented browser conversion process. Results are intended for educational,
            informational, and general productivity use. Verify output before submitting,
            printing, archiving, or sharing important documents. This tool does not certify
            compliance with archival, legal, accessibility, regulatory, PDF/A, or industry-specific
            PDF standards unless those requirements are explicitly implemented.
          </p>
        </EducationalDisclaimerCard>
        </section>
      </main>
    </>
  )
}
