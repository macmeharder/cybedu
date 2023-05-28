import { createQuery } from "@farfetched/core";

import { request } from "~/shared/api/request.ts";

import { ISubject } from "./model.ts";

export const getTopicQuery = createQuery<{ id: string }, ISubject>({
  handler: async function ({ id }) {
    return await request({
      endpoint: `/topics/bySubjectId/${id}`,
      method: "GET",
    });
  },
});
