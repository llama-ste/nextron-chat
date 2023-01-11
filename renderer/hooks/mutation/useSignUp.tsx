import { FirebaseError } from "firebase/app";
import { useMutation } from "react-query";

import { authErrorCode, signUp } from "../../common/firebase";
import { IUserInfo } from "../../components/Auth/types";
import { TReplaceFn } from "../../types/next-router";
import useToastMessage from "../common/useToastMessage";

const useSignUp = (replace: TReplaceFn) => {
  const showToast = useToastMessage();

  return useMutation((userInfo: IUserInfo) => signUp(userInfo), {
    onError: (error: FirebaseError) => {
      showToast("warning", authErrorCode[error.code]);
    },
    onSuccess: (data) => {
      replace("/");
      showToast("success", "회원가입 되었습니다.");
    },
  });
};

export default useSignUp;
