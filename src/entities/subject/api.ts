import { createQuery } from "@farfetched/core";

import { request } from "~/shared/api/request.ts";

import { ISubject } from "./model.ts";

export const getSubjectsQuery = createQuery<any, { subjects: ISubject[] }>({
  handler: async function () {
    return await request({
      endpoint: "/subjects",
      method: "GET",
    });
  },
});

export const getSubjectQuery = createQuery<{ id: string }, ISubject>({
  handler: async function ({ id }) {
    return await request({
      endpoint: `/subjects/${id}`,
      method: "GET",
    });
  },
});
