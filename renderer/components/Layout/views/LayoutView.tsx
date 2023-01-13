import styled from "@emotion/styled";
import AppProtect from "../../Common/AppProtect";
import Footer from "../Footer";
import Header from "../Header";
import { ILayoutProps } from "../types";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;

const InnerWrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  max-height: 600px;
  height: 100%;
  width: 100%;
`;

const Content = styled.div<{ isVisible: boolean }>`
  margin: ${({ isVisible }) => (isVisible ? "55px 0px" : "0px")};
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

const LayoutView = ({ children, isVisible }: ILayoutProps) => {
  return (
    <Container>
      <InnerWrapper>
        <AppProtect>
          {isVisible && <Header />}
          <Content isVisible={isVisible}>{children}</Content>
          {isVisible && <Footer />}
        </AppProtect>
      </InnerWrapper>
    </Container>
  );
};

export default LayoutView;
