import type { Metadata } from "next"
import Link from "next/link"
import { InfoBox, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { GradientGeneratorTool } from "./gradient-generator-tool"

const pagePath = "/gradient-generator"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "CSS Gradient Generator | Linear, Radial & Conic Gradients"
const pageDescription =
  "Create linear, radial, and conic CSS gradients online. Adjust HEX color stops and direction, preview the result, load palettes, randomize colors, and copy the CSS background declaration."

const faqs = [
  {
    question: "What is a CSS Gradient Generator?",
    answer:
      "A CSS Gradient Generator builds a CSS background declaration from selected colors, stop positions, a gradient type, and a direction or rotation value.",
  },
  {
    question: "Which gradient types does this tool create?",
    answer: "The tool creates linear, radial, and conic CSS gradients.",
  },
  {
    question: "What is a linear gradient?",
    answer: "A linear gradient transitions between colors along a straight line. This tool uses a degree value from 0 to 360 for its direction.",
  },
  {
    question: "What is a radial gradient?",
    answer: "A radial gradient transitions outward from a center point. This tool outputs a circular radial gradient centered in the element.",
  },
  {
    question: "What is a conic gradient?",
    answer: "A conic gradient transitions around a center point. This tool uses the rotation control as the starting angle.",
  },
  {
    question: "How many color stops can I add?",
    answer: "The generator requires at least two color stops and allows up to six.",
  },
  {
    question: "Can I change a color stop position?",
    answer: "Yes. Each color stop has a position control from 0% to 100%, and the generated CSS lists stops in position order.",
  },
  {
    question: "Can I copy the generated CSS?",
    answer: "Yes. Use Copy CSS to copy the current background declaration.",
  },
  {
    question: "Can I use a preset palette?",
    answer: "Yes. Aurora, Ember, Garden, and Ink load three-color palettes into the existing gradient controls.",
  },
  {
    question: "What does Randomize do?",
    answer: "Randomize replaces the current stop colors with generated HEX colors and selects a degree value from 0 to 360.",
  },
  {
    question: "Can I add transparency?",
    answer: "No. The current interface accepts HEX color inputs only and does not provide an alpha control.",
  },
  {
    question: "Does the generator create repeating gradients?",
    answer: "No. It creates only linear-gradient(), radial-gradient(), and conic-gradient() CSS output.",
  },
  {
    question: "Why can the preview look different after I paste CSS elsewhere?",
    answer:
      "The preview uses the generated background declaration. The element size, surrounding styles, and browser rendering in another project can affect the final presentation.",
  },
  {
    question: "Is the Gradient Generator free?",
    answer: "Yes. This is a free browser-based CSS gradient tool.",
  },
  {
    question: "Does the Gradient Generator work on mobile devices?",
    answer: "Yes. It uses standard browser controls, so the experience depends on the mobile browser.",
  },
  {
    question: "Are gradient colors uploaded to a server?",
    answer: "The generator runs in your browser and does not intentionally upload the selected color values.",
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
    about: ["CSS Gradient Generator", "Linear Gradient", "Radial Gradient", "Conic Gradient"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "CSS Gradient Generator",
    applicationCategory: "DesignApplication",
    operatingSystem: "Any",
    url: pageUrl,
    description: pageDescription,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    featureList: [
      "Linear CSS gradients",
      "Radial CSS gradients",
      "Conic CSS gradients",
      "Two to six HEX color stops",
      "Stop position controls",
      "Direction and rotation control",
      "Live gradient preview",
      "Preset palettes",
      "Random color generation",
      "Copy CSS background declaration",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "CSS Gradient Generator",
    applicationCategory: "DesignApplication",
    operatingSystem: "Any",
    url: pageUrl,
    description: pageDescription,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Gradient Generator", item: pageUrl },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to create a CSS gradient",
    description: "Choose a gradient type, adjust the color stops and direction, then copy the generated CSS background declaration.",
    step: [
      { "@type": "HowToStep", name: "Choose a type", text: "Select Linear, Radial, or Conic." },
      { "@type": "HowToStep", name: "Set stops", text: "Adjust the HEX color and percentage for each color stop." },
      { "@type": "HowToStep", name: "Adjust direction", text: "Set the angle or rotation control from 0 to 360 degrees." },
      { "@type": "HowToStep", name: "Copy CSS", text: "Review the live preview and copy the generated background declaration." },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
]

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: pagePath },
  openGraph: { title: pageTitle, description: pageDescription, url: pageUrl, siteName: SITE_NAME, type: "website" },
  twitter: { card: "summary", title: pageTitle, description: pageDescription },
}

export default function GradientGeneratorPage() {
  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
        <GradientGeneratorTool />
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-14 sm:px-8">
        <ToolPanel>
          <PanelHeader eyebrow="Overview" title="What Is a CSS Gradient Generator?" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              A CSS gradient generator builds a background image value from a sequence of colors and
              their positions. It is useful when designing interface surfaces, hero backgrounds,
              charts, buttons, artwork, and other visual elements that need a smooth color transition.
            </p>
            <p>
              This generator produces linear, radial, and conic gradients with HEX color stops. It
              provides a live preview and a CSS <code>background</code> declaration that you can copy
              into a stylesheet or component.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Features" title="Gradient Generator Features" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Three CSS gradient types", "Create linear, radial, and conic gradient functions."],
              ["HEX color stops", "Edit the color of each stop with the native browser color control."],
              ["Two to six stops", "Add or remove stops while keeping the gradient within its implemented limits."],
              ["Stop positions", "Place each stop from 0% to 100%; generated CSS is ordered by position."],
              ["Direction control", "Set the linear angle or conic starting rotation from 0 to 360 degrees."],
              ["Live preview", "Review the current CSS gradient before copying the declaration."],
              ["Palettes and randomize", "Load one of four palettes or randomize the current colors and degree value."],
              ["Copy CSS", "Copy the current background declaration to use in a CSS workflow."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Types" title="Linear, Radial, and Conic Gradients" />
          <div className="mt-6 grid gap-5 md:grid-cols-3 text-sm leading-7 text-[var(--ink-700)]">
            <div>
              <h3 className="font-semibold text-[var(--ink-900)]">Linear</h3>
              <p className="mt-2">Colors transition along a straight line. The angle controls its direction; 0 degrees points upward and increasing angles rotate clockwise.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--ink-900)]">Radial</h3>
              <p className="mt-2">Colors transition outward from the center. This tool outputs a circular radial gradient centered in the element.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[var(--ink-900)]">Conic</h3>
              <p className="mt-2">Colors transition around a center point. The rotation control sets the start angle for the generated conic gradient.</p>
            </div>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Method" title="How CSS Gradients Work" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              CSS gradients are image values. A gradient function takes two or more color stops, and
              each stop can have a percentage position. This tool always emits the stop colors as HEX
              values with percentage positions, ordered from the lowest position to the highest.
            </p>
            <p>
              Two stops at the same percentage can form a hard transition. The tool does not provide
              repeating gradient functions, color interpolation controls, alpha inputs, length-based
              stop positions, or named CSS colors.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Workflow" title="How to Use the Gradient Generator" />
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>Select Linear, Radial, or Conic.</li>
            <li>Adjust the angle or rotation value.</li>
            <li>Edit each HEX color and its percentage position, or load a palette.</li>
            <li>Add or remove color stops within the available two-to-six range.</li>
            <li>Review the canvas preview and use Copy CSS when the result is ready.</li>
          </ol>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Examples" title="Common CSS Gradient Examples" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["App background", "Create a subtle linear background for an interface surface or page header."],
              ["Hero artwork", "Use a radial gradient as a centered, decorative background for a campaign or landing page."],
              ["Data visualization", "Use a conic gradient as a visual starting point for a circular progress or category display."],
              ["Brand exploration", "Load a palette, adjust the stops, and compare the generated CSS during early visual exploration."],
              ["Button treatment", "Build a concise linear gradient for a component, then test its contrast with its intended text."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Advantages" title="Benefits" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Creates a CSS background declaration without manually composing the gradient syntax.</li>
              <li>Shows the result as colors, positions, and direction change.</li>
              <li>Offers three commonly used CSS gradient functions.</li>
              <li>Provides palette shortcuts and random color exploration.</li>
              <li>Runs in the browser and supports copying the resulting CSS.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Boundaries" title="Limitations" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Only HEX input colors are supported; alpha/transparency controls are not available.</li>
              <li>The generated CSS includes only the <code>background</code> declaration, not a complete stylesheet.</li>
              <li>Repeating gradients, color hints, and interpolation-method controls are not implemented.</li>
              <li>The radial output is fixed to a centered circle.</li>
              <li>Preview appearance can vary with the element size, display, browser, and surrounding styles.</li>
            </ul>
          </ToolPanel>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Guidance" title="Tips for Best Results" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Use stop positions in ascending order when you want a predictable, smooth transition.</li>
              <li>Use fewer stops for a simpler visual hierarchy and add stops only when they improve the design.</li>
              <li>Test copied CSS in the target component because a gradient has no intrinsic dimensions.</li>
              <li>Check text contrast separately; a visually appealing gradient does not guarantee readable text.</li>
              <li>Keep the copied output with the design context that explains where it should be used.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Avoid" title="Common Mistakes" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Assuming that 0 degrees points right; in CSS linear gradients, 0 degrees points upward.</li>
              <li>Using too many colors without checking whether the result supports the content.</li>
              <li>Forgetting that equal-position stops can create a hard transition.</li>
              <li>Expecting a radial gradient to use the angle control in this implementation.</li>
              <li>Using the preview alone to judge accessibility or cross-browser presentation.</li>
            </ul>
          </ToolPanel>
        </div>

        <ToolPanel>
          <PanelHeader eyebrow="Questions" title="FAQ" />
          <div className="mt-6 grid gap-4">
            {faqs.map((faq) => (
              <details key={faq.question} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
                <summary className="cursor-pointer font-semibold">{faq.question}</summary>
                <p className="mt-3 text-sm leading-6 text-[var(--ink-700)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="More Tools" title="Related Tools" />
          <nav aria-label="Related tools" className="mt-6 grid gap-3 text-sm font-semibold md:grid-cols-3">
            {[
              ["Color Converter", "/color-converter"],
              ["Image Converter", "/image-converter"],
              ["Image Resizer", "/image-resizer"],
              ["SVG Optimizer / Viewer", "/svg-optimizer"],
              ["QR Code Generator", "/qr-code-generator"],
              ["Base64 Encoder / Decoder", "/base64-encoder-decoder"],
            ].map(([label, href]) => (
              <Link key={href} href={href} className="rounded-[1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] px-4 py-3 transition hover:border-[var(--accent-rust)]/40">
                {label}
              </Link>
            ))}
          </nav>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Terms" title="Glossary" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["CSS Gradient", "A CSS image value that transitions between colors."],
              ["Color Stop", "A color and optional position that defines a point in a gradient."],
              ["Linear Gradient", "A gradient whose colors transition along a straight line."],
              ["Radial Gradient", "A gradient whose colors transition outward from a center point."],
              ["Conic Gradient", "A gradient whose colors transition around a center point."],
              ["Angle", "A degree value used to set linear gradient direction or conic gradient rotation."],
              ["Stop Position", "The percentage point at which a color stop is placed in the gradient."],
              ["HEX Color", "A hexadecimal CSS color notation for red, green, and blue channels."],
              ["Interpolation", "The way a browser calculates colors between gradient stops."],
              ["Background", "The CSS property used here to apply a gradient image to an element."],
            ].map(([term, definition]) => (
              <div key={term}>
                <h3 className="font-semibold">{term}</h3>
                <p className="mt-1 text-sm leading-6 text-[var(--ink-700)]">{definition}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Sources" title="References" />
          <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li><a href="https://www.w3.org/TR/css-images-3/" className="font-semibold underline" rel="noopener noreferrer" target="_blank">W3C: CSS Images Module Level 3</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/linear-gradient" className="font-semibold underline" rel="noopener noreferrer" target="_blank">MDN: linear-gradient()</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/radial-gradient" className="font-semibold underline" rel="noopener noreferrer" target="_blank">MDN: radial-gradient()</a></li>
            <li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/gradient/conic-gradient" className="font-semibold underline" rel="noopener noreferrer" target="_blank">MDN: conic-gradient()</a></li>
          </ul>
        </ToolPanel>

        <InfoBox>
          Educational disclaimer: This tool generates CSS gradients using its implemented HEX color,
          stop-position, and direction controls. Results are intended for design, learning, and web
          development workflows. Review copied CSS in its target layout and verify text contrast,
          browser support, and visual requirements before production use.
        </InfoBox>
      </section>
    </main>
  )
}
