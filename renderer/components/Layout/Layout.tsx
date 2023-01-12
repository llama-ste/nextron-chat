import { useRouter } from "next/router";

import { IChildrenProps } from "../../types/children";
import { ILayoutProps } from "./types";
import LayoutView from "./views/LayoutView";

const Layout = ({ children }: IChildrenProps) => {
  const { pathname, query } = useRouter();
  const isNotAuthPage = !pathname.includes("sign");
  const isOutsideChatRoom = query?.id === undefined;
  const isVisibleHeaderAndFooter = isOutsideChatRoom && isNotAuthPage;

  const LayoutProps: ILayoutProps = {
    children,
    isVisible: isVisibleHeaderAndFooter,
  };

  return <LayoutView {...LayoutProps}></LayoutView>;
};

export default Layout;
