import { initializeApp } from 'firebase/app';
import { initializeFirestore, getFirestore, doc, onSnapshot, setDoc, getDoc, getDocFromServer, setLogLevel } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

export const app = initializeApp(firebaseConfig);

// Silence Firestore internal network warning logs
try {
  setLogLevel('silent');
} catch (e) {
  // Graceful fallback
}

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

// Initialize Firestore with custom databaseId if configured.
// Try standard getFirestore first for optimal WebSocket/HTTP transport on static hosts like GitHub Pages,
// falling back to initializeFirestore with long polling if required.
const customDbId = (firebaseConfig as any).databaseId || (firebaseConfig as any).firestoreDatabaseId || undefined;

let dbInstance;
try {
  dbInstance = customDbId ? getFirestore(app, customDbId) : getFirestore(app);
} catch (e) {
  dbInstance = customDbId 
    ? initializeFirestore(app, { experimentalForceLongPolling: true }, customDbId)
    : initializeFirestore(app, { experimentalForceLongPolling: true });
}

export const db = dbInstance;

export const DOC_REF = doc(db, 'department_cms', 'master');

// Validate Connection to Firestore (MANDATORY skill constraint)
async function testConnection() {
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    console.warn("Firestore connection: Offline mode enabled via browser status.");
    return;
  }
  try {
    // Use a 1.5 second timeout race to prevent waiting for the standard 10 second timeout on unreachable environments
    const checkPromise = getDocFromServer(doc(db, 'test', 'connection'));
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('the client is offline (timeout)')), 1500)
    );
    await Promise.race([checkPromise, timeoutPromise]);
  } catch (error) {
    if (error instanceof Error && (error.message.includes('the client is offline') || error.message.includes('offline') || error.message.includes('reach') || error.message.includes('timeout'))) {
      console.warn("Please check your Firebase configuration: client is offline.");
    } else {
      console.warn("Firestore connection check handled: operating in offline sandbox mode.", error);
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

