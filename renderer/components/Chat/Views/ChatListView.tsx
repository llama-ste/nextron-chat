import {
  Avatar,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { IChatListProps } from "../types";
import { ICustomUserInfo } from "../../../types/auth";
import LoadingBar from "../../Common/Loadingbar";
import Empty from "../../Common/Empty";

const ChatListView = ({
  onGoToChatRoom,
  onConvertDate,
  chats,
  isEmpty,
  isNull,
}: IChatListProps) => {
  if (isNull) return <LoadingBar isLoading={isNull} />;
  if (isEmpty) return <Empty text="채팅이 없습니다." />;

  return (
    <List>
      {chats?.map((chat) => {
        const user: ICustomUserInfo = chat[1]["userInfo"];

        const convertedDate = onConvertDate(chat[1]["date"]);

        return (
          <ListItemButton
            key={chat[0]}
            onClick={() =>
              onGoToChatRoom({
                chatId: chat[0],
                user,
              })
            }
          >
            <ListItemAvatar>
              <Avatar>{user.avatar}</Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={user.nickname}
              secondary={
                chat[1]["lastMessage"]
                  ? chat[1]["lastMessage"]
                  : "메세지가 없습니다."
              }
            />
            {chat[1]["lastMessage"] && (
              <Typography fontSize="12px">{convertedDate}</Typography>
            )}
          </ListItemButton>
        );
      })}
    </List>
  );
};

export default ChatListView;
