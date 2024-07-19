import {
  firestore,
  credential,
  apps,
  type ServiceAccount,
  database,
} from "firebase-admin";
import { initializeApp } from "firebase-admin/app";
import { getStorage } from "firebase-admin/storage";

const serviceAccount =
  require(`./${process.env.SERVICE_ACCOUNT_FILE_NAME}`) as ServiceAccount;

if (!apps.length) {
  initializeApp({
    credential: credential.cert(serviceAccount),
    databaseURL: process.env.DATABASE_URL,
    storageBucket: process.env.STORAGE_BUCKET_URL,
  });
}

export const db = database();
export const storage = getStorage().bucket();
