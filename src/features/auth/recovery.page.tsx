import AuthLayout from "./ui/AuthLayout";
import { RecoverPassForm } from "./ui/RecoverPassForm";

function RecoveryPage() {
  return (
    <AuthLayout
      title="Восстановление пароля"
      description="Придумайте новый пароль для восстановления доступа к аккаунту"
      form={<RecoverPassForm />}
    />
  );
}

export const Component = RecoveryPage;
