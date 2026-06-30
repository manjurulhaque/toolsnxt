export async function copyToClipboard(value: string) {
  await navigator.clipboard.writeText(value)
}

export function downloadBlob(blob: Blob, fileName: string) {
  const downloadUrl = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = downloadUrl
  link.download = fileName
  link.click()
  URL.revokeObjectURL(downloadUrl)
}

export function downloadTextFile(value: string, fileName: string, type = "text/plain;charset=utf-8") {
  downloadBlob(new Blob([value], { type }), fileName)
}

export function getTextStats(value: string) {
  const trimmedValue = value.trim()

  return {
    characters: value.length,
    lines: trimmedValue ? value.split(/\r\n|\r|\n/).length : 0,
    bytes: new Blob([value]).size,
  }
}
