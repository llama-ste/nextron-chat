export const emailValidator = (email: string) => {
  return !!email.match(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/);
};

export const passwordValidator = (password: string) => {
  return !!password.match(/.{6,}/g);
};
