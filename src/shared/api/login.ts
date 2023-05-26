import { createMutation } from "@farfetched/core";

import { ISession } from "~/shared/session";

import { request } from "./request";

export interface ILoginMutationParams {
  email: string;
  password: string;
}

export const loginMutation = createMutation<ILoginMutationParams, ISession>({
  handler: async function ({ ...body }) {
    return request({
      method: "POST",
      endpoint: "/auth/login",
      body,
    });
  },
});
