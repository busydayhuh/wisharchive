import { useCallback } from "react";
import { useSWRConfig } from "swr";

export function useRevalidateSWR() {
  const { cache, mutate } = useSWRConfig();

  const revalidate = useCallback(
    async (keyword: string) => {
      const tasks = [];
      for (const key of cache.keys()) {
        if (key.includes(keyword))
          tasks.push(mutate(key, undefined, { revalidate: true }));
      }
      await Promise.all(tasks);
    },
    [cache, mutate]
  );

  return { revalidate };
}
