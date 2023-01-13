import styled from "@emotion/styled";
import { Typography } from "@mui/material";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const Empty = ({ text }: { text: string }) => {
  return (
    <Container>
      <Typography fontWeight="700">{text}</Typography>
    </Container>
  );
};

export default Empty;
