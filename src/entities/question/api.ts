import { createQuery } from "@farfetched/core";

import { request } from "~/shared/api/request.ts";

import { IQuestion, IQuestionProgress } from "./model.ts";

export const getQuestionsQuery = createQuery<
  { id: number },
  { questions: IQuestion[] }
>({
  handler: async function ({ id }) {
    return await request({
      endpoint: `/question/byQuizId/${id}`,
      method: "GET",
    });
  },
});

export interface IQuestionsProgressParams {
  user_id: string;
  quiz_id: number;
  question_id: number;
  answer_id: number;
}

export const setQuestionsProgressMutation = createQuery<
  IQuestionsProgressParams,
  IQuestionProgress
>({
  handler: async function (body) {
    console.log("asdf");
    return await request({
      endpoint: `/qp`,
      method: "POST",
      body: {
        ...body,
        attempt_number: 1,
      },
    });
  },
});
