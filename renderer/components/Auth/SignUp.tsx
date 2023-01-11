import { useState } from "react";
import { useRouter } from "next/router";

import { ISignUpProps } from "./types";
import SignUpView from "./Views/SignUpView";
import { emailValidator, passwordValidator } from "../../utils/authValidator";
import useSignUp from "../../hooks/mutation/useSignUp";
import useToastMessage from "../../hooks/common/useToastMessage";

const SignUp = () => {
  const { replace, back } = useRouter();
  const { mutate: signUpMutate } = useSignUp(replace);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validData, setValidData] = useState({
    isEmailValid: false,
    isPasswordValid: false,
  });
  const showToast = useToastMessage();
  const isNotEnterEmail = email.length === 0;
  const isNotEnterPassword = password.length === 0;

  const signUpProps: ISignUpProps = {
    onEmailChange: (e) => {
      emailValidator(e.target.value)
        ? setValidData((p) => ({ ...p, isEmailValid: true }))
        : setValidData((p) => ({ ...p, isEmailValid: false }));
      setEmail(e.target.value);
    },
    onPasswordChange: (e) => {
      passwordValidator(e.target.value)
        ? setValidData((p) => ({ ...p, isPasswordValid: true }))
        : setValidData((p) => ({ ...p, isPasswordValid: false }));
      setPassword(e.target.value);
    },
    onSignUp: () => {
      if (!validData.isEmailValid || !validData.isPasswordValid) {
        showToast("warning", "이메일이나 비밀번호를 확인해주세요.");
        return;
      }
      signUpMutate({ email, password });
    },
    onBack: () => back(),
    email,
    password,
    validData,
    isNotEnterEmail,
    isNotEnterPassword,
  };

  return <SignUpView {...signUpProps} />;
};

export default SignUp;
