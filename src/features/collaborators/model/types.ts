// Базовые роли для работы со списком
export type Roles = {
  isWishlistOwner: boolean;
  isReader: boolean;
  isEditor: boolean;
};
// Роли для желания
export type WishRoles = Roles & {
  isBooker: boolean;
  isWishOwner: boolean;
};
// Соавтор
export type CollaboratorType = {
  userId: string;
  userName: string;
  userEmail: string;
  avatarURL: string | null;
  roles?: string[];
  confirm?: boolean;
};
