import {
  confirmPasswordField,
  emailField,
  firstnameField,
  lastnameField,
  passwordField,
} from "./fields";

export const loginSchema = {
  email: emailField,
  password: passwordField,
};

export const forgotSchema = {
  email: emailField,
};

export const registerSchema = {
  firstname: firstnameField,
  lastname: lastnameField,
  email: emailField,
  password: passwordField,
  confirmPassword: confirmPasswordField,
};
