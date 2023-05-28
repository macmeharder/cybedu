import { chainRoute, RouteParamsAndQuery } from "atomic-router";
import { createEvent, sample } from "effector";

import {
  headNavigationCenterChanged,
  headNavigationLeftChanged,
  headNavigationRightChanged,
} from "~/features/head-navigation/model.tsx";

import { getSubjectQuery } from "~/entities/subject/api.ts";
import { $subject } from "~/entities/subject/model.ts";

import { routes } from "~/shared/routing/routing.ts";
import { chainAuthorized } from "~/shared/session";

import { Center, Left, Right } from "./views.tsx";

export const currentRoute = routes.subject;

sample({
  clock: currentRoute.opened,
  source: $subject,
  target: [
    headNavigationLeftChanged.prepend(() => <Left />),
    headNavigationCenterChanged.prepend(() => <Center />),
    headNavigationRightChanged.prepend(() => <Right />),
  ],
});

export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.login.open,
});

const loadData = createEvent<RouteParamsAndQuery<{ id: string }>>();

sample({
  clock: loadData,
  source: getSubjectQuery.$pending,
  filter: (pending) => !pending,
  fn: function (_, { params }) {
    return params;
  },
  target: getSubjectQuery.start,
});

export const subjectLoadedRoute = chainRoute({
  route: authorizedRoute,
  beforeOpen: loadData,
  openOn: getSubjectQuery.finished.success,
});
