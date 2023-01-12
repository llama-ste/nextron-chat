import { Box, LinearProgress } from "@mui/material";
import styled from "@emotion/styled";

interface ILoadingBar {
  isLoading: boolean;
}

const StyledBox = styled(Box)`
  background-color: transparent;
  height: 100vh;
  position: fixed;
  max-width: 400px;
  top: 55;
  width: 100%;
  z-index: 10000;
`;

const LoadingBar = ({ isLoading }: ILoadingBar) => {
  return (
    <>
      {isLoading && (
        <StyledBox>
          <LinearProgress />
        </StyledBox>
      )}
    </>
  );
};

export default LoadingBar;
