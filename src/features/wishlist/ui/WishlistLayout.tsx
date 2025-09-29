import {
  CollaboratorsAvatars,
  CollaboratorsAvatarsSkeleton,
  CollaboratorsDialog,
  useCollaborators,
} from "@/features/collaborators";
import {
  DashboardContentContainer,
  DashboardToolbar,
  WishesPageLayout,
} from "@/features/dashboard";
import { useWishes } from "@/features/wish";
import type {
  WishDocumentType,
  WishlistDocumentType,
} from "@/shared/model/types";
import ExpandableText from "@/shared/ui/ExpandableText";
import { useSidebar } from "@/shared/ui/kit/sidebar";
import { StarsIcon } from "lucide-react";
import { useState } from "react";

export function WishlistLayout({
  wishlist,
}: {
  wishlist: WishlistDocumentType;
}) {
  const [searchString, setSearchString] = useState("");
  const [viewMode, setViewMode] = useState<"gallery" | "table">("gallery");

  return (
    <>
      <div className="flex flex-col gap-4 md:gap-6 mt-2 md:mt-4 px-2 md:px-0">
        <WishlistHeader
          wishlistId={wishlist.$id}
          title={wishlist.title}
          wishes={wishlist.wishes}
          isPrivate={wishlist.isPrivate}
          description={wishlist.description}
        />
        <DashboardToolbar
          searchString={searchString}
          setSearchString={setSearchString}
          viewMode={viewMode}
          setViewMode={setViewMode}
          showNavigation={false}
        />
      </div>
      <WishlistContent
        wishlistId={wishlist.$id}
        searchString={searchString}
        viewMode={viewMode}
      />
    </>
  );
}

export function WishlistHeader({
  wishlistId,
  title,
  wishes,
  isPrivate,
  description,
}: {
  wishlistId: string;
  title: string;
  wishes: WishDocumentType[] | null;
  isPrivate: boolean;
  description?: string | null;
}) {
  return (
    <div className="space-y-6 lg:mb-6 md:pr-6">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-2">
          <p className="font-bold text-2xl lg:text-3xl 2xl:text-4xl">{title}</p>
          <p className="inline-flex items-center gap-2 text-muted-foreground text-xs md:text-sm">
            {wishes && <span>{wishes.length} жел.</span>}
            <StarsIcon className="size-3" />
            <span className="flex items-center gap-2">
              {isPrivate ? <>приватный</> : "публичный"}
            </span>
          </p>
        </div>
        <WishlistCollaborators wishlistId={wishlistId} isPrivate={isPrivate} />
      </div>
      {description && (
        <ExpandableText
          text={description}
          className="md:max-w-[70%] text-xs lg:text-sm"
          lines={3}
          buttonTextSize="text-xs lg:text-sm"
        />
      )}
    </div>
  );
}

export function WishlistCollaborators({
  wishlistId,
  isPrivate,
}: {
  wishlistId: string;
  isPrivate: boolean;
}) {
  const { collaborators, isLoading, error } = useCollaborators(wishlistId);
  const { isMobile } = useSidebar();

  if (error) return "☹️ Не удалось загрузить соавторов";
  if (isLoading)
    return <CollaboratorsAvatarsSkeleton size={8} maxVisible={4} />;

  if (collaborators)
    return (
      <div className="flex items-center gap-2">
        <CollaboratorsDialog
          collaborators={collaborators}
          isPrivateChecked={isPrivate}
          wishlistId={wishlistId}
        />
        <CollaboratorsAvatars
          collaborators={collaborators}
          maxVisible={5}
          size={isMobile ? "default" : "lg"}
        />
      </div>
    );
}

export function WishlistContent({
  wishlistId,
  searchString,
  viewMode,
}: {
  wishlistId: string;
  searchString: string;
  viewMode: "gallery" | "table";
}) {
  const { wishes, isLoading, error } = useWishes({
    searchString: searchString,
    wishlistId: wishlistId,
    archived: false,
    order: "desc",
    orderBy: "$sequence",
  });
  return (
    <DashboardContentContainer>
      <WishesPageLayout
        wishes={wishes}
        isLoading={isLoading}
        error={error}
        viewMode={viewMode}
      />
    </DashboardContentContainer>
  );
}
