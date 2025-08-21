import { FormLabel } from "@/shared/ui/kit/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/kit/select";
import { useCollaboratorsContext } from "../../model/CollaboratorsContext";

export default function RoleSelect({
  isPrivateChecked,
}: {
  isPrivateChecked: boolean;
}) {
  const { selectedRole, setSelectedRole } = useCollaboratorsContext();
  return (
    <div className="space-y-3">
      <FormLabel>Пригласить соавтора в роли</FormLabel>
      <Select value={selectedRole} onValueChange={setSelectedRole}>
        <SelectTrigger className="bg-transparent rounded-xl w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-xl outline-1 outline-ring overflow-clip">
          <SelectItem
            value="readers"
            className="rounded-[0.5rem]"
            disabled={!isPrivateChecked}
          >
            Читателя (только для приватных списков)
          </SelectItem>
          <SelectItem value="editors" className="rounded-[0.5rem]">
            Редактора
          </SelectItem>
        </SelectContent>
      </Select>
      <div className="px-2 text-muted-foreground text-xs md:text-sm leading-tight">
        {selectedRole === "readers"
          ? "Читатели могут просматривать приватный список и желания в нем"
          : "Редакторы могут добавлять, изменять и удалять желания в списке"}
      </div>
    </div>
  );
}
