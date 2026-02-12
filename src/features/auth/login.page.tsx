import { Button } from "@/shared/ui/kit/button";
import { Link } from "react-router-dom";
import AuthLayout from "./ui/AuthLayout";
import LoginForm from "./ui/LoginForm";

function LoginPage() {
  return (
    <AuthLayout
      title="Вход в Wish archive"
      description={
        <>
          <p>Войдите в аккаунт, чтобы сохранить свои желания ✨</p>
        </>
      }
      form={<LoginForm />}
      footerText={
        <>
          <p>Ещё нет аккаунта?</p>
          <Button variant="link">
            <Link to={"/signup"}>Зарегистрироваться</Link>
          </Button>
        </>
      }
    />
  );
}

export const Component = LoginPage;
