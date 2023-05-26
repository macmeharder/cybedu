import { sample } from "effector";

import {
  headNavigationCenterChanged,
  headNavigationLeftChanged,
  headNavigationRightChanged,
} from "~/shared/features/head-navigation/model.tsx";
import { routes } from "~/shared/routing/routing.ts";

import { Center, Left, Right } from "./views.tsx";

export const currentRoute = routes.register_2;

sample({
  clock: currentRoute.opened,
  target: [
    headNavigationLeftChanged.prepend(Left),
    headNavigationCenterChanged.prepend(Center),
    headNavigationRightChanged.prepend(Right),
  ],
});
