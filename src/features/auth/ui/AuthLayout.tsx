import GradientBg from "@/shared/ui/gradientBg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/kit/card";
import type { ReactNode } from "react";

function AuthLayout({
  title,
  description,
  form,
  footerText,
}: {
  title: ReactNode;
  description: ReactNode;
  form: ReactNode;
  footerText: ReactNode;
}) {
  return (
    <GradientBg>
      <div className="w-full lg:max-w-1/2 h-dvh flex flex-col items-center bg-card">
        <Card className="w-[95%] max-w-lg mx-auto mt-50 shadow-none">
          <CardHeader>
            <CardTitle className="uppercase text-2xl font-bold ">
              {title}
            </CardTitle>
            <CardDescription className="text-base">
              {description}
            </CardDescription>
          </CardHeader>
          <CardContent>{form}</CardContent>
          <CardFooter>
            <div className="flex items-baseline mt-20 [&_button]:text-base [&_button]:px-2 ">
              {footerText}
            </div>
          </CardFooter>
        </Card>
      </div>
    </GradientBg>
  );
}

export default AuthLayout;
