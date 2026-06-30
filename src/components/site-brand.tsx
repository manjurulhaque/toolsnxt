import { SITE_NAME, SITE_TAGLINE } from "@/lib/site"

type SiteBrandProps = {
  compact?: boolean
}

export function SiteBrand({ compact = false }: SiteBrandProps) {
  if (compact) {
    return <>{SITE_NAME}</>
  }

  return (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--ink-900)] text-sm font-semibold text-[var(--page-cream)]">
        {SITE_NAME.charAt(0)}
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold uppercase tracking-[0.18em]">
          {SITE_NAME}
        </span>
        <span className="block truncate text-xs text-[var(--ink-700)]">{SITE_TAGLINE}</span>
      </span>
    </>
  )
}
