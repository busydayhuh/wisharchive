export function formatUrl(url: string) {
  const match = url.match(
    /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\\/\n\\?\\=]+)/g
  );
  if (match) {
    return match[0].replace(/^https?:\/\/(www\.)?/, "");
  }
  //return url.replace(/^https?:\/\/(www\.)?/, "");
}
