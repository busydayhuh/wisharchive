import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";

type PassWithToggleProps = ControllerRenderProps & { className?: string };

export function PassWithToggle(props: PassWithToggleProps) {
  const [passVisible, setPassVisible] = useState(false);
  return (
    <div className="relative">
      <Input
        placeholder="**************"
        type={passVisible ? "text" : "password"}
        {...props}
      />
      <Button
        type="button"
        className="top-[50%] right-1 absolute hover:bg-transparent text-muted-foreground translate-y-[-50%]"
        variant="ghost"
        onClick={() => setPassVisible((prev) => !prev)}
      >
        {passVisible ? <EyeClosed /> : <Eye />}
      </Button>
    </div>
  );
}
