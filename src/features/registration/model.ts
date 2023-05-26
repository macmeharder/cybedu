import { createEvent, createStore, sample } from "effector";

import { registerMutation } from "~/shared/api/register.ts";
import { tokenChanged } from "~/shared/session";

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

export interface IThirdRegistrationForm {
  code: string;
}

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
  fn: (source) => source!,
  target: registerMutation.start,
});

sample({
  clock: registerMutation.finished.success,
  fn: function ({ result }) {
    return result.token;
  },
  target: tokenChanged,
});
