import type { Models } from "appwrite";
import { mutate } from "swr";

type OptimisticUpdater = (prev: Models.Document[]) => Models.Document[];
type ServerAction = () => Promise<Models.Document | void>;

export async function performMutation(
  updater: OptimisticUpdater,
  action: ServerAction,
  keyword: string, // для массива всех документов (dashboard view)
  extraKeys: string[] = [] // для страниц отдельных документов (document page)
) {
  try {
    mutate(
      (key) => Array.isArray(key) && key[0] === keyword,
      (prev?: Models.Document[]) => updater(prev ?? []),
      {
        rollbackOnError: true,
        revalidate: false,
      }
    );

    extraKeys.forEach((key) => {
      mutate(
        key,
        // если кэш по одиночному key есть, то обновляем его, если нет — оставляем undefined
        (prev?: Models.Document) => (prev ? updater([prev])[0] : prev),
        {
          rollbackOnError: true,
          revalidate: true,
        }
      );
    });

    return await action();
  } catch {
    console.log("Ошибка мутации");

    // запрашиваем актуальные данные для отката
    mutate((key) => Array.isArray(key) && key[0] === keyword);
    extraKeys.forEach((key) => mutate(key));
  }
}
