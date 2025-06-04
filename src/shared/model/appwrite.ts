import { Account, Avatars, Client, Databases, Storage } from "appwrite";
import { CONFIG } from "./config";

function appwriteInit() {
  const client = new Client();

  client
    .setEndpoint(CONFIG.APPWRITE_ENDPOINT)
    .setProject(CONFIG.APPWRITE_PROJECT_ID);

  const account = new Account(client);
  const database = new Databases(client);
  const storage = new Storage(client);
  const avatars = new Avatars(client);

  return { account, database, storage, avatars };
}

export const appwriteService = appwriteInit();
