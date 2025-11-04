import type { UserDocumentType } from "@/shared/model/types";
import type { KeyedMutator } from "swr";
import { AccountInfoForm } from "./AccountInfoForm";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { ProfileImageUploader } from "./ProfileImageUploader";
import { UserInfoHeader } from "./UserInfoHeader";

export function ProfilePageLayout({
  profileInfo,
  mutateUser,
}: {
  profileInfo: UserDocumentType;
  mutateUser: KeyedMutator<UserDocumentType>;
}) {
  return (
    <div className="space-y-10 mx-auto max-w-4xl">
      <p className="font-bold text-4xl">Редактировать профиль</p>

      <UserInfoHeader
        imageURL={profileInfo.avatarURL ?? undefined}
        userId={profileInfo.userId}
        name={profileInfo.userName}
      />
      <PersonalInfoForm userInfo={profileInfo} mutateUser={mutateUser} />

      <ProfileImageUploader
        imageURL={profileInfo.avatarURL ?? undefined}
        userId={profileInfo.userId}
        documentId={profileInfo.$id}
        name={profileInfo.userName}
        mutateUser={mutateUser}
      />

      <AccountInfoForm
        email={profileInfo.userEmail}
        userDocumentId={profileInfo.$id}
      />
    </div>
  );
}
