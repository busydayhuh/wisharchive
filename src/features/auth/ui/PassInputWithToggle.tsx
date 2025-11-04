import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";

export function PassWithToggle(props: ControllerRenderProps) {
  const [passVisible, setPassVisible] = useState(false);
  return (
    <div className="relative flex overflow-hidden">
      <Input
        placeholder="**************"
        type={passVisible ? "text" : "password"}
        {...props}
      />
      <Button
        type="button"
        className="top-1.5 right-1 absolute hover:bg-transparent text-muted-foreground"
        variant="ghost"
        onClick={() => setPassVisible((prev) => !prev)}
      >
        {passVisible ? <EyeClosed /> : <Eye />}
      </Button>
    </div>
  );
}
