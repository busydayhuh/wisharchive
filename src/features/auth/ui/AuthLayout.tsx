import GradientBg from "@/shared/ui/GradientBg";
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
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full h-screen">
        <div className="flex justify-center items-center bg-background">
          <Card className="bg-background shadow-none border-0 w-full max-w-xl">
            <CardHeader>
              <CardTitle className="font-bold text-2xl lg:text-3xl">
                {title}
              </CardTitle>
              <CardDescription className="text-sm">
                {description}
              </CardDescription>
            </CardHeader>
            <CardContent>{form}</CardContent>
            <CardFooter>
              <div className="flex items-baseline mt-20 [&_button]:px-2 text-sm">
                {footerText}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </GradientBg>
  );
}

export default AuthLayout;
