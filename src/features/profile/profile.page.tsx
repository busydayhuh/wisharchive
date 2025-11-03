import { useCurrentUser } from "@/shared/model/user/useCurrentUser";
import { ProfilePageLayout } from "./ProfilePageLayout";

function ProfilePage() {
  const { user, isLoading, error } = useCurrentUser();

  if (error) return <div>Ошибка</div>;
  if (isLoading) return <>"Загрузка..."</>;
  if (user) return <ProfilePageLayout profileInfo={user} />;
}
export const Component = ProfilePage;
