import db from "@/shared/model/databases";
import type { TError } from "@/shared/model/errorMessages";
import { Query, type Models } from "appwrite";
import { useEffect, useState } from "react";

type User = Models.Document | null;

export type FoundUser = {
  user: User;
  isPending: boolean;
  error: TError | null;
};

function useFindUser(userId?: string) {
  const [user, setUser] = useState<User>(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<TError | null>(null);

  useEffect(() => {
    async function findUser() {
      if (!userId) return;

      try {
        const response = await db.users.list([Query.equal("userId", userId)]);

        if (response.documents.length > 0) {
          setUser(response.documents[0]);
        }
      } catch (error) {
        setError({ error: error, error_message: "Пользователь не найден" });
      } finally {
        setIsPending(false);
      }
    }

    findUser();
  }, [userId]);

  return { user, isPending, error };
}

export default useFindUser;
