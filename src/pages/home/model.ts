import { chainRoute } from "atomic-router";
import { sample } from "effector";

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
    headNavigationLeftChanged.prepend(Left),
    headNavigationCenterChanged.prepend(Center),
    headNavigationRightChanged.prepend(Right),
  ],
});

export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.login.open,
});

export const subjectsLoadedRoute = chainRoute({
  route: authorizedRoute,
  beforeOpen: getSubjectsQuery.start,
  openOn: getSubjectsQuery.finished.success,
});
