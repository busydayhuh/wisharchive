import { type Models } from "appwrite";

export type WishDocumentType = Models.Document & {
  title: string;
  description?: string;
  shopURL?: string;
  price?: number;
  currency: string;
  isArchived: boolean;
  ownerId: string;
  bookerId: string | null;
  isBooked: boolean;
  wishlistId?: string;
  imageURL?: string;
  isPrivate?: boolean;
  canReadId?: string[] | [];
  canEditId?: string[] | [];
};

export type WishlistDocumentType = Models.Document & {
  title: string;
  description?: string;
  ownerId: string;
  wishes: WishDocumentType[] | null;
  isPrivate?: boolean;
  canReadId?: string[] | [];
  canEditId?: string[] | [];
  coverImagesURL?: string[] | [];
};

export type UserDocumentType = Models.Document & {
  userId: string;
  userName: string;
  userEmail: string;
  wishlistsId?: string[];
  wishesId?: string[];
  favListsId?: string[];
  avatarURL?: string;
  bookedWishesId?: string[];
};
