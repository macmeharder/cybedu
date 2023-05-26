import { createEffect, sample } from "effector";

import { ILoginMutationParams, loginMutation } from "~/shared/api/login.ts";
import {
  headNavigationCenterChanged,
  headNavigationLeftChanged,
  headNavigationRightChanged,
} from "~/shared/features/head-navigation/model.tsx";
import { routes } from "~/shared/routing/routing.ts";
import { tokenChanged } from "~/shared/session";

import { Center, Left, Right } from "./views.tsx";

export const currentRoute = routes.login;

sample({
  clock: currentRoute.opened,
  target: [
    headNavigationLeftChanged.prepend(Left),
    headNavigationCenterChanged.prepend(Center),
    headNavigationRightChanged.prepend(Right),
  ],
});

export const submitLoginFormFx = createEffect<ILoginMutationParams, void>(
  loginMutation.start
);

sample({
  clock: loginMutation.finished.success,
  fn: function ({ result }) {
    return result.token;
  },
  target: tokenChanged,
});
