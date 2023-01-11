import { useRouter } from "next/router";

import { IChildrenProps } from "../../types/children";
import { ILayoutProps } from "./types";
import LayoutView from "./views/LayoutView";

const Layout = ({ children }: IChildrenProps) => {
  const { pathname } = useRouter();
  const isNotAuthPage = !pathname.includes("sign");

  const LayoutProps: ILayoutProps = {
    children,
    isNotAuthPage,
  };

  return <LayoutView {...LayoutProps}></LayoutView>;
};

export default Layout;
