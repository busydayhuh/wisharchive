import type { Models } from "appwrite";

export function sortBySequence(array: Array<Models.Document>) {
  return array.sort((a, b) => a.$sequence - b.$sequence);
}
