import { CONFIG } from "@/shared/config/config";
import { Account, Client, Databases, Storage, Teams } from "appwrite";

function appwriteInit() {
  const client = new Client();

  client
    .setEndpoint(CONFIG.APPWRITE_ENDPOINT)
    .setProject(CONFIG.APPWRITE_PROJECT_ID);

  const account = new Account(client);
  const databases = new Databases(client);
  const storage = new Storage(client);
  const teams = new Teams(client);

  return { account, databases, storage, teams };
}

export const appwriteService = appwriteInit();
