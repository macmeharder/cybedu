import { createQuery } from "@farfetched/core";

import { request } from "~/shared/api/request.ts";

import { ILearningContent } from "./model.ts";

export const getLearningContentQuery = createQuery<
  { id: string },
  { learning_content: ILearningContent[] }
>({
  handler: async function ({ id }) {
    return await request({
      endpoint: `/lc/byTopicId/${id}`,
      method: "GET",
    });
  },
});
