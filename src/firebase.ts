import { initializeApp } from 'firebase/app';
import { initializeFirestore, doc, onSnapshot, setDoc, getDoc, getDocFromServer } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

export const app = initializeApp(firebaseConfig);

// Safe Mock Auth to prevent bundle/registration issues since Firebase Auth is not used by this app
export const auth = {
  currentUser: null as {
    uid: string;
    email: string;
    emailVerified: boolean;
    isAnonymous: boolean;
    tenantId: string | null;
    providerData: { providerId: string; email: string }[];
  } | null
};

// Initialize Firestore with custom databaseId if configured & force long polling for sandbox/iframe reliability
const customDbId = firebaseConfig.firestoreDatabaseId || undefined;

export const db = initializeFirestore(
  app,
  {
    experimentalForceLongPolling: true,
  },
  customDbId
);

export const DOC_REF = doc(db, 'department_cms', 'master');

// Validate Connection to Firestore (MANDATORY skill constraint)
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.error("Please check your Firebase configuration: client is offline.");
    }
  }
}
testConnection();

// Mandatory Error Handlers matching Firebase Skill specifications
export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  }
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

export { doc, onSnapshot, setDoc, getDoc };

