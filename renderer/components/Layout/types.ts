import { IChildrenProps } from "../../types/children";

export interface IHeaderProps {
  onLogout: () => void;
  title: "친구" | "채팅";
}

export interface ILayoutProps extends IChildrenProps {
  isNotAuthPage: boolean;
}

export interface IFooterProps {
  onGoToUsers: () => void;
  onGoToChatList: () => void;
  tab: string;
}
