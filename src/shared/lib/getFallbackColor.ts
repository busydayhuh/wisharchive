import { gradients } from "./gradients";

const fallbackColorCache = new Map();

export function getFallbackColor(wishId: string) {
  if (!fallbackColorCache.has(wishId)) {
    const random = Math.floor(Math.random() * gradients.length);
    const color = gradients[random];

    fallbackColorCache.set(wishId, color);
  }

  return fallbackColorCache.get(wishId);
}
