import { createEvent, createStore, sample } from "effector";

import {
  HEAD_NAVIGATION_COLOR,
  headNavigationCenterChanged,
  headNavigationColorChanged,
  headNavigationLeftChanged,
  headNavigationRightChanged,
  headNavigationVisibilityChanged,
} from "~/features/head-navigation/model.tsx";

import { forgotPasswordQuery } from "~/shared/api/forgot-password.ts";
import { routes } from "~/shared/routing";
import { chainAnonymous } from "~/shared/session";

import { Center, Left, Right } from "./views.tsx";

export const currentRoute = routes.forgot_password;

chainAnonymous(currentRoute, { otherwise: routes.home.open });

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

export const forgotFormSubmitted = createEvent<{ email: string }>();

sample({
  clock: forgotFormSubmitted,
  target: forgotPasswordQuery.start,
});

export const $forgotPasswordEmail = createStore<string | null>(null);

sample({
  clock: forgotPasswordQuery.finished.success,
  fn: function ({ params }) {
    return params.email;
  },
  target: $forgotPasswordEmail,
});
