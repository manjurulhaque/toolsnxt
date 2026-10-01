export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "Manjurul"
export const SITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_DOMAIN || "manjurul.com"
export const SITE_CONTACT_EMAIL =
  process.env.NEXT_PUBLIC_SITE_CONTACT_EMAIL || "contact@manjurul.com"
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || `https://${SITE_DOMAIN}`
).replace(/\/$/, "")
export const SITE_TAGLINE =
  process.env.NEXT_PUBLIC_SITE_TAGLINE || "Fast browser utilities"
export const SITE_TITLE = `${SITE_NAME} | ${SITE_TAGLINE}`
export const SITE_DESCRIPTION =
  process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
  "A compact collection of practical calculators, converters, generators, and browser utilities."
export const LEGAL_EFFECTIVE_DATE = "July 2, 2026"

