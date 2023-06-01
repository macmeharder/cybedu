import { createStore, sample } from "effector";

import { getQuizQuery } from "./api.ts";

export interface IQuiz {
  id: number;
  name: string;
  topic_id: number;
}
export const $quiz = createStore<IQuiz | null>(null);

sample({
  clock: getQuizQuery.finished.success,
  fn: function ({ result }) {
    return result.quizs[0];
  },
  target: $quiz,
});
