import type { Models } from "appwrite";
import { useCallback } from "react";
import { useSWRConfig } from "swr";
import { sortBySequence } from "../lib/sortBySequence";
import type { OptimisticUpdater } from "./useOptimisticMutation";

type SWRCacheData =
  | Models.Document
  | Models.Document[]
  | Models.Document[][]
  | undefined;

export function useUpdateSWRCache() {
  const { cache, mutate } = useSWRConfig();

  const updateSWRCache = useCallback(
    (keyword: string, updater?: OptimisticUpdater) => {
      for (const key of cache.keys()) {
        if (!key.includes(keyword)) continue;

        console.log("key includes:>> ", key, keyword);
        mutate(
          key,
          //нет апдейтера — кэш ревалидируется через новый запрос к API
          updater
            ? (prev: SWRCacheData) => {
                if (!prev) return prev;
                // Страницы ([][])
                if (Array.isArray(prev) && Array.isArray(prev[0]))
                  return (prev as Models.Document[][]).map((page) =>
                    updater(page)
                  );
                // Один массив ([])
                if (Array.isArray(prev))
                  return updater(prev as Models.Document[]);
                // Один документ
                return updater([prev])[0];
              }
            : undefined,
          {
            rollbackOnError: true,
            revalidate: updater ? false : true,
          }
        );
      }
    },
    [cache, mutate]
  );

  const addToCacheList = useCallback(
    (prev: Models.Document[], updatedElement: Models.Document) =>
      sortBySequence([updatedElement, ...prev]),
    []
  );

  const removeFromCacheList = useCallback(
    (prev: Models.Document[], id: string) =>
      prev.filter(({ $id }) => $id !== id),
    []
  );

  return { updateSWRCache, addToCacheList, removeFromCacheList };
}
