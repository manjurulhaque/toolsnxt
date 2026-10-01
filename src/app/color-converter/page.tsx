import type { Metadata } from "next"
import Link from "next/link"
import { EducationalDisclaimerCard, PanelHeader, ToolPanel } from "@/components/tool-page"
import { SITE_NAME, SITE_URL } from "@/lib/site"
import { ColorConverterTool } from "./color-converter-tool"

const pagePath = "/color-converter"
const pageUrl = `${SITE_URL}${pagePath}`
const pageTitle = "Color Converter | HEX RGB HSL Converter Online"
const pageDescription =
  "Convert HEX colors to RGB, RGBA, HSL, HSLA, and CSS variable values online with editable RGB and HSL channels, color preview, swatches, and copy buttons."

const faqs = [
  {
    question: "What is a Color Converter?",
    answer:
      "A Color Converter changes one supported color representation into other supported formats, such as HEX, RGB, and HSL.",
  },
  {
    question: "What is HEX?",
    answer:
      "HEX is a hexadecimal notation commonly used in CSS to represent red, green, and blue channel values.",
  },
  {
    question: "What is RGB?",
    answer:
      "RGB represents a color with red, green, and blue channel values. This tool displays RGB channels from 0 to 255.",
  },
  {
    question: "What is HSL?",
    answer:
      "HSL represents color with hue, saturation, and lightness. Hue is an angle-like value, while saturation and lightness are percentages.",
  },
  {
    question: "Can I convert HEX to RGB?",
    answer:
      "Yes. Enter a valid 3-digit or 6-digit HEX value and the tool displays the matching RGB value.",
  },
  {
    question: "Can I convert RGB to HEX?",
    answer:
      "Yes. Edit the red, green, or blue number fields and the tool updates the HEX value using the existing conversion rules.",
  },
  {
    question: "Can I convert HEX to HSL?",
    answer:
      "Yes. Valid HEX input is converted to an HSL value with rounded hue, saturation, and lightness channels.",
  },
  {
    question: "Can I convert HSL to HEX?",
    answer:
      "Yes. Edit the H, S, or L fields and the tool converts that HSL value back to HEX and RGB.",
  },
  {
    question: "Does the tool support transparency?",
    answer:
      "The output includes RGBA and HSLA strings with alpha set to 1. The page does not provide an editable alpha input.",
  },
  {
    question: "Does the tool support HSV or CMYK?",
    answer:
      "No. This implementation documents and converts only HEX, RGB, RGBA, HSL, HSLA, and a CSS variable output.",
  },
  {
    question: "Can I use the converted colors in CSS?",
    answer:
      "Yes. The HEX, RGB, RGBA, HSL, HSLA, and CSS variable outputs are formatted for common CSS workflows.",
  },
  {
    question: "Why are converted values sometimes slightly different?",
    answer:
      "Rounding and precision rules can affect displayed channel values, especially when converting through HSL.",
  },
  {
    question: "Why does the converted color look different on another screen?",
    answer:
      "Screens, browsers, and color-management settings can display the same numerical color differently.",
  },
  {
    question: "What is an alpha channel?",
    answer:
      "An alpha channel represents opacity or transparency. This page only outputs alpha values fixed at 1.",
  },
  {
    question: "Is the Color Converter free?",
    answer: "Yes. This is a free browser-based color conversion tool.",
  },
  {
    question: "Does the Color Converter work on mobile devices?",
    answer:
      "Yes. It uses standard browser inputs and buttons, so behavior depends on the mobile browser.",
  },
  {
    question: "Is my color data uploaded to a server?",
    answer:
      "The conversion runs in your browser and does not intentionally upload entered color values.",
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
    about: ["Color Converter", "HEX Converter", "RGB Converter", "HSL Converter", "CSS Color Converter"],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Color Converter",
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
      "HEX input",
      "RGB channel editing",
      "HSL channel editing",
      "RGBA and HSLA output",
      "CSS variable output",
      "Color preview",
      "Copy buttons",
      "Preset swatches",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Color Converter",
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
        name: "Color Converter",
        item: pageUrl,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to convert color values",
    description: "Convert supported color values between HEX, RGB, RGBA, HSL, HSLA, and CSS variable formats.",
    step: [
      {
        "@type": "HowToStep",
        name: "Enter a color",
        text: "Type or paste a valid 3-digit or 6-digit HEX color, choose a color from the picker, or select a preset swatch.",
      },
      {
        "@type": "HowToStep",
        name: "Adjust channels",
        text: "Edit RGB or HSL number fields if you want to modify the color channels.",
      },
      {
        "@type": "HowToStep",
        name: "Review outputs",
        text: "Check the converted HEX, RGB, RGBA, HSL, HSLA, CSS variable, and color preview.",
      },
      {
        "@type": "HowToStep",
        name: "Copy a value",
        text: "Select a generated output row to copy that value to the clipboard.",
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

export default function ColorConverterPage() {
  return (
    <main className="bg-[var(--page-cream)] text-[var(--ink-900)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-12">
        <ColorConverterTool />
      </section>

      <section className="mx-auto max-w-6xl space-y-6 px-5 pb-14 sm:px-8">
        <ToolPanel>
          <PanelHeader eyebrow="Overview" title="What Is a Color Converter?" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              A Color Converter turns a color code into other supported representations. The same
              sRGB color can be written as HEX, RGB, RGBA, HSL, or HSLA, but each format organizes
              the channel values differently. Designers, developers, students, and branding teams
              use these formats when writing CSS, sharing design tokens, or translating colors
              between tools.
            </p>
            <p>
              This page is focused on web color workflows. It accepts 3-digit and 6-digit HEX
              colors, lets you adjust RGB and HSL channels, displays a live swatch, and provides
              copyable CSS-friendly values.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Formats" title="Supported Color Formats" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["HEX", "Represents red, green, and blue channels with hexadecimal notation, such as #2563EB."],
              ["RGB", "Represents red, green, and blue as numeric channels from 0 to 255."],
              ["RGBA", "Uses the displayed RGB channels with alpha fixed at 1 in this implementation."],
              ["HSL", "Represents hue, saturation, and lightness. Hue is shown from 0 to 360; saturation and lightness are percentages."],
              ["HSLA", "Uses the displayed HSL channels with alpha fixed at 1 in this implementation."],
              ["CSS Variable", "Outputs a simple custom property using the converted HEX value."],
            ].map(([name, description]) => (
              <div key={name} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
                <h3 className="font-semibold">{name}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{description}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Method" title="How Color Conversion Works" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              Enter a valid HEX color, choose from the browser color picker, select a preset swatch,
              or use the random color button. The tool parses the HEX value into red, green, and
              blue channels, then derives HSL, RGBA, HSLA, and CSS variable output strings from
              those values.
            </p>
            <p>
              You can also edit RGB or HSL fields directly. The converter updates the HEX input and
              all displayed outputs using the existing implementation&apos;s formulas, clamping, and
              rounding behavior.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Accuracy" title="Conversion Accuracy and Preview" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              Conversion results follow the current formulas and display precision used by this
              page. Rounded HSL channel values can produce small numerical differences compared
              with converters that keep more precision or use different serialization rules.
            </p>
            <p>
              The swatch visually represents the current color and includes a text label with the
              HEX and RGB values so color is not the only cue. Preview appearance can still vary by
              browser, display calibration, and color-management environment.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Examples" title="Common Color Conversion Examples" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Web development", "Convert a HEX brand color into RGB or HSL before using it in CSS."],
              ["UI design", "Adjust HSL lightness or saturation to explore related interface colors."],
              ["Branding", "Copy a consistent CSS variable for design tokens or documentation."],
              ["CSS handoff", "Share HEX, RGB, RGBA, HSL, or HSLA values with developers."],
              ["Quick checks", "Use preset swatches or randomize to inspect CSS-ready color formats."],
            ].map(([title, text]) => (
              <div key={title} className="rounded-[1.1rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ink-700)]">{text}</p>
              </div>
            ))}
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Workflow" title="How to Use the Color Converter" />
          <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
            <li>Enter a 3-digit or 6-digit HEX color, pick a color, select a swatch, or randomize.</li>
            <li>Edit RGB or HSL number fields if you want to adjust the color channels.</li>
            <li>Review the live color preview and the converted output values.</li>
            <li>Choose a generated output row to copy that value to your clipboard.</li>
            <li>Paste the copied color into CSS, documentation, design notes, or another workflow.</li>
          </ol>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Concepts" title="Understanding Color Formats" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              HEX and RGB describe red, green, and blue channels in the sRGB web color workflow.
              HEX is compact and common in CSS, while RGB makes each numeric channel explicit.
            </p>
            <p>
              HSL describes hue, saturation, and lightness, which can be easier for people to reason
              about when adjusting a color. RGBA and HSLA include alpha syntax, but this tool outputs
              those values with alpha fixed at 1 rather than providing transparency controls.
            </p>
          </div>
        </ToolPanel>

        <ToolPanel>
          <PanelHeader eyebrow="Color Science" title="Color Spaces Explained" />
          <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--ink-700)]">
            <p>
              A color model describes channels such as red, green, blue, hue, saturation, or
              lightness. A color space gives those values a more specific interpretation. This
              converter works with common CSS-style sRGB-oriented formats, not print CMYK,
              perceptual Lab, LCH, OKLab, or OKLCH workflows.
            </p>
            <p>
              The preview label uses a relative-luminance calculation to choose light or dark text
              over the swatch. That label is a usability aid, not a full WCAG contrast audit.
            </p>
          </div>
        </ToolPanel>

        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Advantages" title="Benefits" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Converts common web color formats without manual channel calculations.</li>
              <li>Provides a browser-based workflow with no installation required.</li>
              <li>Supports quick copying for CSS, documentation, and design handoff.</li>
              <li>Lets you compare HEX, RGB, RGBA, HSL, and HSLA values in one place.</li>
              <li>Includes a visual preview plus text values for accessible confirmation.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Boundaries" title="Limitations" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Only 3-digit and 6-digit HEX input is accepted.</li>
              <li>HSV, CMYK, Lab, LCH, OKLab, and OKLCH are not implemented on this page.</li>
              <li>RGBA and HSLA outputs use alpha fixed at 1.</li>
              <li>Rounding can create small differences from other conversion tools.</li>
              <li>Visual appearance can vary across displays and browsers.</li>
            </ul>
          </ToolPanel>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <ToolPanel>
            <PanelHeader eyebrow="Guidance" title="Tips for Best Results" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Use a valid 3-digit or 6-digit HEX value.</li>
              <li>Check RGB and HSL channel ranges before copying values.</li>
              <li>Preserve precision when exact design tokens matter.</li>
              <li>Review copied values before publishing production CSS.</li>
              <li>Use a dedicated accessibility checker when contrast compliance is required.</li>
            </ul>
          </ToolPanel>

          <ToolPanel>
            <PanelHeader eyebrow="Avoid" title="Common Mistakes" />
            <ul className="mt-5 list-disc space-y-3 pl-5 text-sm leading-7 text-[var(--ink-700)]">
              <li>Entering unsupported HEX lengths such as 4-digit or 8-digit alpha HEX.</li>
              <li>Mixing up RGB channel order with HSL channel order.</li>
              <li>Assuming HSL saturation and lightness behave like HSV saturation and value.</li>
              <li>Treating the preview as calibrated color measurement.</li>
              <li>Assuming small rounding differences mean a conversion is incorrect.</li>
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
              ["Gradient Generator", "/gradient-generator"],
              ["Image Converter", "/image-converter"],
              ["Image Resizer", "/image-resizer"],
              ["SVG Optimizer", "/svg-optimizer"],
              ["Base64 Encoder / Decoder", "/base64-encoder-decoder"],
              ["QR Code Generator", "/qr-code-generator"],
              ["Case Converter", "/case-converter"],
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

        <ToolPanel>
          <PanelHeader eyebrow="Terms" title="Glossary" />
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {[
              ["Color", "A visual value represented by channels such as red, green, blue, hue, saturation, or lightness."],
              ["Color Model", "A way to describe color using a set of channels, such as RGB or HSL."],
              ["Color Space", "A defined interpretation of color values within a model."],
              ["HEX", "A compact hexadecimal notation for RGB channel values."],
              ["RGB", "A model using red, green, and blue channels."],
              ["RGBA", "RGB notation with an alpha component for opacity; alpha is fixed at 1 on this page."],
              ["HSL", "A model using hue, saturation, and lightness."],
              ["HSLA", "HSL notation with an alpha component for opacity; alpha is fixed at 1 on this page."],
              ["Hue", "The base color angle used by HSL."],
              ["Saturation", "How vivid or gray a color is in HSL."],
              ["Lightness", "How dark or light a color is in HSL."],
              ["Channel", "One numeric component of a color value."],
              ["Alpha Channel", "A value that represents opacity or transparency."],
              ["Gamut", "The range of colors a system can represent or display."],
              ["Color Code", "A text representation of a color, such as #2563EB or rgb(37, 99, 235)."],
              ["CSS Color", "A color value written in syntax that CSS can understand."],
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
            <li>
              <a href="https://www.w3.org/TR/css-color-4/" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                W3C CSS Color Module Level 4
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                MDN: CSS color values
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Colors/Color_values" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                MDN: Using color values
              </a>
            </li>
            <li>
              <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/color" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                MDN: HTML color input
              </a>
            </li>
            <li>
              <a href="https://www.w3.org/WAI/WCAG21/Understanding/relative-luminance.html" className="font-semibold underline" rel="noopener noreferrer" target="_blank">
                W3C WCAG: Relative luminance
              </a>
            </li>
          </ul>
        </ToolPanel>

                <EducationalDisclaimerCard type="educational">
          <p>
            This Color Converter converts values according to its implemented
            formulas, parsing rules, rounding, and supported formats. Results are intended for general
            web development, design, educational, and color-formatting use. Different tools may produce
            slightly different numbers, and screen appearance can vary across displays, browsers, and
            color-managed environments. This page is not a calibrated color-management or professional
            color-measurement system.
          </p>
        </EducationalDisclaimerCard>
      </section>
    </main>
  )
}
