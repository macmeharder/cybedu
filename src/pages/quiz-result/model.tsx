import { chainRoute, RouteParamsAndQuery } from "atomic-router";
import { createEvent, createStore, sample } from "effector";

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

import { getQuizProgressQuery } from "~/entities/quiz/api.ts";
import { IQuizProgress } from "~/entities/quiz/model.ts";

import { routes } from "~/shared/routing/routing.ts";
import { chainAuthorized } from "~/shared/session";

import { Center, Left, Right } from "./views.tsx";

export const currentRoute = routes.quiz_progress;

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
  source: getQuizProgressQuery.$pending,
  filter: (pending) => !pending,
  target: getQuizProgressQuery.start,
});

export const $quizResult = createStore<IQuizProgress | null>(null);

sample({
  clock: getQuizProgressQuery.finished.success,
  source: currentRoute.$params,
  fn: function ({ id }, { result }) {
    console.log(id, result);
    return (
      result.quizs.find(function (quiz) {
        return quiz.QuizID.toString() === id;
      }) || null
    );
  },
  target: $quizResult,
});

export const dataLoadedRoute = chainRoute({
  route: authorizedRoute,
  beforeOpen: loadData,
  openOn: getQuizProgressQuery.finished.success,
});
