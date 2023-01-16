import { css, Global } from "@emotion/react";
import reset from "emotion-reset";

const styles = css`
  ${reset}
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;

const GlobalStyle = () => {
  return <Global styles={styles} />;
};

export default GlobalStyle;
