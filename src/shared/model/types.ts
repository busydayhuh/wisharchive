import { type Models } from "appwrite";
import type { Params } from "react-router";

export type WishDocumentType = Models.Document & {
  title: string;
  description: string | null;
  shopURL: string | null;
  price: number | null;
  currency: string;
  isArchived: boolean;
  ownerId: string;
  bookerId: string | null;
  isBooked: boolean;
  imageURL: string | null;
  wishlistId: string | null;
  wishlist: WishlistDocumentType | null;
  bookedBy: UserDocumentType | null;
  owner: UserDocumentType;
  priority: "2" | "1" | "0";
};

export type WishlistDocumentType = Models.Document & {
  title: string;
  description: string | null;
  isPrivate: boolean;
  ownerId: string;
  editorsIds: string[];
  readersIds: string[];
  wishes: WishDocumentType[] | null;
  owner: UserDocumentType;
  bookmarkedBy: string[] | null;
};

export type UserDocumentType = Models.Document & {
  userId: string;
  userName: string;
  userEmail: string;
  avatarURL: string | null;
  bookedWishes: WishDocumentType[] | null;
  wishes: WishDocumentType[] | null;
  wishlists: WishDocumentType[] | null;
  bio: string | null;
  sex: "female" | "male" | "other" | null;
  birthDate?: string;
};

export type Setter<T> = React.Dispatch<React.SetStateAction<T>>;

export type LinkParams = {
  to: string;
  state: {
    prevLocation: string;
    prevParams: Params;
    data?: {
      userName?: string;
      userId?: string;
      wlTitle?: string;
      wishTitle?: string;
    };
  };
};

export type PageData = {
  documents: Models.Document[];
};
