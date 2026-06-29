export function isValidUrl(url: string): boolean {
  return url.startsWith('http://') || url.startsWith('https://')
}
