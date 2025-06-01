/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APPWRITE_PROJECT_ID: string;
  readonly VITE_APPWRITE_ENDPOINT: string;
  readonly VITE_APPWRITE_DATABASE: string;
  readonly VITE_APPWRITE_COLLECTION_WISHES: string;
  readonly VITE_APPWRITE_COLLECTION_WISHLISTS: string;
  readonly VITE_APPWRITE_STORAGE_BUCKET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
