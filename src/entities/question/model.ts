import { createStore, sample } from "effector";

import { getQuestionsQuery } from "./api.ts";

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
