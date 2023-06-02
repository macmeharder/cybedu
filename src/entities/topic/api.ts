import { createMutation, createQuery } from "@farfetched/core";

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

export const setTopicProgressMutation = createMutation<{ id: number }, unknown>(
  {
    handler: async function ({ id }) {
      const user_id = localStorage.getItem("userId");
      return await request({
        endpoint: `/tp`,
        method: "POST",
        body: {
          user_id,
          topic_id: id,
          completed: true,
        },
      });
    },
  }
);
