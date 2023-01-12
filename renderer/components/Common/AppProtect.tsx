import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

import { AuthContext } from "../../context/AuthContext";
import useToastMessage from "../../hooks/common/useToastMessage";
import { IChildrenProps } from "../../types/children";

const AppProtect = ({ children }: IChildrenProps) => {
  const { pathname, replace } = useRouter();
  const currentUser = useContext(AuthContext);
  const showToast = useToastMessage();
  const isNotAuthPage = !pathname.includes("sign");
  const isInvalidUser = currentUser === null;

  useEffect(() => {
    if (isNotAuthPage && isInvalidUser) {
      showToast("warning", "로그인 먼저 해주세요.");
      replace("/sign-in");
    }
  }, [isInvalidUser]);

  if (isNotAuthPage && isInvalidUser) return <></>;

  return <>{children}</>;
};

export default AppProtect;
