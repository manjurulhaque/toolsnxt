"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

type JwtPart = Record<string, unknown>

type DecodeResult = {
  header: JwtPart | null
  payload: JwtPart | null
  signature: string
  error: string | null
}

const sampleJwt =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkphbmUgRG9lIiwiaWF0IjoxNzE0NTI5NjAwLCJleHAiOjQxMDI0NDQ4MDB9.J9dGt1B3Ova9kNjr8qC4CnVMHzd0pHvHnLSG-u4mGdA"

export default function JwtDecoderPage() {
  const [token, setToken] = useState(sampleJwt)
  const [message, setMessage] = useState("Paste a JWT to decode its header and payload locally.")

  const decoded = useMemo(() => decodeJwt(token), [token])
  const timing = useMemo(() => getTimingClaims(decoded.payload), [decoded.payload])
  const tokenParts = useMemo(() => token.trim().split("."), [token])

  async function copyValue(value: string, label: string) {
    if (!value.trim()) {
      setMessage(`No ${label} to copy.`)
      return
    }

    try {
      await navigator.clipboard.writeText(value)
      setMessage(`${label} copied.`)
    } catch {
      setMessage("Copy failed. Select the text and copy it manually.")
    }
  }

  function clearAll() {
    setToken("")
    setMessage("Workspace cleared.")
  }

  function loadSample() {
    setToken(sampleJwt)
    setMessage("Sample JWT loaded.")
  }

  const headerJson = decoded.header ? stringifyJson(decoded.header) : ""
  const payloadJson = decoded.payload ? stringifyJson(decoded.payload) : ""

  return (
    <main className="min-h-screen bg-[var(--page-cream)] text-[var(--ink-900)]">
      <header className="border-b border-[var(--ink-900)]/10 bg-white/70">
        <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link href="/" className="text-sm font-semibold uppercase tracking-[0.18em]">
            Web Tools
          </Link>
          <Link
            href="/"
            className="rounded-full border border-[var(--ink-900)]/10 bg-white px-4 py-2 text-sm font-medium text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
          >
            Home
          </Link>
        </nav>
      </header>

      <section className="mx-auto grid max-w-6xl gap-6 px-5 py-8 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:py-12">
        <div className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
            Developer tool
          </p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">JWT Decoder</h1>
          <p className="mt-4 text-sm leading-7 text-[var(--ink-700)]">
            Decode a JSON Web Token header and payload in your browser. This tool does not verify
            signatures or contact any server.
          </p>

          <label htmlFor="jwt-input" className="mt-6 block text-sm font-medium">
            Token
          </label>
          <textarea
            id="jwt-input"
            value={token}
            onChange={(event) => {
              setToken(event.target.value)
              setMessage("Token updated.")
            }}
            rows={12}
            spellCheck={false}
            className="mt-2 w-full resize-y rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] px-4 py-3 font-mono text-sm leading-7 outline-none transition focus:border-[var(--accent-rust)]"
            placeholder="Paste header.payload.signature..."
          />

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <Stat label="Parts" value={token.trim() ? tokenParts.length : 0} />
            <Stat label="Characters" value={token.length} />
            <Stat label="Signature" value={decoded.signature ? "Yes" : "No"} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={clearAll}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={loadSample}
              className="rounded-full border border-[var(--ink-900)]/10 bg-white px-5 py-3 text-sm font-semibold text-[var(--ink-800)] transition hover:border-[var(--ink-900)]/25"
            >
              Load Sample
            </button>
          </div>

          <div
            className={`mt-6 rounded-[1.2rem] border px-4 py-3 text-sm ${
              decoded.error
                ? "border-red-100 bg-red-50 text-red-700"
                : "border-[var(--ink-900)]/8 bg-[var(--page-cream)] text-[var(--ink-700)]"
            }`}
          >
            {decoded.error ?? message}
          </div>
        </div>

        <div className="space-y-6">
          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Claims
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Token Summary</h2>
              </div>
              <p className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] ${getStatusClass(timing.status)}`}>
                {timing.label}
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Claim label="Algorithm" value={getClaim(decoded.header, "alg")} />
              <Claim label="Type" value={getClaim(decoded.header, "typ")} />
              <Claim label="Issuer" value={getClaim(decoded.payload, "iss")} />
              <Claim label="Subject" value={getClaim(decoded.payload, "sub")} />
              <Claim label="Audience" value={getClaim(decoded.payload, "aud")} />
              <Claim label="Issued At" value={formatJwtDate(getNumericClaim(decoded.payload, "iat"))} />
              <Claim label="Not Before" value={formatJwtDate(getNumericClaim(decoded.payload, "nbf"))} />
              <Claim label="Expires" value={formatJwtDate(getNumericClaim(decoded.payload, "exp"))} />
            </div>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Decoded JSON
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Header</h2>
              </div>
              <button
                type="button"
                onClick={() => copyValue(headerJson, "Header JSON")}
                className="rounded-full bg-[var(--ink-900)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
              >
                Copy
              </button>
            </div>
            <pre className="mt-4 max-h-72 overflow-auto rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] p-4 text-sm leading-7">
              <code>{headerJson || "Header JSON will appear here."}</code>
            </pre>
          </section>

          <section className="rounded-[1.75rem] border border-[var(--ink-900)]/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,37,41,0.08)]">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--accent-rust)]">
                  Decoded JSON
                </p>
                <h2 className="mt-2 text-2xl font-semibold">Payload</h2>
              </div>
              <button
                type="button"
                onClick={() => copyValue(payloadJson, "Payload JSON")}
                className="rounded-full bg-[var(--ink-900)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--ink-800)]"
              >
                Copy
              </button>
            </div>
            <pre className="mt-4 max-h-96 overflow-auto rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] p-4 text-sm leading-7">
              <code>{payloadJson || "Payload JSON will appear here."}</code>
            </pre>
          </section>
        </div>
      </section>
    </main>
  )
}

function decodeJwt(value: string): DecodeResult {
  const token = value.trim()
  if (!token) {
    return { header: null, payload: null, signature: "", error: null }
  }

  const parts = token.split(".")
  if (parts.length !== 3) {
    return {
      header: null,
      payload: null,
      signature: "",
      error: "A JWT should contain three dot-separated parts.",
    }
  }

  try {
    return {
      header: JSON.parse(decodeBase64Url(parts[0])) as JwtPart,
      payload: JSON.parse(decodeBase64Url(parts[1])) as JwtPart,
      signature: parts[2],
      error: null,
    }
  } catch (error) {
    return {
      header: null,
      payload: null,
      signature: parts[2] ?? "",
      error: error instanceof Error ? error.message : "Could not decode this JWT.",
    }
  }
}

function decodeBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/")
  const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=")
  const binary = atob(padded)
  const bytes = new Uint8Array(binary.length)

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index)
  }

  return new TextDecoder().decode(bytes)
}

function getTimingClaims(payload: JwtPart | null) {
  const now = Date.now() / 1000
  const exp = getNumericClaim(payload, "exp")
  const nbf = getNumericClaim(payload, "nbf")

  if (exp !== null && exp < now) {
    return { status: "expired", label: "Expired" }
  }

  if (nbf !== null && nbf > now) {
    return { status: "pending", label: "Not active" }
  }

  if (exp !== null) {
    return { status: "active", label: "Not expired" }
  }

  return { status: "unknown", label: "No expiry" }
}

function getClaim(source: JwtPart | null, key: string) {
  if (!source || !(key in source)) {
    return "-"
  }

  const value = source[key]
  if (Array.isArray(value)) {
    return value.map(String).join(", ")
  }

  if (typeof value === "object" && value !== null) {
    return JSON.stringify(value)
  }

  return String(value)
}

function getNumericClaim(source: JwtPart | null, key: string) {
  if (!source || typeof source[key] !== "number") {
    return null
  }

  return source[key]
}

function formatJwtDate(value: number | null) {
  if (value === null) {
    return "-"
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "medium",
  }).format(new Date(value * 1000))
}

function stringifyJson(value: JwtPart) {
  return JSON.stringify(value, null, 2)
}

function getStatusClass(status: string) {
  if (status === "expired") {
    return "bg-red-50 text-red-700"
  }

  if (status === "pending") {
    return "bg-amber-50 text-amber-700"
  }

  if (status === "active") {
    return "bg-emerald-50 text-emerald-700"
  }

  return "bg-[var(--page-cream)] text-[var(--ink-700)]"
}

function Claim({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-700)]/72">{label}</p>
      <p className="mt-2 break-words text-sm font-semibold leading-6">{value}</p>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-[1.2rem] border border-[var(--ink-900)]/8 bg-[var(--page-cream)] p-4">
      <p className="text-[11px] uppercase tracking-[0.16em] text-[var(--ink-700)]/72">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  )
}
