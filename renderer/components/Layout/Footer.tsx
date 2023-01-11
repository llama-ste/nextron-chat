import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { IFooterProps } from "./types";
import FooterView from "./views/FooterView";

const Footer = () => {
  const { push, pathname } = useRouter();
  const [tab, setTab] = useState("");

  useEffect(() => {
    const currentTab = pathname.includes("users") ? "users" : "chatList";
    setTab(currentTab);
  }, [pathname]);

  const FooterProps: IFooterProps = {
    onGoToUsers: () => push("/users"),
    onGoToChatList: () => push("/chat-list"),
    tab,
  };

  return <FooterView {...FooterProps} />;
};

export default Footer;
