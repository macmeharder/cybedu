import { emailRegExp, passwordRegExp } from "./reg-exp";

export const passwordField = {
  required: "Password is required.",
  pattern: {
    value: passwordRegExp,
    message: "Wrong password format.",
  },
};

export const confirmPasswordField = {
  required: true,
  pattern: passwordRegExp,
};

export const firstnameField = {
  required: "Firstname is required.",
};
export const lastnameField = {
  required: "Lastname is required.",
};
export const emailField = {
  required: "Email is required.",
  pattern: {
    value: emailRegExp,
    message: "Wrong email format.",
  },
};
