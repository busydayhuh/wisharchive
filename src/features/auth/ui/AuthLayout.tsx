import { GradientCircle, useParallax } from "@/features/home";
import { ParallaxContainer } from "@/features/home/";
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
  footerText?: ReactNode;
}) {
  const { ref, onPointerMove, mouseX, mouseY } = useParallax();

  return (
    <div className="items-stretch grid grid-cols-1 lg:grid-cols-2 w-full h-screen">
      <div className="flex justify-center items-center bg-background">
        <Card className="bg-background shadow-none border-0 w-full max-w-xl">
          <CardHeader className="space-y-1.5">
            <CardTitle className="font-headers font-bold text-2xl lg:text-4xl">
              {title}
            </CardTitle>
            <CardDescription className="text-sm">{description}</CardDescription>
          </CardHeader>
          <CardContent>{form}</CardContent>
          {footerText && (
            <CardFooter>
              <div className="flex items-baseline mt-5 lg:mt-20 [&_button]:px-2 text-sm">
                {footerText}
              </div>
            </CardFooter>
          )}
        </Card>
      </div>

      <div
        ref={ref}
        onPointerMove={onPointerMove}
        className="hidden lg:block relative"
      >
        <ParallaxContainer variant="side" mouseX={mouseX} mouseY={mouseY} />
        <GradientCircle className="top-1/2 left-1/2 -z-10 absolute w-full -translate-1/2" />
      </div>
    </div>
  );
}

export default AuthLayout;
