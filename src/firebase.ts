import { initializeApp } from 'firebase/app';
import { initializeFirestore, doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

export const app = initializeApp(firebaseConfig);

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

export { doc, onSnapshot, setDoc, getDoc };
