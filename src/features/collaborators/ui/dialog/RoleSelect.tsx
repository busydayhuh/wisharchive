import { ResponsiveSelect } from "@/shared/ui/ResponsiveSelect";
import { Eye, Pencil } from "lucide-react";
import { useCollabManager } from "../../model/store/collab-manager/useCollabManager";

export default function RoleSelect({
  isPrivateChecked,
}: {
  isPrivateChecked: boolean;
}) {
  const { selectedRole, setSelectedRole } = useCollabManager();
  const options = [
    { value: "editors", label: "Редактора", icon: <Pencil /> },
    {
      value: "readers",
      label: "Читателя (только для приватных списков)",
      disabled: !isPrivateChecked,
      icon: <Eye />,
    },
  ];

  return (
    <div className="space-y-3">
      <p className="inline-block mb-2 font-medium text-muted-foreground text-sm">
        Пригласить соавтора в роли
      </p>
      <ResponsiveSelect
        selectedValue={selectedRole}
        onSelect={setSelectedRole as (role: string) => void}
        options={options}
        triggerClassName="py-6 w-full md:text-sm"
      />
      <div className="px-2 text-muted-foreground text-xs leading-tight">
        {selectedRole === "readers"
          ? "Читатели могут просматривать приватный список и желания в нем"
          : "Редакторы могут добавлять, изменять и удалять желания в списке"}
      </div>
    </div>
  );
}
