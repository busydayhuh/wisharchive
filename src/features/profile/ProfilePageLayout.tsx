import type { UserDocumentType } from "@/shared/model/types";
import type { KeyedMutator } from "swr";
import { ProfileForm } from "./ProfileForm";
import { ProfileImageUploader } from "./ProfileImageUploader";

export function ProfilePageLayout({
  profileInfo,
  mutateUser,
}: {
  profileInfo: UserDocumentType;
  mutateUser: KeyedMutator<UserDocumentType>;
}) {
  return (
    <div className="space-y-10">
      <p className="font-bold text-5xl">Редактировать профиль</p>
      <div className="grid grid-cols-[2fr_5fr]">
        <ProfileImageUploader
          imageURL={profileInfo.avatarURL ?? undefined}
          userId={profileInfo.userId}
          documentId={profileInfo.$id}
          name={profileInfo.userName}
          mutateUser={mutateUser}
        />
        <ProfileForm />
      </div>
    </div>
  );
}
