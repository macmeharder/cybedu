import { chainRoute, RouteParamsAndQuery } from "atomic-router";
import { createEvent, sample } from "effector";

import {
  BOTTOM_NAV_ITEM,
  bottomNavigationActiveItemChanged,
  bottomNavigationVisibilityChanged,
} from "~/features/bottom-navigation/model.ts";
import {
  HEAD_NAVIGATION_COLOR,
  headNavigationCenterChanged,
  headNavigationColorChanged,
  headNavigationLeftChanged,
  headNavigationRightChanged,
  headNavigationVisibilityChanged,
} from "~/features/head-navigation/model.tsx";

import { getSubjectsQuery } from "~/entities/subject/api.ts";

import { routes } from "~/shared/routing/routing.ts";
import { chainAuthorized } from "~/shared/session";

import { Center, Left, Right } from "./views.tsx";

export const currentRoute = routes.home;

sample({
  clock: currentRoute.opened,
  target: [
    headNavigationLeftChanged.prepend(() => <Left />),
    headNavigationCenterChanged.prepend(() => <Center />),
    headNavigationRightChanged.prepend(() => <Right />),
    headNavigationColorChanged.prepend(() => HEAD_NAVIGATION_COLOR.PURPLE),
    headNavigationVisibilityChanged.prepend(() => true),

    bottomNavigationActiveItemChanged.prepend(() => BOTTOM_NAV_ITEM.HOME),
    bottomNavigationVisibilityChanged.prepend(() => true),
  ],
});

export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.login.open,
});

const loadData = createEvent<RouteParamsAndQuery<{ id: string }>>();

sample({
  clock: loadData,
  source: getSubjectsQuery.$pending,
  filter: (pending) => !pending,
  fn: function (_, { params }) {
    return params;
  },
  target: getSubjectsQuery.start,
});

export const dataLoadedRoute = chainRoute({
  route: authorizedRoute,
  beforeOpen: loadData,
  openOn: getSubjectsQuery.finished.success,
});
