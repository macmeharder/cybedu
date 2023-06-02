import { createQuery } from "@farfetched/core";

import { request } from "~/shared/api/request.ts";

import { ISubject, ISubjectProgress } from "./model.ts";

export const getSubjectsQuery = createQuery<any, { subjects: ISubject[] }>({
  handler: async function () {
    return await request({
      endpoint: "/subjects",
      method: "GET",
    });
  },
});
export const getSubjectsProgressQuery = createQuery<
  any,
  { topic_progress: ISubjectProgress[] }
>({
  handler: async function () {
    const userId = localStorage.getItem("userId");

    return await request({
      endpoint: `/sp/byUserId?user_id=${userId}`,
      method: "GET",
    });
  },
});
