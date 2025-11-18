import { useCallback } from "react";
import { useSWRConfig } from "swr";

export function useRevalidationByKeyword() {
  const { cache, mutate } = useSWRConfig();

  const revalidateByKeyword = useCallback(
    async (keyword: string) => {
      const tasks = [];
      for (const key of cache.keys()) {
        if (key.includes(keyword)) tasks.push(mutate(key));
      }
      await Promise.all(tasks);
    },
    [cache, mutate]
  );

  return { revalidateByKeyword };
}
