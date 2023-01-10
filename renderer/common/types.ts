import { UserCredential } from "firebase/auth";
import { IUserInfo } from "../components/Auth/types";

export type TAuthFn = (params: IUserInfo) => Promise<UserCredential>;
