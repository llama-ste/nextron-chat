import {
  Avatar,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";

import { IChatRoomProps } from "../types";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  max-height: 600px;
  height: 100%;
  width: 100%;
`;

const Header = styled(Paper)`
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  top: 0px;
  z-index: 1000;
  width: 100%;
  max-width: 400px;
  height: 55px;
  padding: 0px 10px;
  background-color: white;
  border-radius: 0px;
`;

const Content = styled.div`
  margin: 55px 0px;
  width: 100%;
  height: 100%;
  overflow: scroll;
  padding: 8px 0px;
`;

const MessageWrapper = styled.div<{ isMyMessage: boolean }>`
  margin-left: ${({ isMyMessage }) => (isMyMessage ? "45%" : "0")};
  width: ${({ isMyMessage }) => (isMyMessage ? "55%" : "65%")};
  margin-bottom: 6px;
`;

const Footer = styled(Paper)`
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  bottom: 0px;
  z-index: 1000;
  width: 100%;
  max-width: 400px;
  height: 55px;
  background-color: white;
  border-radius: 0px;
  padding: 0px 10px;
`;

const ChatRoomView = ({
  onBack,
  onChangeText,
  onSendMessage,
  onEnterPress,
  onConvertDate,
  messages,
  text,
  isEmpty,
  user,
  currentUser,
  messagesEndRef,
}: IChatRoomProps) => {
  return (
    <Container>
      <Header>
        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
        <Typography>{user.nickname}</Typography>
      </Header>
      <Content>
        {messages.map((message) => {
          const isMyMessage = currentUser.uid === message.senderId;
          const convertedDate = onConvertDate(message.date);

          return (
            <MessageWrapper isMyMessage={isMyMessage} key={message.id}>
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
        })}
        <Box ref={messagesEndRef} />
      </Content>
      <Footer>
        <TextField
          value={text}
          onChange={onChangeText}
          inputProps={{
            onKeyPress: onEnterPress,
          }}
          fullWidth
          size="small"
        />
        <Button
          disabled={isEmpty}
          variant="outlined"
          sx={{ height: "40px", width: "70px" }}
          onClick={onSendMessage}
        >
          <SendIcon />
        </Button>
      </Footer>
    </Container>
  );
};

export default ChatRoomView;
