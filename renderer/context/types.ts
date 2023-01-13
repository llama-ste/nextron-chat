import { ICustomUserInfo } from "../types/auth";

export interface IInitState {
  chatId: string;
  user: ICustomUserInfo;
}

export enum EAction {
  CHANGE_USER = "CHANGE_USER",
}
