import { doc, onSnapshot, Timestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { db } from "../../common/firebase";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { IChatListProps } from "./types";
import ChatListView from "./Views/ChatListView";

const ChatList = () => {
  const { push } = useRouter();
  const [chats, setChats] = useState<[string, {}][]>(null);
  const currentUser = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const unSubscribe = onSnapshot(
      doc(db, "users-chat-list", currentUser.uid),
      (doc) => {
        const sortedChats = Object.entries(doc.data()).sort(
          (a, b) => b[1]["date"] - a[1]["date"]
        );
        setChats(sortedChats);
      }
    );

    return () => unSubscribe();
  }, [currentUser.uid]);

  const onConvertDate = (timeStamp: Timestamp) => {
    const date = timeStamp.toDate();

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Seoul",
    };

    const convertedDate = new Intl.DateTimeFormat("ko-KR", options).format(
      date
    );

    return convertedDate;
  };

  const chatListProps: IChatListProps = {
    onGoToChatRoom: ({ chatId, user }) => {
      dispatch({ type: "CHANGE_USER", payload: user });
      push(`/chat-list/${chatId}`);
    },
    onConvertDate,
    chats,
  };

  return <ChatListView {...chatListProps} />;
};

export default ChatList;
