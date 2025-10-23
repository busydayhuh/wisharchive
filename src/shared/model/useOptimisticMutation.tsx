import type { Models } from "appwrite";
import { useCallback } from "react";
import { useSWRConfig } from "swr";

type OptimisticUpdater = (prev: Models.Document[]) => Models.Document[];
type ServerAction = () => Promise<Models.Document | void>;

type SWRCacheData =
  | Models.Document
  | Models.Document[]
  | Models.Document[][]
  | undefined;

export function useOptimisticMutation() {
  const { mutate, cache } = useSWRConfig();

  const performMutation = useCallback(
    async (
      updater: OptimisticUpdater,
      action: ServerAction,
      keyword: string, // для массива всех документов (dashboard view)
      extraKeys: string[] = []
    ) => {
      const updateCache = (
        updater?: OptimisticUpdater,
        options?: { rollbackOnError?: boolean; revalidate?: boolean }
      ) => {
        for (const key of cache.keys()) {
          if (key.includes(keyword)) {
            mutate(
              key,
              updater
                ? (prev: SWRCacheData) => {
                    if (!prev) return prev;

                    // массив страниц ([][])
                    if (Array.isArray(prev) && Array.isArray(prev[0])) {
                      return (prev as Models.Document[][]).map((page) =>
                        updater(page)
                      );
                    }

                    // один массив ([])
                    if (Array.isArray(prev)) {
                      return updater(prev as Models.Document[]);
                    }

                    // документ
                    return updater([prev])[0];
                  }
                : undefined,
              options
            );
          }
        }
      };

      try {
        updateCache(updater, { rollbackOnError: true, revalidate: false });

        // если кэш по одиночному extra key есть, то обновляем его, если нет — оставляем undefined

        extraKeys.forEach((key) => {
          mutate(
            key,
            (prev?: Models.Document) => (prev ? updater([prev])[0] : prev),
            {
              rollbackOnError: true,
              revalidate: true,
            }
          );
        });

        const actionResult = await action();

        // при успехе refetch из appwrite
        //updateCache();

        return actionResult;
      } catch (error) {
        console.log("Ошибка мутации", error);

        // запрашиваем актуальные данные для отката
        updateCache();

        extraKeys.forEach((key) => mutate(key));
      }
    },
    [cache, mutate]
  );

  return { performMutation };
}
