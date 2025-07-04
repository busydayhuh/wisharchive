export function copyUrl() {
  navigator.clipboard
    .writeText(window.location.href)
    .then(() => alert("URL copied to clipboard!"))
    .catch((err) => console.error("Error copying URL: ", err));
}
