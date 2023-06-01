import { createEvent, createStore, sample } from "effector";

import { verifyEmailMutation } from "~/shared/api/register.ts";
import { routes } from "~/shared/routing";

export interface IFirstRegistrationForm {
  first_name: string;
  last_name: string;
}
export const firstRegistrationFormSubmitted =
  createEvent<IFirstRegistrationForm>();

export interface ISecondRegistrationForm {
  email: string;
  password: string;
  confirmPassword: string;
}
export const secondRegistrationFormSubmitted =
  createEvent<ISecondRegistrationForm>();

export type IThirdRegistrationForm = string;

export const thirdRegistrationFormSubmitted =
  createEvent<IThirdRegistrationForm>();

export interface IRegistrationForm {
  email?: string;
  password?: string;
  confirmPassword?: string;
  first_name?: string;
  last_name?: string;
}
export const $registerForm = createStore<IRegistrationForm | null>(null);

$registerForm.on(firstRegistrationFormSubmitted, (source, payload) => ({
  ...source,
  ...payload,
}));

$registerForm.on(secondRegistrationFormSubmitted, (source, payload) => ({
  ...source,
  ...payload,
}));

sample({
  clock: thirdRegistrationFormSubmitted,
  source: $registerForm,
  filter: (source) => source !== null,
  fn: (source, payload) => {
    return {
      email: source!.email!,
      verification_code: payload,
    };
  },
  target: verifyEmailMutation.start,
});

sample({
  clock: verifyEmailMutation.finished.success,
  target: routes.login.open,
});
