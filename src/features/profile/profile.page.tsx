import { ROUTES } from "@/shared/model/routes";
import { useCurrentUser } from "@/shared/model/user/useCurrentUser";
import { useUpdateSWRCache } from "@/shared/model/useUpdateSWRCache";
import DefaultLoader from "@/shared/ui/DefaultLoader";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { useCallback } from "react";
import { href, useNavigate } from "react-router";
import { ProfilePageLayout } from "./ProfilePageLayout";

export type UpdateUserCache = (
  userDocId: string,
  updatedFields: Record<string, unknown>
) => void;

function ProfilePage() {
  const { user, isLoading, error, mutateUser } = useCurrentUser();
  const { updateSWRCache } = useUpdateSWRCache();
  const navigate = useNavigate();

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

  if (error)
    return (
      <ErrorMessage
        variant="default-error"
        message="Что-то пошло не так"
        description="Не удалось загрузить страницу, повторите попытку позже"
        withButton={Boolean(user)}
        buttonText="К моим желаниям"
        action={() => navigate(href(ROUTES.WISHES, { userId: user!.userId }))}
      />
    );

  if (isLoading) return <DefaultLoader />;
  if (user)
    return (
      <ProfilePageLayout profileInfo={user} updateUserCache={updateUserCache} />
    );
}
export const Component = ProfilePage;
