import { useRouter } from "next/router";

import { logout } from "../../common/firebase";
import { IHeaderProps } from "./types";
import HeaderView from "./views/HeaderView";
import useToastMessage from "../../hooks/common/useToastMessage";

const Header = () => {
  const { replace, pathname } = useRouter();
  const showToast = useToastMessage();
  const title = pathname.includes("users") ? "유저" : "채팅";

  const HeaderProps: IHeaderProps = {
    onLogout: () => {
      replace("/sign-in").then(() => {
        logout();
        showToast("success", "로그아웃 되었습니다.");
      });
    },
    title,
  };

  return <HeaderView {...HeaderProps} />;
};

export default Header;
