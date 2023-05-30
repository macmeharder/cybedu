import { createQuery } from "@farfetched/core";

import { request } from "~/shared/api/request.ts";

import { ITopic } from "./model.ts";

export const getTopicQuery = createQuery<{ id: string }, { topics: ITopic[] }>({
  handler: async function ({ id }) {
    return await request({
      endpoint: `/topics/bySubjectId/${id}`,
      method: "GET",
    });
  },
});
