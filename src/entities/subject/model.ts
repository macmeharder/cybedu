import { createStore, sample } from "effector";

import { getSubjectQuery, getSubjectsQuery } from "./api";

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

export interface ISubject {
  id: number;
  name: string;
  short_description: string;
}
export const $subject = createStore<ISubject>({
  id: 0,
  name: "",
  short_description: "",
});

sample({
  clock: getSubjectQuery.finished.success,
  fn: function ({ result }) {
    return result;
  },
  target: $subject,
});
