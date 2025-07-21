export function formatUrl(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "");
}
