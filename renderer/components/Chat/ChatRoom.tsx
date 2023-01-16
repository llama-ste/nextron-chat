import { uuidv4 } from "@firebase/util";
import {
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { useContext, useEffect, useRef, useState } from "react";

import { db } from "../../common/firebase";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import useToastMessage from "../../hooks/common/useToastMessage";
import { IChatRoomProps } from "./types";
import ChatRoomView from "./Views/ChatRoomView";

const ChatRoom = () => {
  const { push } = useRouter();
  const { chatId, user } = useContext(ChatContext);
  const currentUser = useContext(AuthContext);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef<HTMLDivElement>();
  const showToast = useToastMessage();
  const isEmpty = text.length <= 0;

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();

    return () => scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const unSubscribe = onSnapshot(doc(db, "chats", chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => unSubscribe();
  }, [chatId]);

  const onSendMessage = async () => {
    try {
      setText("");

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });

      await setDoc(
        doc(db, "users-chat-list", currentUser.uid),
        {
          [chatId]: {
            lastMessage: text,
            date: serverTimestamp(),
          },
        },
        { merge: true }
      );

      await setDoc(
        doc(db, "users-chat-list", user.uid),
        {
          [chatId]: {
            lastMessage: text,
            date: serverTimestamp(),
          },
        },
        { merge: true }
      );
    } catch (err) {
      showToast("error", "메세지 전송에 실패했습니다.");
    }
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isEmpty) onSendMessage();
  };

  const chatRoomProps: IChatRoomProps = {
    onBack: () => push("/chat-list"),
    onChangeText: (e) => setText(e.target.value),
    onSendMessage,
    onEnterPress,
    messages,
    text,
    isEmpty,
    user,
    messagesEndRef,
  };

  return <ChatRoomView {...chatRoomProps} />;
};

export default ChatRoom;
