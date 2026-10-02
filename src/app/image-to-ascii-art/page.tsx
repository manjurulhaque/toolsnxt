import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { ImageToAsciiArtTool } from "./image-to-ascii-art-tool"

const pagePath = "/image-to-ascii-art"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Image to ASCII Art | Convert Pictures to Text Art Online"
const pageDescription =
  "Convert images to ASCII art online in your browser. Upload a picture, adjust width, tone map, contrast, and inversion, then copy or download text art."

const faqs = [
  {
    question: "What is ASCII art?",
    answer:
      "ASCII art is an image-like design made from text characters rather than pixels.",
  },
  {
    question: "How does image-to-ASCII conversion work?",
    answer:
      "This tool draws the image to a canvas, samples pixels, calculates brightness, and maps each brightness value to a character in the selected tone map.",
  },
  {
    question: "Which image formats are supported?",
    answer:
      "The file picker accepts image files that the browser can read through image/*. Common formats may include JPG, PNG, WebP, GIF, BMP, and others depending on browser support.",
  },
  {
    question: "Does the tool work on mobile devices?",
    answer:
      "Yes. It uses standard browser image input, controls, preview, and text output, so support depends on the mobile browser and image size.",
  },
  {
    question: "Is my image uploaded to a server?",
    answer:
      "The conversion runs in your browser. The selected image is not intentionally uploaded by this tool.",
  },
  {
    question: "Can I copy the generated ASCII art?",
    answer:
      "Yes. Generate the output and use Copy Art to copy the text to your clipboard.",
  },
  {
    question: "Can I download the output?",
    answer:
      "Yes. Download TXT saves the generated ASCII art as ascii-art.txt.",
  },
  {
    question: "Why does my ASCII art not look like the original image?",
    answer:
      "ASCII art is an approximation. Output depends on image contrast, cropping, selected width, tone map, text font, and the implemented brightness mapping.",
  },
  {
    question: "Can I convert color images?",
    answer:
      "Yes. Color images can be uploaded, but this implementation outputs monochrome character art based on brightness values.",
  },
  {
    question: "Does the tool support Unicode characters?",
    answer:
      "The standard and detailed tone maps use ASCII-style printable characters. The block shade tone map uses block-shading characters as implemented.",
  },
  {
    question: "Can I use the output commercially?",
    answer:
      "The tool does not grant rights to the source image. Use images and generated outputs only when you have the necessary permissions.",
  },
  {
    question: "Is this tool free?",
    answer: "Yes. This is a free browser-based Image to ASCII Art tool.",
  },
  {
    question: "Why do different ASCII generators produce different results?",
    answer:
      "Tools may use different scaling, luminance formulas, character sets, contrast handling, trimming, and output dimensions.",
  },
  {
    question: "Is there a maximum image size?",
    answer:
      "The page does not show a fixed file-size limit, but large images may require more browser memory and processing time.",
  },
  {
    question: "How can I improve ASCII art quality?",
    answer:
      "Use a clear high-contrast image, crop unnecessary background, choose a suitable output width, and try different tone maps and contrast settings.",
  },
  {
    question: "Does it convert automatically?",
    answer:
      "No. After choosing an image or changing settings, click Generate ASCII to create the output.",
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
    about: ["Image to ASCII Art", "ASCII Art Generator", "ASCII Converter", "Image to Text Art"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Image to ASCII Art",
    applicationCategory: "MultimediaApplication",
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
    name: "Image to ASCII Art",
    applicationCategory: "MultimediaApplication",
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
        name: "Image to ASCII Art",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert an image to ASCII art online",
    description: "Generate copyable ASCII art from a browser-readable image.",
    step: [
      {
        "@type": "HowToStep",
        name: "Choose image",
        text: "Select a browser-readable image file.",
      },
      {
        "@type": "HowToStep",
        name: "Adjust settings",
        text: "Set output width, tone map, contrast, and brightness inversion if needed.",
      },
      {
        "@type": "HowToStep",
        name: "Generate ASCII",
        text: "Click Generate ASCII to convert the image.",
      },
      {
        "@type": "HowToStep",
        name: "Review output",
        text: "Check the source preview, generated text art, line count, and character count.",
      },
      {
        "@type": "HowToStep",
        name: "Copy or download",
        text: "Copy the ASCII art or download it as a TXT file.",
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

export default function ImageToAsciiArtPage() {
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
          <ImageToAsciiArtTool />
        </section>

        <section className="mx-auto max-w-6xl space-y-6 px-5 pb-12 sm:px-8 lg:pb-16">
          <ToolPanel>
            <PanelHeader eyebrow="Guide" title="What Is Image to ASCII Art?" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                Image to ASCII Art converts a raster image into text art by representing sampled
                pixels with characters. It is useful for terminal artwork, README files,
                documentation, creative coding, retro design, classroom demonstrations, social
                posts, and experiments by developers, designers, artists, students, and hobbyists.
              </p>
              <p>
                Raster images are made of pixels. ASCII art is made of characters arranged in rows.
                This tool estimates brightness from image pixels, then chooses characters from the
                selected tone map so darker and lighter areas form a text-based approximation.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Method" title="How ASCII Art Conversion Works" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Choose image", "Upload one browser-readable image through the file picker."],
                ["Preview source", "The selected image is shown in the Source Image panel."],
                ["Scale to width", "The output width is clamped between 24 and 220 characters."],
                ["Sample pixels", "The image is drawn to a canvas and pixel data is read with getImageData."],
                ["Map brightness", "Red, green, blue, and alpha values are converted to brightness and mapped to the selected tone map."],
                ["Generate text", "The output appears as monochrome text that can be copied or downloaded."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Features" title="Supported Features" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Image upload", "Accepts image/* files supported by the browser image decoder."],
                ["Source preview", "Displays the selected image before conversion."],
                ["Adjustable width", "Set output width from 24 to 220 characters."],
                ["Tone maps", "Choose Standard, Detailed, or Block shade mapping."],
                ["Contrast control", "Adjust contrast from 0.4x to 2.6x."],
                ["Invert brightness", "Reverse light and dark mapping with a checkbox."],
                ["Copy output", "Copy generated ASCII art to the clipboard."],
                ["Download TXT", "Download the output as ascii-art.txt."],
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
                ["Implemented algorithm", "ASCII output is generated from the uploaded image using the page's canvas and brightness mapping code."],
                ["Brightness formula", "The implementation weights red, green, and blue channels, accounts for alpha, then applies contrast."],
                ["Tone selection", "Character choice depends on brightness, invert mode, contrast, and the selected tone map."],
                ["Width and detail", "Larger output widths generally keep more visual detail but create wider text."],
                ["Text shape", "Output height is based on image aspect ratio and a fixed text-character adjustment."],
                ["Different tools", "Other ASCII generators may produce different results because mapping, scaling, and trimming rules vary."],
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
                ["Profile picture", "Convert a high-contrast avatar into text art."],
                ["Terminal artwork", "Generate monochrome art for console output or demos."],
                ["Retro graphics", "Create text-based visuals with a nostalgic computing style."],
                ["Documentation banner", "Make an ASCII banner or image-inspired block for a README."],
                ["Digital art project", "Experiment with tone maps, contrast, and width in creative coding."],
              ].map(([label, text]) => (
                <InfoBox key={label}>
                  <strong className="block text-[var(--ink-900)]">{label}</strong>
                  <span>{text}</span>
                </InfoBox>
              ))}
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Use" title="How to Use Image to ASCII Art" />
            <ol className="mt-6 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Choose a browser-readable image file.</li>
              <li>Set the output width and choose a tone map.</li>
              <li>Adjust contrast or enable Invert brightness if needed.</li>
              <li>Click Generate ASCII.</li>
              <li>Review the output, then copy the art or download the TXT file.</li>
            </ol>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Concepts" title="Understanding ASCII Art" />
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
              <p>
                ASCII characters are text symbols originally defined for a 7-bit character set.
                Modern text systems often use Unicode, which includes ASCII-compatible characters
                plus many more symbols. This page outputs text art rather than a new image file.
              </p>
              <p>
                Dense characters visually cover more area, so they can represent darker regions.
                Simpler characters and spaces represent lighter regions. Resizing changes how many
                samples are taken, so narrow output is more compact while wider output preserves
                more image structure.
              </p>
            </div>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Applications" title="Common Use Cases" />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {[
                ["Terminal projects", "Add generated text art to console applications and demos."],
                ["README files", "Create decorative text visuals for documentation."],
                ["Education", "Demonstrate pixel sampling, grayscale, luminance, and character mapping."],
                ["Creative design", "Explore retro computing, generative art, and typography experiments."],
                ["Social content", "Share small text-based art snippets where monospaced formatting is supported."],
                ["Programming practice", "Study how canvas pixel data can be transformed into text output."],
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
                  <li>Convert images into copyable text art in the browser.</li>
                  <li>Adjust width, tone map, contrast, and brightness inversion.</li>
                  <li>Copy or download ASCII output for projects and documentation.</li>
                  <li>Learn image-processing concepts through a visual text output.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Limitations</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>ASCII art cannot preserve every image detail.</li>
                  <li>Output quality depends on source image quality, contrast, and selected settings.</li>
                  <li>Small output widths reduce detail.</li>
                  <li>Drag-and-drop upload, color ASCII, and live auto-conversion are not implemented.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Tips for Best Results</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Use clear, well-lit, high-contrast images.</li>
                  <li>Crop unnecessary backgrounds before uploading.</li>
                  <li>Choose a wider output for more detail.</li>
                  <li>Try different tone maps and contrast settings before copying the final text.</li>
                </ul>
              </div>
              <div>
                <h2 className="text-lg font-semibold">Common Mistakes</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--ink-700)]">
                  <li>Uploading very low-resolution or blurry images.</li>
                  <li>Expecting photographic accuracy from character art.</li>
                  <li>Choosing an output width that is too small for the subject.</li>
                  <li>Viewing the output in a proportional font instead of a monospaced font.</li>
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
                ["Image Resizer", "/image-resizer"],
                ["Image Converter", "/image-converter"],
                ["Image to PDF Converter", "/image-to-pdf"],
                ["Base64 Encoder / Decoder", "/base64-encoder-decoder"],
                ["QR Code Generator", "/qr-code-generator"],
                ["Color Converter", "/color-converter"],
                ["Gradient Generator", "/gradient-generator"],
                ["Markdown Previewer", "/markdown-previewer"],
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
            <PanelHeader eyebrow="Glossary" title="ASCII Art Terms" />
            <dl className="mt-6 grid gap-4 text-sm leading-7 text-[var(--ink-700)] md:grid-cols-2">
              {[
                ["ASCII", "American Standard Code for Information Interchange, a 7-bit character encoding."],
                ["Unicode", "A modern character encoding standard that supports text from many writing systems."],
                ["Character Set", "A collection of characters used to represent text."],
                ["Pixel", "A single picture element in a raster image."],
                ["Grayscale", "An image or value based on lightness rather than color hue."],
                ["Brightness", "A lightness value calculated from sampled image pixels."],
                ["Luminance", "A weighted measure of perceived brightness from color channels."],
                ["Raster Image", "An image made from a grid of pixels."],
                ["Resolution", "The pixel dimensions or detail level of an image."],
                ["ASCII Art", "Artwork represented by arranged text characters."],
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
                  href="https://www.iana.org/assignments/character-sets/character-sets.xhtml"
                  rel="noreferrer"
                >
                  IANA Character Sets Registry. US-ASCII aliases and ANSI X3.4 sources.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Glossary/ASCII"
                  rel="noreferrer"
                >
                  MDN Web Docs. ASCII glossary.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.unicode.org/standard/standard.html"
                  rel="noreferrer"
                >
                  Unicode Consortium. The Unicode Standard.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData"
                  rel="noreferrer"
                >
                  MDN Web Docs. CanvasRenderingContext2D getImageData.
                </a>
              </li>
              <li>
                <a
                  className="font-semibold text-[var(--ink-900)] underline-offset-4 hover:underline"
                  href="https://www.w3.org/TR/2015/REC-2dcontext-20151119/"
                  rel="noreferrer"
                >
                  W3C. HTML Canvas 2D Context.
                </a>
              </li>
            </ul>
          </ToolPanel>

                  <EducationalDisclaimerCard type="educational">
          <p>
            This Image to ASCII Art tool converts images into text art using the implemented
            browser-based conversion algorithm. Results depend on image quality, selected width,
            tone map, contrast, brightness inversion, browser image decoding, and character
            mapping. Different applications may generate different ASCII output. The tool is
            intended for educational, creative, and development purposes.
          </p>
        </EducationalDisclaimerCard>
        </section>
      </main>
    </>
  )
}
