import { createMutation } from "@farfetched/core";

import { ISession } from "~/shared/session";

import { request } from "./request";

export interface IForgotPasswordParams {
  email: string;
}

export const forgotPasswordQuery = createMutation<
  IForgotPasswordParams,
  ISession
>({
  handler: async function ({ email }) {
    return request({
      method: "GET",
      endpoint: `/auth/reset-password/${email}`,
    });
  },
});
