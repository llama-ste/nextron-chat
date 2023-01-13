import styled from "@emotion/styled";
import { TextField, Button, Typography } from "@mui/material";

import { ILoginProps } from "../types";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0px 50px;
  gap: 20px;
`;

const UnderLineTypography = styled(Typography)`
  text-decoration: underline;

  :hover {
    cursor: pointer;
  }
`;

const SignInView = ({
  onEmailChange,
  onPasswordChange,
  onLogin,
  onGoToSignUp,
  email,
  password,
  validData,
  isNotEnterEmail,
  isNotEnterPassword,
}: ILoginProps) => {
  return (
    <Container>
      <Typography
        textAlign="center"
        variant="h4"
        fontSize="30px"
        fontWeight="bold"
      >
        Nextron Chat
      </Typography>
      <TextField
        label="Email"
        value={email}
        onChange={onEmailChange}
        error={isNotEnterEmail ? false : !validData.isEmailValid}
        helperText={
          isNotEnterEmail || validData.isEmailValid
            ? ""
            : "이메일 형식에 맞게 입력해주세요."
        }
      />
      <TextField
        type="password"
        label="Password"
        value={password}
        onChange={onPasswordChange}
        error={isNotEnterPassword ? false : !validData.isPasswordValid}
        helperText={
          isNotEnterPassword || validData.isPasswordValid
            ? ""
            : "비밀번호는 6자리 이상이어야 합니다."
        }
      />
      <Button onClick={onLogin} size="large" variant="contained">
        로그인
      </Button>
      <Typography textAlign="center" variant="caption">
        아이디가 없으신가요?{" "}
        <UnderLineTypography onClick={onGoToSignUp} variant="button">
          회원가입
        </UnderLineTypography>
      </Typography>
    </Container>
  );
};

export default SignInView;
