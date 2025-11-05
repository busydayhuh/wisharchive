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
    <div className="space-y-6 lg:space-y-10 mx-auto mt-3 lg:mt-0">
      <p className="px-2 lg:px-0 font-bold text-2xl md:text-3xl lg:text-4xl">
        Редактировать профиль
      </p>

      <UserInfoHeader
        imageURL={profileInfo.avatarURL ?? undefined}
        userId={profileInfo.userId}
        name={profileInfo.userName}
      />
      <div className="gap-4 lg:gap-20 grid grid-cols-1 lg:grid-cols-2">
        <div className="space-y-4 lg:space-y-10">
          <PersonalInfoForm userInfo={profileInfo} mutateUser={mutateUser} />

          <ProfileImageUploader
            imageURL={profileInfo.avatarURL ?? undefined}
            userId={profileInfo.userId}
            documentId={profileInfo.$id}
            name={profileInfo.userName}
            mutateUser={mutateUser}
          />
        </div>

        <AccountInfoForm
          email={profileInfo.userEmail}
          userDocumentId={profileInfo.$id}
        />
      </div>
    </div>
  );
}
