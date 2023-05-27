import { chainRoute, RouteParamsAndQuery } from "atomic-router";
import { createEvent, sample } from "effector";

import {
  headNavigationCenterChanged,
  headNavigationLeftChanged,
  headNavigationRightChanged,
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
  ],
});

export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.login.open,
});

const loadData = createEvent<RouteParamsAndQuery<{}>>();

sample({
  clock: loadData,
  source: getSubjectsQuery.$pending,
  filter: (pending) => !pending,
  target: getSubjectsQuery.start,
});

export const subjectsLoadedRoute = chainRoute({
  route: authorizedRoute,
  beforeOpen: loadData,
  openOn: getSubjectsQuery.finished.success,
});
