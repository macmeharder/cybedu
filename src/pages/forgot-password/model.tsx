import { createEvent, sample } from "effector";

import {
  headNavigationCenterChanged,
  headNavigationLeftChanged,
  headNavigationRightChanged,
} from "~/features/head-navigation/model.tsx";

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
  ],
});

export const forgotFormSubmitted = createEvent();
