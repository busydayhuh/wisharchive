import { useUpdateSWRCache } from "@/shared/hooks/useUpdateSWRCache";
import { useCurrentUser } from "@/shared/hooks/user/useCurrentUser";
import DefaultLoader from "@/shared/ui/components/DefaultLoader";
import { ErrorMessage } from "@/shared/ui/components/ErrorMessage";
import { useCallback } from "react";
import { ProfilePageLayout } from "./ui/ProfilePageLayout";

export type UpdateUserCache = (
  userDocId: string,
  updatedFields: Record<string, unknown>
) => void;

function ProfilePage() {
  const { user, isLoading, error, mutateUser } = useCurrentUser();
  const { updateSWRCache } = useUpdateSWRCache();

  const updateUserCache: UpdateUserCache = useCallback(
    (userDocId, updatedFields) => {
      mutateUser();
      updateSWRCache("users", (prev) =>
        prev.map((userDoc) =>
          userDoc.$id === userDocId ? { ...userDoc, ...updatedFields } : userDoc
        )
      );
    },
    [mutateUser, updateSWRCache]
  );

  if (error) return <ErrorMessage variant="default" />;
  if (isLoading) return <DefaultLoader />;
  if (user)
    return (
      <ProfilePageLayout profileInfo={user} updateUserCache={updateUserCache} />
    );
}
export const Component = ProfilePage;
