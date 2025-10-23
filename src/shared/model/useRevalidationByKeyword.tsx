import { useCallback } from "react";
import { useSWRConfig } from "swr";

export function useRevalidationByKeyword() {
  const { cache, mutate } = useSWRConfig();

  const revalidateByKeyword = useCallback(
    (keyword: string) => {
      for (const key of cache.keys()) {
        if (key.includes(keyword)) mutate(key);
      }
    },
    [cache, mutate]
  );

  return { revalidateByKeyword };
}
