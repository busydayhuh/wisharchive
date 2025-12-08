import type { Models } from "appwrite";

export function sortBySequence(array: Array<Models.Document>) {
  return array.sort((a, b) => b.$sequence - a.$sequence);
}
