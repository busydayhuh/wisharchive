export type Message = { header: string; description: string; CAT?: string };
export type Variant =
  | "default"
  | "no-items"
  | "no-results"
  | "not-found"
  | "no-access";
export type Entity =
  | "wishes"
  | "wishlists"
  | "wish"
  | "wishlist"
  | "default"
  | "profile";
