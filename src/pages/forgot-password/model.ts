import { createEvent, sample } from "effector";

import {
  headNavigationCenterChanged,
  headNavigationLeftChanged,
  headNavigationRightChanged,
} from "~/shared/features/head-navigation/model.tsx";
import { routes } from "~/shared/routing";

import { Center, Left, Right } from "./views.tsx";

export const currentRoute = routes.forgot_password;

sample({
  clock: currentRoute.opened,
  target: [
    headNavigationLeftChanged.prepend(Left),
    headNavigationCenterChanged.prepend(Center),
    headNavigationRightChanged.prepend(Right),
  ],
});

export const forgotFormSubmitted = createEvent();
