export async function copyLink(link: string) {
  try {
    await navigator.clipboard.writeText(link);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}
