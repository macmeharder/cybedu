import { createEvent, sample } from "effector";

import {
  HEAD_NAVIGATION_COLOR,
  headNavigationCenterChanged,
  headNavigationColorChanged,
  headNavigationLeftChanged,
  headNavigationRightChanged,
  headNavigationVisibilityChanged,
} from "~/features/head-navigation/model.tsx";

import { resetPasswordQuery } from "~/shared/api/reset-password.ts";
import { routes } from "~/shared/routing/routing.ts";
import { chainAnonymous } from "~/shared/session";

import { Center, Left, Right } from "./views.tsx";

export const currentRoute = routes.reset_password;

sample({
  clock: currentRoute.opened,
  target: [
    headNavigationLeftChanged.prepend(() => <Left />),
    headNavigationCenterChanged.prepend(() => <Center />),
    headNavigationRightChanged.prepend(() => <Right />),
    headNavigationColorChanged.prepend(() => HEAD_NAVIGATION_COLOR.WHITE),
    headNavigationVisibilityChanged.prepend(() => true),
  ],
});

export const anonymousRoute = chainAnonymous(currentRoute, {
  otherwise: routes.login.open,
});

export const resetFormSubmitted = createEvent<{
  new_password: string;
  confirmPassword: string;
}>();

sample({
  clock: resetFormSubmitted,
  source: currentRoute.$query,
  fn: function (source, { new_password }) {
    return {
      code: source.code,
      new_password,
    };
  },
  target: resetPasswordQuery.start,
});

sample({
  clock: resetPasswordQuery.finished.success,
  fn: function () {
    alert("Вы успешно поменяли пароль");
  },
  target: routes.login.open,
});

sample({
  clock: resetPasswordQuery.finished.failure,
  fn: function () {
    alert("Ссылка на восстановление пароля истекла");
  },
});
