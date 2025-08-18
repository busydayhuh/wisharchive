import { cn } from "@/shared/lib/css";
import type { Setter, UserDocumentType } from "@/shared/model/types";
import { useUsers } from "@/shared/model/user/useUsers";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/kit/avatar";
import { Button } from "@/shared/ui/kit/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/kit/dialog";
import { FormLabel } from "@/shared/ui/kit/form";
import { ScrollArea } from "@/shared/ui/kit/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/kit/select";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import Searchbar from "../../../shared/ui/Searchbar";
import { getRoleName } from "../model/getRoleName";
import { useWishlist } from "../model/useWishlist";
import { useWishlistRoles } from "../model/useWishlistRoles";

type CollaboratorsDialogProps = {
  wishlistId: string;
  isPrivateChecked?: boolean;
};

type Role = "editors" | "readers";
type RoleSelectProps = {
  role: Role;
  setRole: (role: Role) => void;
  isPrivateChecked: boolean;
};

export default function CollaboratorsDialog({
  wishlistId,
  isPrivateChecked = false,
}: CollaboratorsDialogProps) {
  const { wishlist, isLoading, error } = useWishlist(wishlistId);

  const [role, setRole] = useState<Role>("editors");
  const [searchString, setSearchString] = useState("");

  if (isLoading) return <div>Загрузка...</div>; // TODO скелетон
  if (error) {
    alert("Что-то пошло не так");
    return null;
  } // TODO тост ошибки

  if (wishlist)
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="bg-transparent rounded-full w-8 h-8"
          >
            <PlusIcon />
          </Button>
        </DialogTrigger>

        <DialogContent className="rounded-2xl sm:max-w-md">
          <DialogHeader className="mb-3">
            <DialogTitle>Изменить список соавторов</DialogTitle>
            <DialogDescription className="sr-only">
              Добавьте редакторов или читателей в список
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-6">
            <RoleSelect
              role={role}
              setRole={setRole}
              isPrivateChecked={isPrivateChecked}
            />

            <Search
              searchString={searchString}
              setSearchString={setSearchString}
            />

            <CollaboratorsList
              searchString={searchString}
              wishlistId={wishlist.$id}
              owner={wishlist.owner}
              collaborators={wishlist.collaborators}
            />
          </div>
          <DialogFooter className="sm:justify-start mt-6">
            <DialogClose asChild>
              <Button type="button" className="rounded-xl">
                Готово
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
}

function RoleSelect({ role, setRole, isPrivateChecked }: RoleSelectProps) {
  return (
    <div className="space-y-3">
      <FormLabel>Пригласить соавтора в роли</FormLabel>
      <Select value={role} onValueChange={setRole}>
        <SelectTrigger className="bg-transparent rounded-2xl w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-2xl outline-1 outline-ring overflow-clip">
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
        {role === "readers"
          ? "Читатели могут просматривать приватный список и желания в нем"
          : "Редакторы могут добавлять, изменять и удалять желания в списке"}
      </div>
    </div>
  );
}

function Search({
  searchString,
  setSearchString,
}: {
  searchString: string;
  setSearchString: Setter<string>;
}) {
  return (
    <div className="space-y-3">
      <FormLabel>Найти пользователя по имени или никнейму</FormLabel>
      <Searchbar
        searchString={searchString}
        setSearchString={setSearchString}
        grow={false}
        className="[&_input]:h-10"
      />
    </div>
  );
}

function CollaboratorsList({
  searchString,
  wishlistId,
  owner,
  collaborators,
}: {
  searchString: string;
  wishlistId: string;
  owner: UserDocumentType;
  collaborators: UserDocumentType[] | null;
}) {
  const { users, isLoading, error } = useUsers(searchString);

  // дефолтное отображение всех соавторов
  if (!searchString) {
    return (
      <ScrollArea className="max-h-[16rem]">
        <div className="space-y-2 px-2">
          <Collaborator
            avatarURL={owner.avatarURL}
            userId={owner.userId}
            userName={owner.userName}
            wishlistId={wishlistId}
          />
          {collaborators?.map((user: UserDocumentType) => (
            <Collaborator
              key={user.userId}
              avatarURL={user.avatarURL}
              userId={user.userId}
              userName={user.userName}
              wishlistId={wishlistId}
            />
          )) ?? null}
        </div>
      </ScrollArea>
    );
  }

  // результаты поиска
  if (searchString) {
    if (users) {
      if (users.length === 0) return <>Пользователь не найден 😶</>;

      return (
        <ScrollArea className="max-h-[16rem]">
          <div className="space-y-2 px-2">
            {users.map((user: UserDocumentType) => (
              <Collaborator
                key={user.userId}
                avatarURL={user.avatarURL}
                userId={user.userId}
                userName={user.userName}
                wishlistId={wishlistId}
              />
            ))}
          </div>
        </ScrollArea>
      );
    }

    if (isLoading) return <>Загрузка...</>;
    if (error) return <>Не удалось загрузить пользователей ☹️</>;
  }
}

function Collaborator({
  avatarURL,
  userId,
  userName,
  wishlistId,
}: Pick<UserDocumentType, "userId" | "userName" | "avatarURL"> & {
  wishlistId: string;
}) {
  const userRoles = useWishlistRoles(userId, wishlistId);
  const roleName = getRoleName(userRoles, userRoles.inPrivateWishlist);

  return (
    <div className="flex items-center gap-2">
      <Avatar className="rounded-full size-8">
        <AvatarImage src={avatarURL} alt={userId} />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <span className="font-medium text-sm md:text-base">{userName}</span>
        <span className="text-ring text-xs md:text-sm leading-tight">
          {roleName ?? null}
        </span>
      </div>

      {roleName ? (
        <Button
          size="sm"
          className={cn(
            "bg-muted hover:bg-muted/60 ms-auto rounded-2xl",
            userRoles.isOwner && "hidden"
          )}
          disabled={userRoles.isOwner}
        >
          Исключить
        </Button>
      ) : (
        <Button size="sm" className="ms-auto rounded-2xl">
          Пригласить
        </Button>
      )}
    </div>
  );
}
