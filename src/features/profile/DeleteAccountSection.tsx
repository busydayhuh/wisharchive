import { Button } from "@/shared/ui/kit/button";
import { Checkbox } from "@/shared/ui/kit/checkbox";
import { Label } from "@/shared/ui/kit/label";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import useProfileMutations from "./model/useProfileMutations";

function DeleteAccountSection() {
  const { deleteProfile } = useProfileMutations();
  const [confirmation, setConfirmation] = useState(false);

  return (
    <div className="flex flex-col gap-4 md:gap-6 mx-auto px-2 md:px-0 lg:max-w-3xl max-w-4xl">
      <p className="font-semibold text-xl lg:text-2xl">Удаление профиля</p>
      <div className="flex items-start gap-3">
        <Checkbox
          id="toggle"
          checked={confirmation}
          onCheckedChange={(checked: boolean) => setConfirmation(checked)}
        />
        <Label htmlFor="toggle">
          Я абсолютно уверен, что хочу удалить свой профиль и все его данные
        </Label>
      </div>
      <Button
        variant="destructive"
        disabled={!confirmation}
        onClick={deleteProfile}
        className="w-fit h-14"
      >
        <Trash2 />
        Удалить профиль
      </Button>
    </div>
  );
}

export default DeleteAccountSection;
