import {
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import styled from "@emotion/styled";

import { IChatRoomProps } from "../types";
import Message from "../Message";

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
  messages,
  text,
  isEmpty,
  user,
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
          return <Message key={message.id} user={user} message={message} />;
        })}
        <Box ref={messagesEndRef} />
      </Content>
      <Footer>
        <TextField
          value={text}
          inputProps={{ onKeyPress: onEnterPress, onChange: onChangeText }}
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
