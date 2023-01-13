import { ICustomUserInfo } from "../../types/auth";

export interface IUsersProps {
  onGroupMode: () => void;
  onCheckUser: (user: ICustomUserInfo) => void;
  onCreateChatRoom: (user: ICustomUserInfo) => void;
  onCreateGroupChatRoom: () => void;
  groupMode: boolean;
  checkUsers: ICustomUserInfo[];
  usersList: ICustomUserInfo[];
  totalUser: number;
  isLoading: boolean;
}
