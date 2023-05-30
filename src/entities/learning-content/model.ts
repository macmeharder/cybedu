import { createStore, sample } from "effector";

import { getLearningContentQuery } from "~/entities/learning-content/api.ts";

export interface ILearningContent {
  id: number;
  topic_id: number;
  learning_text: string;
}
export const $learningContent = createStore<ILearningContent | null>(null);

sample({
  clock: getLearningContentQuery.finished.success,
  fn: function ({ result }) {
    return result.learning_content[0];
  },
  target: $learningContent,
});
