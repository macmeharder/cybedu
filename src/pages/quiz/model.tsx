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

import { getOptionsQuery } from "~/entities/option/api.ts";
import {
  getQuestionsQuery,
  IQuestionsProgressParams,
  setQuestionsProgressMutation,
} from "~/entities/question/api.ts";
import { $questions, IQuestion } from "~/entities/question/model.ts";
import { getQuizQuery } from "~/entities/quiz/api.ts";
import { $quiz } from "~/entities/quiz/model.ts";

import { routes } from "~/shared/routing/routing.ts";
import { chainAuthorized } from "~/shared/session";

import { Center, Left, Right } from "./views.tsx";

export const currentRoute = routes.quiz;

sample({
  clock: currentRoute.opened,
  source: $quiz,
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
  source: getQuizQuery.$pending,
  filter: (pending) => !pending,
  fn: function (_, { params }) {
    return params;
  },
  target: getQuizQuery.start,
});

sample({
  clock: getQuizQuery.finished.success,
  source: getQuestionsQuery.$pending,
  filter: (pending) => !pending,
  fn: function (_, { result }) {
    return { id: result.quizs[0].id };
  },
  target: getQuestionsQuery.start,
});

export const activeQuestionNext = createEvent();
export const activeQuestionIdSet = createEvent<{ id: number }>();
export const $activeQuestionId = createStore<{ id: number } | null>(null);
$activeQuestionId.on(activeQuestionIdSet, (_, payload) => payload);

export const $activeQuestionNextId = createStore<
  { id: number } | null | "finish"
>(null);

sample({
  clock: $activeQuestionId,
  source: $questions,
  filter: function (_, payload) {
    return payload !== null;
  },
  fn: function (source, payload) {
    if (source.find((item) => item.id === payload!.id + 1)) {
      return { id: payload!.id + 1 };
    }
    return "finish";
  },
  target: $activeQuestionNextId,
});

sample({
  clock: activeQuestionNext,
  source: $activeQuestionNextId,
  filter: function (source) {
    console.log(typeof source, source);
    return source !== null && typeof source === "object";
  },
  fn: function (source) {
    return source as { id: number };
  },
  target: activeQuestionIdSet,
});

export const $activeQuestion = createStore<IQuestion | null>(null);

sample({
  clock: getQuestionsQuery.finished.success,
  source: getOptionsQuery.$pending,
  filter: (pending) => !pending,
  fn: function (_, { result }) {
    return { id: result.questions[0].id };
  },
  target: activeQuestionIdSet,
});

sample({
  clock: activeQuestionIdSet,
  source: getQuestionsQuery.$pending,
  filter: (pending) => !pending,
  fn: function (_, payload) {
    return payload;
  },
  target: getOptionsQuery.start,
});

sample({
  clock: activeQuestionIdSet,
  source: $questions,
  fn: function (questions, { id }) {
    return questions.find((question) => question.id === id) || null;
  },
  target: $activeQuestion,
});

export const dataLoadedRoute = chainRoute({
  route: authorizedRoute,
  beforeOpen: loadData,
  openOn: getOptionsQuery.finished.success,
});

export const questionSubmit = createEvent<IQuestionsProgressParams>();

sample({
  clock: questionSubmit,
  target: setQuestionsProgressMutation.start,
});

export const quizSubmit = createEvent()

sample({
  clock: quizSubmit
})