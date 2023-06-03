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
  changeViewerPasswordMutation,
  IChangeViewerPasswordParams,
} from "~/entities/viewer/api.ts";

import { routes } from "~/shared/routing/routing.ts";
import { chainAuthorized } from "~/shared/session";

import { Center, Left, Right } from "./views.tsx";

export const currentRoute = routes.change_password;

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

export const changeViewerPasswordFormSubmitted =
  createEvent<IChangeViewerPasswordParams>();

sample({
  clock: changeViewerPasswordFormSubmitted,
  target: changeViewerPasswordMutation.start,
});

sample({
  clock: changeViewerPasswordMutation.finished.success,
  fn: function () {
    alert("Вы успешно изменили пароль");
  },
});
