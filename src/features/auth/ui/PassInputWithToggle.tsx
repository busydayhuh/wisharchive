import { Button } from "@/shared/ui/kit/button";
import { Input } from "@/shared/ui/kit/input";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";
import type { FormValues } from "../model/userContext";

type PassPath = "password" | "confirmPassword";

type PassWithToggleProps<Q extends FieldValues, P extends Path<Q>> = {
  field: ControllerRenderProps<Q, P>;
};

export default function PassWithToggle({
  field,
}: PassWithToggleProps<FormValues["register"], PassPath>) {
  const [passVisible, setPassVisible] = useState(false);
  return (
    <div className="flex relative">
      <Input
        placeholder="**************"
        type={passVisible ? "text" : "password"}
        {...field}
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
