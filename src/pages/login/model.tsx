import { createEffect, sample } from "effector";

import {
  headNavigationCenterChanged,
  headNavigationLeftChanged,
  headNavigationRightChanged,
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
