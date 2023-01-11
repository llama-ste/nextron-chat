export interface IUserInfo {
  email: string;
  password: string;
}

interface IAuthForm extends IUserInfo {
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  validData: { isEmailValid: boolean; isPasswordValid: boolean };
  isNotEnterEmail: boolean;
  isNotEnterPassword: boolean;
}

export interface ILoginProps extends IAuthForm {
  onLogin: () => void;
  onGoToSignUp: () => void;
}

export interface ISignUpProps extends IAuthForm {
  onSignUp: () => void;
  onBack: () => void;
}
