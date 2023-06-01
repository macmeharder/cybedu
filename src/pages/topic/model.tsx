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

import { getTopicQuery } from "~/entities/topic/api.ts";
import { $topic } from "~/entities/topic/model.ts";

import { routes } from "~/shared/routing/routing.ts";
import { chainAuthorized } from "~/shared/session";

import { Center, Left, Right } from "./views.tsx";

export const currentRoute = routes.topic;

sample({
  clock: currentRoute.opened,
  source: $topic,
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
  source: getTopicQuery.$pending,
  filter: (pending) => !pending,
  fn: function (_, { params }) {
    return params;
  },
  target: getTopicQuery.start,
});

export const dataLoadedRoute = chainRoute({
  route: authorizedRoute,
  beforeOpen: loadData,
  openOn: getTopicQuery.finished.success,
});
