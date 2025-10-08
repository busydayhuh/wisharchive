import type { UserDocumentType } from "@/shared/model/types";
import { Button } from "@/shared/ui/kit/button";
import OwnerAvatar from "@/shared/ui/OwnerAvatar";
import { Pencil } from "lucide-react";
import { memo } from "react";

export const WishHeader = memo(function WishHeader({
  title,
  owner,
  isEditor,
  editWish,
}: {
  title: string;
  owner: UserDocumentType;
  isEditor?: boolean;
  editWish: () => void;
}) {
  return (
    <div className="flex flex-col gap-2 md:gap-4">
      <div className="flex justify-between items-baseline gap-4">
        <p className="font-bold text-xl md:text-2xl lg:text-3xl 2xl:text-4xl">
          {title}
        </p>

        {isEditor && (
          <Button
            size="icon"
            variant="secondary"
            onClick={editWish}
            aria-label="Редактировать желание"
          >
            <Pencil />
          </Button>
        )}
      </div>

      <OwnerAvatar
        userId={owner.userId}
        userName={owner.userName}
        avatarURL={owner.avatarURL}
        className="mt-0 font-semibold text-sm md:text-base"
        size="md"
      />
    </div>
  );
});
