import styled from "@emotion/styled";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import { IMessageProps } from "../types";

const MessageWrapper = styled.div<{ isMyMessage: boolean }>`
  margin-left: ${({ isMyMessage }) => (isMyMessage ? "45%" : "0")};
  width: ${({ isMyMessage }) => (isMyMessage ? "55%" : "65%")};
  margin-bottom: 6px;
`;

const MessageView = ({
  isMyMessage,
  message,
  user,
  convertedDate,
}: IMessageProps) => {
  return (
    <MessageWrapper isMyMessage={isMyMessage}>
      <ListItem sx={{ padding: "0px 6px" }}>
        {!isMyMessage && (
          <ListItemAvatar>
            <Avatar>{user.avatar}</Avatar>
          </ListItemAvatar>
        )}
        <ListItemText
          sx={{
            padding: "4px 10px",
            borderRadius: "6px",
            background: `${isMyMessage ? "#fae100" : "lightgray"}`,
          }}
          primary={isMyMessage ? "" : user.nickname}
          secondary={message.text}
        />
      </ListItem>
      <Typography
        sx={{ paddingRight: "10px", fontSize: "12px" }}
        textAlign="end"
      >
        {convertedDate}
      </Typography>
    </MessageWrapper>
  );
};

export default React.memo(MessageView);
