import styled from "@emotion/styled";
import Footer from "../Footer";
import Header from "../Header";
import { ILayoutProps } from "../types";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const InnerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 400px;
  height: 100vh;
  width: 100%;
`;

const Content = styled.div<{ isNotAuthPage: boolean }>`
  margin: ${({ isNotAuthPage }) => (isNotAuthPage ? "55px 0px" : "0px")};
  height: 100%;
  width: 100%;
  overflow: scroll;
`;

const LayoutView = ({ children, isNotAuthPage }: ILayoutProps) => {
  return (
    <Container>
      <InnerWrapper>
        {isNotAuthPage && <Header />}
        <Content isNotAuthPage={isNotAuthPage}>{children}</Content>
        {isNotAuthPage && <Footer />}
      </InnerWrapper>
    </Container>
  );
};

export default LayoutView;
