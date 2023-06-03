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

import {
  changeViewerMutation,
  getViewerQuery,
  IChangeViewerParams,
} from "~/entities/viewer/api.ts";

import { routes } from "~/shared/routing/routing.ts";
import { chainAuthorized } from "~/shared/session";

import { Center, Left, Right } from "./views.tsx";

export const currentRoute = routes.profile_settings;

sample({
  clock: currentRoute.opened,
  target: [
    headNavigationLeftChanged.prepend(() => <Left />),
    headNavigationCenterChanged.prepend(() => <Center />),
    headNavigationRightChanged.prepend(() => <Right />),
    headNavigationColorChanged.prepend(() => HEAD_NAVIGATION_COLOR.WHITE),
    headNavigationVisibilityChanged.prepend(() => true),

    bottomNavigationActiveItemChanged.prepend(() => BOTTOM_NAV_ITEM.PROFILE),
    bottomNavigationVisibilityChanged.prepend(() => true),
  ],
});

export const authorizedRoute = chainAuthorized(currentRoute, {
  otherwise: routes.login.open,
});

const loadData = createEvent<RouteParamsAndQuery<{ id: string }>>();

sample({
  clock: loadData,
  source: getViewerQuery.$pending,
  filter: (pending) => !pending,
  target: getViewerQuery.start,
});

export const dataLoadedRoute = chainRoute({
  route: authorizedRoute,
  beforeOpen: loadData,
  openOn: getViewerQuery.finished.success,
});

export const changeViewerFormSubmitted = createEvent<IChangeViewerParams>();

sample({
  clock: changeViewerFormSubmitted,
  target: changeViewerMutation.start,
});

sample({
  clock: changeViewerMutation.finished.success,
  fn: function () {
    alert("Вы успешно изменили данные");
  },
});
