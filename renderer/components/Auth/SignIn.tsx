import { useState } from "react";
import { useRouter } from "next/router";

import SignInView from "./Views/SignInView";
import { ILoginProps } from "./types";
import useSignIn from "../../hooks/mutation/useSignIn";
import { emailValidator, passwordValidator } from "../../utils/authValidator";

const SignIn = () => {
  const { push, replace } = useRouter();
  const { mutate: signInMutate } = useSignIn(replace);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validData, setValidData] = useState({
    isEmailValid: false,
    isPasswordValid: false,
  });
  const isNotEnterEmail = email.length === 0;
  const isNotEnterPassword = password.length === 0;

  const loginProps: ILoginProps = {
    email,
    password,
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
    onLogin: () => signInMutate({ email, password }),
    onGoToSignUp: () => push("/sign-up"),
    validData,
    isNotEnterEmail,
    isNotEnterPassword,
  };

  return <SignInView {...loginProps} />;
};

export default SignIn;
