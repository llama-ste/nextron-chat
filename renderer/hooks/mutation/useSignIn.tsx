import { useMutation } from "react-query";
import { FirebaseError } from "firebase/app";

import { IUserInfo } from "../../components/Auth/types";
import { TReplaceFn } from "../../types/next-router";
import { signIn } from "../../common/firebase";
import useToastMessage from "../common/useToastMessage";
import { authErrorCode } from "../../common/firebase";

const useSignIn = (replace: TReplaceFn) => {
  const showToast = useToastMessage();

  return useMutation((userInfo: IUserInfo) => signIn(userInfo), {
    onError: (error: FirebaseError) => {
      showToast("warning", authErrorCode[error.code]);
    },
    onSuccess: (data) => {
      replace("/users");
    },
  });
};

export default useSignIn;
