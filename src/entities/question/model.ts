import { createStore, sample } from "effector";

import {
  getQuestionsQuery,
  IQuestionsProgressParams,
  setQuestionsProgressMutation,
} from "./api.ts";

export interface IQuestion {
  id: number;
  question_text: string;
  quiz_id: number;
}
export const $questions = createStore<IQuestion[]>([]);

sample({
  clock: getQuestionsQuery.finished.success,
  fn: function ({ result }) {
    return result.questions;
  },
  target: $questions,
});

export interface IQuestionProgress {
  id: number;
  user_id: string;
  quiz_id: number;
  question_id: number;
  attempt_number: number;
  answer_id: number;
  is_correct: boolean;
}

export const $questionsProgress = createStore<IQuestionsProgressParams | null>(
  null
);

sample({
  clock: setQuestionsProgressMutation.finished.success,
  fn: function ({ result }) {
    return result;
  },
  target: $questionsProgress,
});
