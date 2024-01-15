import { Account, Client, Storage, Databases, Avatars } from "appwrite";
export const appwriteConfig = {
  projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
  url: import.meta.env.VITE_APPWRITE_URL,
  databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
  storageId: import.meta.env.VITE_APPWRITE_MEDIA_ID,
  userCollectionId: import.meta.env.VITE_APPWRITE_USERS_COLLECTION_ID,
  postCollectionId: import.meta.env.VITE_APPWRITE_POSTS_COLLECTION_ID,
  downloadsCollectionId: import.meta.env.VITE_APPWRITE_DOWNLOADS_COLLECTION_ID,
};
export const client = new Client();

client.setProject(appwriteConfig.projectId);
client.setEndpoint(appwriteConfig.url);
export const storage = new Storage(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);
export const account = new Account(client);
