import { ROUTES } from "@/shared/model/routes";
import { useCurrentUser } from "@/shared/model/user/useCurrentUser";
import DefaultLoader from "@/shared/ui/DefaultLoader";
import { ErrorMessage } from "@/shared/ui/ErrorMessage";
import { href, useNavigate } from "react-router";
import { ProfilePageLayout } from "./ProfilePageLayout";

function ProfilePage() {
  const { user, isLoading, error, mutateUser } = useCurrentUser();
  const navigate = useNavigate();

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
    return <ProfilePageLayout profileInfo={user} mutateUser={mutateUser} />;
}
export const Component = ProfilePage;
