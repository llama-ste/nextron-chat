import { IChildrenProps } from "../../types/children";

export interface IHeaderProps {
  onLogout: () => void;
  title: "유저" | "채팅";
}

export interface ILayoutProps extends IChildrenProps {
  isVisible: boolean;
}

export interface IFooterProps {
  onGoToUsers: () => void;
  onGoToChatList: () => void;
  tab: string;
}
