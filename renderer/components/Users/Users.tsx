import { setDoc, doc, getDoc, serverTimestamp } from "firebase/firestore";
import { UserRecord } from "firebase-admin/lib/auth/user-record";
import { FirebaseError } from "firebase-admin";
import { useContext, useEffect, useState } from "react";
import { ipcRenderer } from "electron";

import { IUsersProps } from "./types";
import { ICustomUserInfo } from "../../types/auth";
import UsersView from "./views/UsersView";
import { db } from "../../common/firebase";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthContext";
import useToastMessage from "../../hooks/common/useToastMessage";
import { ChatContext } from "../../context/ChatContext";

const Users = () => {
  const { push } = useRouter();
  const currentUser = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [groupMode, setGroupMode] = useState(false);
  const [checkUsers, setCheckUsers] = useState<ICustomUserInfo[]>([]);
  const [usersList, setUsersList] = useState<ICustomUserInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const showToast = useToastMessage();

  useEffect(() => {
    ipcRenderer.on("users-list", (e, users: UserRecord[]) => {
      const filteredUsersList = users.filter(
        (user) => user.uid !== currentUser?.uid
      );

      const updatedUsersList = filteredUsersList.map((user) => {
        const avatar = user.email.slice(0, 1);
        const nickname = user.email.split("@", 1)[0];

        return { avatar, nickname, uid: user.uid, email: user.email };
      });

      setUsersList(updatedUsersList);
    });

    ipcRenderer.on("users-error", (_, err: FirebaseError) => {
      showToast("error", "불러오기에 실패했습니다.");
    });

    ipcRenderer.on("users-loading", (_, isLoading) => {
      setIsLoading(isLoading);
    });

    ipcRenderer.send("get-users");

    return () => {
      ipcRenderer.removeAllListeners("users-list");
      ipcRenderer.removeAllListeners("users-error");
      ipcRenderer.removeAllListeners("users-loading");
    };
  }, []);

  const onCreateChatRoom = async (user: ICustomUserInfo) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
      }

      await setDoc(
        doc(db, "users-chat-list", currentUser.uid),
        {
          [combinedId]: {
            userInfo: {
              uid: user.uid,
              nickname: user.nickname,
              avatar: user.avatar,
            },
            date: serverTimestamp(),
          },
        },
        { merge: true }
      );

      await setDoc(
        doc(db, "users-chat-list", user.uid),
        {
          [combinedId]: {
            userInfo: {
              uid: currentUser.uid,
              nickname: currentUser.email.split("@", 1)[0],
              avatar: currentUser.email.split("@", 1)[0].slice(0, 1),
            },
            date: serverTimestamp(),
          },
        },
        { merge: true }
      );
    } catch (err) {
      showToast("error", "채팅룸 생성에 실패했습니다.");
      return;
    }

    dispatch({ type: "CHANGE_USER", payload: user });

    push(`/chat-list/${combinedId}`);
  };

  const UsersProps: IUsersProps = {
    onGroupMode: () => {
      setGroupMode((prev) => !prev);
      setCheckUsers([]);
    },
    onCheckUser: (newUser) => {
      const isExist = checkUsers.some((user) => user.uid === newUser.uid);

      if (isExist) {
        const filteredUids = [...checkUsers].filter(
          (user) => user.uid !== newUser.uid
        );
        setCheckUsers(filteredUids);
      } else {
        setCheckUsers((users) => [...users, newUser]);
      }
    },
    onCreateChatRoom,
    onCreateGroupChatRoom: () => {
      setGroupMode(false);
      setCheckUsers([]);
    },
    checkUsers,
    groupMode,
    usersList,
    totalUser: usersList.length,
    isLoading,
  };

  return <UsersView {...UsersProps} />;
};

export default Users;
