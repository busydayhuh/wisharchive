import type { UserDocumentType } from "@/shared/types";
import type { UpdateUserCache } from "../profile.page";
import { AccountInfoForm } from "./AccountInfoForm";
import { PersonalInfoForm } from "./PersonalInfoForm";
import { UserInfoHeader } from "./UserInfoHeader";

export function ProfilePageLayout({
  profileInfo,
  updateUserCache,
}: {
  profileInfo: UserDocumentType;
  updateUserCache: UpdateUserCache;
}) {
  return (
    <div className="space-y-6 lg:space-y-10 mx-auto mt-3 lg:mt-0 mb-6">
      <p className="px-2 lg:px-0 font-headers font-bold text-2xl md:text-3xl lg:text-4xl">
        Редактировать профиль
      </p>

      <UserInfoHeader
        imageURL={profileInfo.avatarURL ?? undefined}
        userId={profileInfo.userId}
        name={profileInfo.userName}
      />
      <div className="gap-4 lg:gap-20 grid grid-cols-1 lg:grid-cols-2 w-full">
        <div className="w-full">
          <PersonalInfoForm
            userInfo={profileInfo}
            updateUserCache={updateUserCache}
          />
        </div>

        <div className="space-y-4 lg:space-y-10">
          <AccountInfoForm
            email={profileInfo.userEmail}
            userDocumentId={profileInfo.$id}
          />
          {/* <DeleteAccountSection /> */}
        </div>
      </div>
    </div>
  );
}
