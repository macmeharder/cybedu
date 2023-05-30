import { createStore, sample } from "effector";

import { getTopicQuery } from "~/entities/topic/api.ts";

export interface ITopic {
  id: number;
  name: string;
  short_description: string;
  subject_id: number;
}
export const $topic = createStore<ITopic | null>(null);

sample({
  clock: getTopicQuery.finished.success,
  fn: function ({ result }) {
    return result.topics[0];
  },
  target: $topic,
});
