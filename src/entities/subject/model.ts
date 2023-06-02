import { createStore, sample } from "effector";

import { getSubjectsProgressQuery, getSubjectsQuery } from "./api";

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

export interface ISubjectProgress {
  subject_id: number;
  quiz_passed: boolean;
  topic_completed: boolean;
}
export const $subjectsProgress = createStore<ISubjectProgress[]>([]);

sample({
  clock: getSubjectsProgressQuery.finished.success,
  fn: function ({ result }) {
    return result.topic_progress;
  },
  target: $subjectsProgress,
});
