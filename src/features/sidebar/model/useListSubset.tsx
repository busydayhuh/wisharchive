import { useUser } from "@/features/auth";
import db from "@/shared/model/databases";
import { Query, type Models } from "appwrite";
import { useEffect, useState } from "react";

function useListSubset() {
  const { current } = useUser();

  const [isPending, setIsPending] = useState(true);

  const [error, setError] = useState<null | {
    error: unknown;
    error_message: string;
  }>(null);

  const [documentsList, setDocumentsList] =
    useState<Models.DocumentList<Models.Document>>();

  async function getList() {
    try {
      const response = await db.wishlists.list([
        Query.equal("userId", current!.$id),
      ]);

      setDocumentsList(response);
    } catch (error) {
      setError({ error: error, error_message: "Не удалось загрузить списки" });
    } finally {
      setIsPending(false);
    }
  }

  useEffect(() => {
    getList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { error, isPending, documentsList };
}

export default useListSubset;
