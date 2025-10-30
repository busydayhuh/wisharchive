import { darkGradients, gradients } from "./gradients";

const fallbackColorCache = new Map();

export function getFallbackColor(wishId: string, options?: { dark: boolean }) {
  if (!fallbackColorCache.has(wishId)) {
    const random = Math.floor(Math.random() * gradients.length);
    const color = options?.dark ? darkGradients[random] : gradients[random];

    fallbackColorCache.set(wishId, color);
  }

  return fallbackColorCache.get(wishId);
}
