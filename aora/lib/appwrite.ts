// import SignIn from "@/app/(auth)/sign-in";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";
import uuid from "react-native-uuid";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.jsm.aora",
  projectId: "676812ee00027b594255",
  databaseId: "6768173a002d6fdafe2a",
  userCollectionId: "676817a6000ba0d7e915",
  videoCollectionId: "676818050037af703270",
  storageId: "67681bb7002a90661774",
};

const {
  endpoint,
  platform,
  projectId,
  databaseId,
  userCollectionId,
  videoCollectionId,
  storageId,
} = config;

// Init your React Native SDK
const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

const userId = uuid.v4();

export async function createUser(email: string, password: string, username: string) {
  try {
    const newAccount = await account.create(
      userId,
      email,
      password,
      username
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(username);

    await SignIn(email, password);

    const newUser = await databases.createDocument(
      databaseId,
      userCollectionId,
      userId,
      {
        accountId: newAccount.$id,
        email: email,
        username: username,
        avatar: avatarUrl,
      }
    );

    return newUser;
  } catch (error: any) {
    throw new Error(error);
  }
}

export const SignIn = async (email: string, password: string) => {
  try {
    // Check for existing sessions
    const sessions = await account.listSessions();
    if (sessions.sessions.length > 0) {
      console.log("Active session found. Using the existing session.");
      return sessions.sessions[0]; 
    }

    // No active session, create a new one
    const session = await account.createEmailPasswordSession(email, password);
    console.log("Session created successfully:", session);
    return session;
  } catch (error: any) {
    throw new Error(error.message);
  }
};


export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error: any) {
    // throw new Error(error);
  }
}

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error: any) {
    console.log(error);
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId
    );

    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      databaseId,
      videoCollectionId,
      [Query.orderDesc('$createdAt'), Query.limit(7)]
    );

    return posts.documents;
  } catch (error: any) {
    throw new Error(error);
  }
};

