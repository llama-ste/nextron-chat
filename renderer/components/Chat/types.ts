import { Timestamp } from "firebase/firestore";
import { MutableRefObject } from "react";

import { ICustomUserInfo } from "../../types/auth";

export interface IChatListProps {
  onGoToChatRoom: ({
    chatId,
    user,
  }: {
    chatId: string;
    user: ICustomUserInfo;
  }) => void;
  onConvertDate: (timestamp: Timestamp) => string;
  chats: [string, {}][];
  isEmpty: boolean;
  isNull: boolean;
}

export interface IMessage {
  date: Timestamp;
  id: string;
  senderId: string;
  text: string;
}

export interface IChatRoomProps {
  onBack: () => void;
  onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  onEnterPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  text: string;
  isEmpty: boolean;
  messages: IMessage[];
  user: ICustomUserInfo;
  messagesEndRef: MutableRefObject<HTMLDivElement>;
}

export interface IUserAndMessageProps {
  user: ICustomUserInfo;
  message: IMessage;
}

export interface IMessageProps extends IUserAndMessageProps {
  isMyMessage: boolean;
  convertedDate: string;
}
