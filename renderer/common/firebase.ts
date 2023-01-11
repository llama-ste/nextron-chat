import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { TAuthFn } from "./types";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const signUp: TAuthFn = ({ email, password }) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const signIn: TAuthFn = ({ email, password }) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logout = () => signOut(auth);

const authErrorCode = {
  "auth/email-already-in-use": "존재하는 이메일입니다.",
  "auth/invalid-email": "유효하지 않는 이메일입니다.",
  "auth/operation-not-allowed": "비활성화된 유저입니다.",
  "auth/weak-password": "비밀번호를 엄격하게 만들어주세요.",
  "auth/user-disabled": "비활성화된 유저입니다.",
  "auth/user-not-found": "존재하지 않는 유저입니다.",
  "auth/wrong-password": "비밀번호를 확인해주세요.",
} as const;

export { auth, signUp, signIn, logout, authErrorCode };
