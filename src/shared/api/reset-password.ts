import { createMutation } from "@farfetched/core";

import { ISession } from "~/shared/session";

import { request } from "./request";

export interface IResetPasswordParams {
  new_password: string;
  code: string;
}

export const resetPasswordQuery = createMutation<
  IResetPasswordParams,
  ISession
>({
  handler: async function ({ new_password, code }) {
    return request({
      method: "POST",
      endpoint: `/auth/reset-password?code=${code}`,
      body: {
        new_password,
      },
    });
  },
});
