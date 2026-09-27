import "server-only";
import { applicationDefault, cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";
import { serverEnv } from "@/lib/env";

function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApp();
  }

  const projectId = serverEnv.firebaseProjectId;
  if (!projectId) {
    throw new Error("FIREBASE_PROJECT_ID must be configured to use Firebase Admin.");
  }

  const { firebaseClientEmail, firebasePrivateKey, firebaseStorageBucket } = serverEnv;
  if (Boolean(firebaseClientEmail) !== Boolean(firebasePrivateKey)) {
    throw new Error("FIREBASE_CLIENT_EMAIL and FIREBASE_PRIVATE_KEY must be configured together.");
  }

  const credential = firebaseClientEmail && firebasePrivateKey
    ? cert({
        projectId,
        clientEmail: firebaseClientEmail,
        privateKey: firebasePrivateKey.replace(/\\n/g, "\n"),
      })
    : applicationDefault();

  return initializeApp({
    credential,
    projectId,
    ...(firebaseStorageBucket ? { storageBucket: firebaseStorageBucket } : {}),
  });
}

export function getAdminFirestore() {
  return getFirestore(getFirebaseAdminApp());
}

export function getAdminStorage() {
  return getStorage(getFirebaseAdminApp());
}