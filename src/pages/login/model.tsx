import { createEffect, sample } from "effector";

import {
  HEAD_NAVIGATION_COLOR,
  headNavigationCenterChanged,
  headNavigationColorChanged,
  headNavigationLeftChanged,
  headNavigationRightChanged,
  headNavigationVisibilityChanged,
} from "~/features/head-navigation/model.tsx";

import { ILoginMutationParams, loginMutation } from "~/shared/api/login.ts";
import { routes } from "~/shared/routing/routing.ts";
import {
  chainAnonymous,
  ISession,
  setTokenFx,
  setUserIdFx,
} from "~/shared/session";

import { Center, Left, Right } from "./views.tsx";

export const currentRoute = routes.login;

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

chainAnonymous(currentRoute, { otherwise: routes.home.open });

export const submitLoginFormFx = createEffect<ILoginMutationParams, void>(
  loginMutation.start
);

sample({
  clock: loginMutation.finished.success,
  target: [
    setTokenFx.prepend((payload: { result: ISession }) => payload.result.token),
    setUserIdFx.prepend(
      (payload: { result: ISession }) => payload.result.user.user_id
    ),
  ],
});
