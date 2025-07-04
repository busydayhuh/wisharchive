import { ID, type Models } from "appwrite";
import { appwriteService } from "./appwrite";
import { CONFIG } from "./config";

type CollectionApiType = {
  create: (
    payload: object,
    permissions?: [],
    id?: string
  ) => Promise<Models.Document>;
  update: (
    id: string,
    payload: object,
    permissions?: []
  ) => Promise<Models.Document>;
  delete: (id: string) => Promise<object>;
  list: (queries?: string[]) => Promise<Models.DocumentList<Models.Document>>;
  get: (id: string) => Promise<Models.Document>;
};

const db: Record<string, CollectionApiType> = {};
const { databases } = appwriteService;

const collections = [
  {
    dbId: CONFIG.APPWRITE_DATABASE,
    id: CONFIG.APPWRITE_COLLECTION_WISHES,
    name: "wishes",
  },
  {
    dbId: CONFIG.APPWRITE_DATABASE,
    id: CONFIG.APPWRITE_COLLECTION_WISHLISTS,
    name: "wishlists",
  },
  {
    dbId: CONFIG.APPWRITE_DATABASE,
    id: CONFIG.APPWRITE_COLLECTION_USERS,
    name: "users",
  },
];

collections.forEach((col) => {
  db[col.name] = {
    create: (payload, permissions, id = ID.unique()) =>
      databases.createDocument(col.dbId, col.id, id, payload, permissions),
    update: (id, payload, permissions) =>
      databases.updateDocument(col.dbId, col.id, id, payload, permissions),
    delete: (id) => databases.deleteDocument(col.dbId, col.id, id),
    list: (queries = []) => databases.listDocuments(col.dbId, col.id, queries),
    get: (id) => databases.getDocument(col.dbId, col.id, id),
  };
});

export default db;
