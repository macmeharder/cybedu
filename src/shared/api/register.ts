import { createMutation } from "@farfetched/core";

import { request } from "~/shared/request";

export const registerMutation = createMutation<any, any>({
  handler: async ({ ...body }) => {
    return request({
      method: "POST",
      endpoint: "/auth/register",
      body,
    });
  },
});
