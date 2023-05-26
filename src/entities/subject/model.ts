import { createStore, sample } from "effector";

import { getSubjectsQuery } from "./api";

export interface ISubject {
  id: number;
  name: string;
  short_description: string;
}
export const $subjects = createStore<ISubject[]>([]);

sample({
  clock: getSubjectsQuery.finished.success,
  fn: function ({ result }) {
    return result.subjects;
  },
  target: $subjects,
});
