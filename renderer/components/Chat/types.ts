import { User } from "firebase/auth";
import { DocumentData, Timestamp } from "firebase/firestore";
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

export interface IChatRoomProps {
  onBack: () => void;
  onChangeText: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSendMessage: () => void;
  onEnterPress: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onConvertDate: (timestamp: Timestamp) => string;
  text: string;
  isEmpty: boolean;
  messages: DocumentData;
  user: ICustomUserInfo;
  currentUser: User;
  messagesEndRef: MutableRefObject<HTMLDivElement>;
}
