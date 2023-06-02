import { chainRoute, RouteParamsAndQuery } from "atomic-router";
import { createEvent, createStore, sample } from "effector";

import { bottomNavigationVisibilityChanged } from "~/features/bottom-navigation/model.ts";
import { headNavigationVisibilityChanged } from "~/features/head-navigation/model.tsx";

import { getQuizProgressQuery } from "~/entities/quiz/api.ts";
import { $quiz, IQuizProgress } from "~/entities/quiz/model.ts";

import { routes } from "~/shared/routing/routing.ts";
import { chainAuthorized } from "~/shared/session";

export const currentRoute = routes.quiz_progress;

sample({
  clock: currentRoute.opened,
  source: $quiz,
  target: [
    headNavigationVisibilityChanged.prepend(() => false),
    bottomNavigationVisibilityChanged.prepend(() => false),
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
