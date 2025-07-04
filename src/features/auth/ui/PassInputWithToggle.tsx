import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import type { ControllerRenderProps } from "react-hook-form";

export default function PassWithToggle(props: ControllerRenderProps) {
  const [passVisible, setPassVisible] = useState(false);
  return (
    <div className="flex relative">
      <Input
        placeholder="**************"
        type={passVisible ? "text" : "password"}
        {...props}
      />
      <Button
        type="button"
        className="absolute right-1 top-1.5 text-muted-foreground hover:bg-transparent"
        variant="ghost"
        onClick={() => setPassVisible((prev) => !prev)}
      >
        {passVisible ? <EyeClosed /> : <Eye />}
      </Button>
    </div>
  );
}
