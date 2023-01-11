import styled from "@emotion/styled";
import { TextField, Button, Typography, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { ISignUpProps } from "../types";

const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 300px;
  height: 100vh;
  gap: 20px;
`;

const StyledIconBtn = styled(IconButton)`
  position: absolute;
  top: 20px;
  left: 20px;
`;

const SignUpView = ({
  onEmailChange,
  onPasswordChange,
  onSignUp,
  onBack,
  email,
  password,
  validData,
  isNotEnterEmail,
  isNotEnterPassword,
}: ISignUpProps) => {
  return (
    <Container>
      <StyledIconBtn onClick={onBack}>
        <ArrowBackIcon fontSize="large" />
      </StyledIconBtn>
      <Typography
        textAlign="center"
        variant="h4"
        fontSize="30px"
        fontWeight="bold"
      >
        회원가입
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
      <Button onClick={onSignUp} size="large" variant="contained">
        완료
      </Button>
    </Container>
  );
};

export default SignUpView;
