import { AuthError, UserCredential } from "firebase/auth";

import { IUserInfo } from "../components/Auth/types";
import { authErrorCode } from "./firebase";

export type TAuthFn = (params: IUserInfo) => Promise<UserCredential>;

export type TAuthErrorCode = keyof typeof authErrorCode;
