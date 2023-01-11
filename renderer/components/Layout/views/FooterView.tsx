import styled from "@emotion/styled";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import { IFooterProps } from "../types";

const PaperContainer = styled(Paper)`
  position: fixed;
  bottom: 0px;
  z-index: 1000;
  width: 100%;
  max-width: 400px;
  height: 55px;
  background-color: white;
  border-radius: 0px;

  .MuiBottomNavigation-root {
    width: 100%;
    height: 55px;
  }

  .MuiButtonBase-root {
    max-width: 200px;
  }
`;

const FooterView = ({ onGoToUsers, onGoToChatList, tab }: IFooterProps) => {
  return (
    <PaperContainer elevation={2}>
      <BottomNavigation value={tab}>
        <BottomNavigationAction
          onClick={onGoToUsers}
          value="users"
          icon={<PersonIcon />}
        />
        <BottomNavigationAction
          onClick={onGoToChatList}
          value="chatList"
          icon={<ChatBubbleIcon fontSize="small" />}
        />
      </BottomNavigation>
    </PaperContainer>
  );
};

export default FooterView;
