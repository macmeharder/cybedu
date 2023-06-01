import { createQuery } from "@farfetched/core";

import { request } from "~/shared/api/request.ts";

import { IOption } from "./model.ts";

export const getOptionsQuery = createQuery<
  { id: number },
  { answer_option: IOption[] }
>({
  handler: async function ({ id }) {
    return await request({
      endpoint: `/ansOpt/byQuestionId/${id}`,
      method: "GET",
    });
  },
});
