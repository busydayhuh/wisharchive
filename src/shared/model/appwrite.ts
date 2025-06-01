import { Account, Client, Databases, Storage } from "appwrite";
import { CONFIG } from "./config";

function appwriteInit() {
  const client: Client = new Client();

  client
    .setEndpoint(CONFIG.APPWRITE_ENDPOINT)
    .setProject(CONFIG.APPWRITE_PROJECT_ID);

  const account: Account = new Account(client);
  const database: Databases = new Databases(client);
  const storage: Storage = new Storage(client);

  return { account, database, storage };
}

export const appwriteService = appwriteInit();
