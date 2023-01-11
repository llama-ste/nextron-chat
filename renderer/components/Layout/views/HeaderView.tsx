import styled from "@emotion/styled";
import { Button, Paper, Typography } from "@mui/material";
import { IHeaderProps } from "../types";

const PaperContainer = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  top: 0px;
  z-index: 1000;
  width: 100%;
  max-width: 400px;
  height: 55px;
  padding: 0px 15px;
  background-color: white;
  border-radius: 0px;
`;

const HeaderView = ({ onLogout, title }: IHeaderProps) => {
  return (
    <PaperContainer elevation={1}>
      <Typography variant="h5" fontSize="18px" fontWeight="700">
        {title}
      </Typography>
      <Button onClick={onLogout}>로그아웃</Button>
    </PaperContainer>
  );
};

export default HeaderView;
