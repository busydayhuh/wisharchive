import type {
  UserDocumentType,
  WishlistDocumentType,
} from "@/shared/model/types";
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
  DialogTrigger,
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
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import useFindUser from "../model/useFindUser";
import Searchbar from "./Searchbar";

function CollaboratorsDialog({
  wishlist,
  isPrivateChecked = false,
}: {
  wishlist?: WishlistDocumentType;
  isPrivateChecked?: boolean;
}) {
  const [role, setRole] = useState("editors");
  // const [selectedUsers, setSelectedUsers] = useState([] as string[]);
  const [searchString, setSearchString] = useState("");
  const {
    user: foundUsers,
    isLoading: searchLoading,
    error: searchError,
  } = useFindUser("", searchString, "userByName");

  function checkRole(id: string) {
    if (!wishlist) return undefined;

    if (wishlist.ownerId === id) {
      return "Владелец";
    }

    if (
      wishlist.collaborators.some(
        (user: UserDocumentType) => user.userId === id
      )
    ) {
      return wishlist.canEdit.includes(id) ? "Редактор" : "Читатель";
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="bg-transparent rounded-full w-8 h-8">
          <PlusIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="rounded-2xl sm:max-w-md">
        <DialogHeader className="mb-3">
          <DialogTitle>Изменить список соавторов</DialogTitle>
          <DialogDescription className="sr-only">
            Добавить нового читателя или редактора списка
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <FormLabel>Добавить соавтора как...</FormLabel>
            <Select value={role} onValueChange={(value) => setRole(value)}>
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
            <span className="text-muted-foreground text-xs">
              {role === "readers" ? (
                <>
                  Читатели могут просматривать приватный список и желания в нем
                </>
              ) : (
                <>
                  Редакторы могут добавлять, редактировать и удалять желания в
                  списке
                </>
              )}
            </span>
          </div>
          <div className="space-y-3">
            <FormLabel>Найти пользователя по имени или никнейму:</FormLabel>
            <Searchbar
              searchString={searchString}
              setSearchString={setSearchString}
              shouldGrow={false}
              className=""
            />
          </div>
          <ScrollArea className="max-h-[16rem]">
            <div className="space-y-2 px-2">
              {wishlist && !searchString
                ? wishlist.collaborators.map((user: UserDocumentType) => (
                    <Collaborator
                      key={user.userId}
                      avatarURL={user.avatarURL}
                      userId={user.userId}
                      userName={user.userName}
                      role={checkRole(user.userId)}
                    />
                  ))
                : ""}
              {searchString &&
                foundUsers &&
                foundUsers.length > 0 &&
                foundUsers.map((user: UserDocumentType) => {
                  if (wishlist && wishlist.ownerId === user.userId) {
                    return null;
                  }
                  return (
                    <Collaborator
                      key={user.userId}
                      avatarURL={user.avatarURL}
                      userId={user.userId}
                      userName={user.userName}
                      role={checkRole(user.userId)}
                    />
                  );
                })}
              {searchString && searchLoading && <div>Загрузка...</div>}
              {searchString && searchError && (
                <div>Не удалось загрузить пользователей ☹️</div>
              )}
              {searchString && foundUsers && foundUsers.length === 0 && (
                <div>Пользователь не найден 😶</div>
              )}
            </div>
          </ScrollArea>
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

export default CollaboratorsDialog;

function Collaborator({
  avatarURL,
  userId,
  userName,
  role,
}: Pick<UserDocumentType, "userId" | "userName" | "avatarURL"> & {
  role?: string;
}) {
  return (
    <div className="flex items-center gap-2 not-last:border-b-1">
      <Avatar className="rounded-full size-8">
        <AvatarImage src={avatarURL} alt={userId} />
        <AvatarFallback>ER</AvatarFallback>
      </Avatar>

      <div className="flex flex-col">
        <span className="font-medium text-sm md:text-base">{userName}</span>
        <span className="max-w-[12ch] text-ring text-xs md:text-sm truncate">
          @{userId}
        </span>
      </div>

      {role ? (
        <Button
          size="sm"
          className="bg-destructive hover:bg-destructive/80 ms-auto rounded-2xl text-secondary"
        >
          {role}
        </Button>
      ) : (
        <Button size="sm" className="ms-auto rounded-2xl">
          Добавить
        </Button>
      )}
    </div>
  );
}
