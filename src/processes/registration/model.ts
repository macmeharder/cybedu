import { sample } from "effector";

import {
  $registerForm,
  firstRegistrationFormSubmitted,
  secondRegistrationFormSubmitted,
} from "~/features/registration";

import { routes } from "~/shared/routing";

sample({
  clock: firstRegistrationFormSubmitted,
  target: routes.register_2.open,
});

sample({
  clock: routes.register_2.opened,
  source: $registerForm,
  filter: function (source) {
    return source === null;
  },
  target: routes.register_1.open,
});

sample({
  clock: secondRegistrationFormSubmitted,
  target: routes.register_3.open,
});

sample({
  clock: routes.register_3.opened,
  source: $registerForm,
  filter: function (source) {
    return source === null;
  },
  target: routes.register_1.open,
});
