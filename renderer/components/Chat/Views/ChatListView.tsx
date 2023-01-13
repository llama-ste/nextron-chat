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

const ChatListView = ({
  onGoToChatRoom,
  onConvertDate,
  chats,
}: IChatListProps) => {
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
