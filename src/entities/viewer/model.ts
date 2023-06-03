import { createStore, sample } from "effector";

import { getViewerQuery } from "./api";

export interface IViewer {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
}
export const $viewer = createStore<IViewer | null>(null);

sample({
  clock: getViewerQuery.finished.success,
  fn: function ({ result }) {
    return result;
  },
  target: $viewer,
});
