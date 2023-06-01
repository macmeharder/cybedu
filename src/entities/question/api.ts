import { createQuery } from "@farfetched/core";

import { request } from "~/shared/api/request.ts";

import { IQuestion } from "./model.ts";

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
