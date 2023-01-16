import { Timestamp } from "firebase/firestore";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { IMessageProps, IUserAndMessageProps } from "./types";
import MessageView from "./Views/MessageView";

const Message = ({ user, message }: IUserAndMessageProps) => {
  const currentUser = useContext(AuthContext);
  const isMyMessage = currentUser.uid === message.senderId;

  const onConvertDate = (timeStapm: Timestamp) => {
    const date = timeStapm.toDate();

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

  const messageProps: IMessageProps = {
    user,
    message,
    isMyMessage,
    convertedDate: onConvertDate(message.date),
  };

  return <MessageView {...messageProps} />;
};

export default Message;
