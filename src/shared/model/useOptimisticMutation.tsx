import type { Models } from "appwrite";
import { useCallback } from "react";
import { useSWRConfig, type Cache, type ScopedMutator } from "swr";

export type OptimisticUpdater = (prev: Models.Document[]) => Models.Document[];
type ServerAction = () => Promise<Models.Document | void>;

type SWRCacheData =
  | Models.Document
  | Models.Document[]
  | Models.Document[][]
  | undefined;

type PerformMutationParams = {
  updater: OptimisticUpdater;
  action: ServerAction;
  keyword: string;
  extraKeys?: string[];
};

export function useOptimisticMutation() {
  const { mutate, cache } = useSWRConfig();

  const performMutation = useCallback(
    async (params: PerformMutationParams) => {
      try {
        // обновляем кеш по основному ключу
        applyToKeywordCaches(cache, mutate, params.keyword, params.updater, {
          rollbackOnError: true,
          revalidate: false,
        });
        // обновляем кеш по доп. ключам, если есть (ключи одиночных документов)
        applyToExtraKeysCaches(mutate, params.updater, params.extraKeys);
        // основное действие с API
        return await params.action();
      } catch (error) {
        console.log("Ошибка мутации", error);

        // запрашиваем актуальные данные для отката
        applyToKeywordCaches(cache, mutate, params.keyword);
        params.extraKeys?.forEach((key) => mutate(key));
        // выбрасываем ошибку наверх
        throw error;
      }
    },
    [cache, mutate]
  );

  return { performMutation };
}

function applyToKeywordCaches(
  cache: Cache,
  mutate: ScopedMutator,
  keyword: string,
  updater?: OptimisticUpdater,
  options?: { rollbackOnError?: boolean; revalidate?: boolean }
) {
  for (const key of cache.keys()) {
    if (!key.includes(keyword)) continue;

    mutate(
      key,
      updater
        ? (prev: SWRCacheData) => {
            if (!prev) return prev;

            // Страницы ([][])
            if (Array.isArray(prev) && Array.isArray(prev[0]))
              return (prev as Models.Document[][]).map((page) => updater(page));

            // Один массив ([])
            if (Array.isArray(prev)) return updater(prev as Models.Document[]);

            // Один документ
            return updater([prev])[0];
          }
        : undefined,
      options
    );
  }
}

function applyToExtraKeysCaches(
  mutate: ScopedMutator,
  updater: OptimisticUpdater,
  extraKeys: string[] = []
) {
  for (const key of extraKeys) {
    mutate(
      key,
      (prev?: Models.Document) => (prev ? updater([prev])[0] : prev),
      {
        rollbackOnError: true,
        revalidate: true,
      }
    );
  }
}
