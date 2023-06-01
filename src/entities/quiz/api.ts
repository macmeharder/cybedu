import { createQuery } from "@farfetched/core";

import { request } from "~/shared/api/request.ts";

import { IQuiz } from "./model.ts";

export const getQuizQuery = createQuery<{ id: string }, { quizs: IQuiz[] }>({
  handler: async function ({ id }) {
    return await request({
      endpoint: `/quiz/byTopicId/${id}`,
      method: "GET",
    });
  },
});
