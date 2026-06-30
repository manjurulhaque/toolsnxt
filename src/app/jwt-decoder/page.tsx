"use client"

import { useMemo, useState } from "react"
import { TextAreaField } from "@/components/form-controls"
import {
  ActionButton,
  InfoBox,
  PanelHeader,
  PanelHeaderActions,
  SummaryTile,
  ToolIntro,
  ToolPage,
  ToolPanel,
} from "@/components/tool-page"
import { copyToClipboard } from "@/lib/browser-actions"

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
      await copyToClipboard(value)
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
    <ToolPage>
      <ToolPanel>
        <ToolIntro eyebrow="Developer tool" title="JWT Decoder">
            Decode a JSON Web Token header and payload in your browser. This tool does not verify
            signatures or contact any server.
        </ToolIntro>

          <div className="mt-6">
            <TextAreaField
              id="jwt-input"
              label="Token"
              value={token}
              onChange={(value) => {
                setToken(value)
                setMessage("Token updated.")
              }}
              rows={12}
              placeholder="Paste header.payload.signature..."
            />
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SummaryTile label="Parts" value={token.trim() ? tokenParts.length : 0} />
            <SummaryTile label="Characters" value={token.length} />
            <SummaryTile label="Signature" value={decoded.signature ? "Yes" : "No"} />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
            <ActionButton onClick={clearAll} variant="secondary">
              Clear
            </ActionButton>
            <ActionButton onClick={loadSample} variant="secondary">
              Load Sample
            </ActionButton>
          </div>

          <InfoBox className={decoded.error ? "mt-6 border-red-100 bg-red-50 text-red-700" : "mt-6 leading-normal"}>
            {decoded.error ?? message}
          </InfoBox>
      </ToolPanel>

        <div className="space-y-6">
          <ToolPanel>
            <PanelHeader
              eyebrow="Claims"
              title="Token Summary"
              badge={timing.label}
              badgeClassName={getStatusClass(timing.status)}
            />

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
          </ToolPanel>

          <ToolPanel>
            <PanelHeaderActions>
              <PanelHeader eyebrow="Decoded JSON" title="Header" />
              <ActionButton onClick={() => copyValue(headerJson, "Header JSON")} className="px-4 py-2">
                Copy
              </ActionButton>
            </PanelHeaderActions>
            <pre className="mt-4 max-h-72 overflow-auto rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] p-4 text-sm leading-7">
              <code>{headerJson || "Header JSON will appear here."}</code>
            </pre>
          </ToolPanel>

          <ToolPanel>
            <PanelHeaderActions>
              <PanelHeader eyebrow="Decoded JSON" title="Payload" />
              <ActionButton onClick={() => copyValue(payloadJson, "Payload JSON")} className="px-4 py-2">
                Copy
              </ActionButton>
            </PanelHeaderActions>
            <pre className="mt-4 max-h-96 overflow-auto rounded-[1.2rem] border border-[var(--ink-900)]/10 bg-[var(--page-cream)] p-4 text-sm leading-7">
              <code>{payloadJson || "Payload JSON will appear here."}</code>
            </pre>
          </ToolPanel>
        </div>
    </ToolPage>
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
