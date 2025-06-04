import { Button } from "@/shared/ui/kit/button";
import { Link } from "react-router";
import AuthLayout from "./ui/AuthLayout";
import RegisterForm from "./ui/RegisterForm";

function SignupPage() {
  return (
    <AuthLayout
      title="Регистрация Wisharchive"
      description="Создайте аккаунт и сохраняйте свои желания ✨"
      form={<RegisterForm />}
      footerText={
        <>
          <p>Уже зарегистрированы?</p>
          <Button variant="link">
            <Link to={"/login"}>Войти в аккаунт</Link>
          </Button>
        </>
      }
    />
  );
}

export const Component = SignupPage;
