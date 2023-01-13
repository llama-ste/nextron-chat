import { createContext, useContext, useReducer } from "react";
import { ICustomUserInfo } from "../types/auth";

import { IChildrenProps } from "../types/children";
import { AuthContext } from "./AuthContext";
import { EAction, IInitState } from "./types";

export const ChatContext = createContext<any>({});

export const useChatContext = () => {
  return useContext(ChatContext);
};

export const ChatProvider = ({ children }: IChildrenProps) => {
  const currentUser = useContext(AuthContext);

  const initialState: IInitState = {
    chatId: "",
    user: {
      uid: "",
      nickname: "",
      avatar: "",
    },
  };

  const chatReducer = (
    state: IInitState,
    action: { type: EAction; payload: ICustomUserInfo }
  ) => {
    switch (action.type) {
      case "CHANGE_USER":
        return {
          chatId:
            currentUser.uid > action.payload.uid
              ? currentUser.uid + action.payload.uid
              : action.payload.uid + currentUser.uid,
          user: action.payload,
        };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider
      value={{ chatId: state.chatId, user: state.user, dispatch }}
    >
      {children}
    </ChatContext.Provider>
  );
};
