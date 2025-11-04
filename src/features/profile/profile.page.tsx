import { useCurrentUser } from "@/shared/model/user/useCurrentUser";
import { ProfilePageLayout } from "./ProfilePageLayout";

function ProfilePage() {
  const { user, isLoading, error, mutateUser } = useCurrentUser();

  if (error) return <div>Ошибка</div>;
  if (isLoading) return <>"Загрузка..."</>;
  if (user)
    return <ProfilePageLayout profileInfo={user} mutateUser={mutateUser} />;
}
export const Component = ProfilePage;
