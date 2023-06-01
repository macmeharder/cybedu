import { createStore, sample } from "effector";

import { getOptionsQuery } from "./api.ts";

export interface IOption {
  id: number;
  answer_text: string;
  question_id: number;
  is_correct: boolean;
}
export const $options = createStore<IOption[]>([]);

sample({
  clock: getOptionsQuery.finished.success,
  fn: function ({ result }) {
    return result.answer_option;
  },
  target: $options,
});
