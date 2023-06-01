import { createMutation } from "@farfetched/core";

import { ISession } from "~/shared/session";

import { request } from "./request.ts";

export interface IRegistrationParams {
  email?: string;
  password?: string;
  confirmPassword?: string;
  first_name?: string;
  last_name?: string;
}

export const registerMutation = createMutation<IRegistrationParams, ISession>({
  handler: async ({ confirmPassword, ...body }) => {
    return request({
      method: "POST",
      endpoint: "/auth/register",
      body: {
        ...body,
        gender: "Male",
      },
    });
  },
});

export interface IVerifyEmailParams {
  email: string;
  verification_code: string;
}

export const verifyEmailMutation = createMutation<IVerifyEmailParams, null>({
  handler: async function (body) {
    return request({
      method: "POST",
      endpoint: "/auth/verify",
      body,
    });
  },
});
