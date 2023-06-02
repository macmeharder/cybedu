import { createQuery } from "@farfetched/core";

import { request } from "~/shared/api/request.ts";

import { IQuiz, IQuizProgress } from "./model.ts";

export const getQuizQuery = createQuery<{ id: string }, { quizs: IQuiz[] }>({
  handler: async function ({ id }) {
    return await request({
      endpoint: `/quiz/byTopicId/${id}`,
      method: "GET",
    });
  },
});

export const getQuizProgressQuery = createQuery<
  void,
  { quizs: IQuizProgress[] }
>({
  handler: async function () {
    const userId = localStorage.getItem("userId");

    return await request({
      endpoint: `/quiz/progress/byUserId?user_id=${userId}`,
      method: "GET",
    });
  },
});
