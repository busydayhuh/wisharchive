import { mutate } from "swr";

export async function mutateByKeyword(keyword: string) {
  await mutate((key) => Array.isArray(key) && key[0] === keyword);
}
