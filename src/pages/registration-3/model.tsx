import { sample } from "effector";

import {
  HEAD_NAVIGATION_COLOR,
  headNavigationCenterChanged,
  headNavigationColorChanged,
  headNavigationLeftChanged,
  headNavigationRightChanged,
  headNavigationVisibilityChanged,
} from "~/features/head-navigation/model.tsx";

import { routes } from "~/shared/routing/routing.ts";
import { chainAnonymous } from "~/shared/session";

import { Center, Left, Right } from "./views.tsx";

export const currentRoute = routes.register_3;

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
