import { createEvent, createStore, sample } from "effector";

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

export interface ISecondRegistrationForm {
  code: string;
}

export const thirdRegistrationFormSubmitted = createEvent();

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

export const registerCodeRequested = createEvent();

sample({
  source: $registerForm,
  clock: registerCodeRequested,
  // fn: function (source) {
  // delete source?.confirmPassword;
  // return { ...source, gender: "Male" };
  // },
  // target: registerMutation.start,
});

// sample({
// clock: registerMutation.finished.success,
// fn: function ({ result }) {
//   return result.token;
// },
// target: setTokenEv,
// });
