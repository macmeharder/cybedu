import { createQuery } from "@farfetched/core";

import { request } from "~/shared/api/request.ts";
import { sessionCheckFx } from "~/shared/session";

import { IViewer } from "./model.ts";

export const getViewerQuery = createQuery<any, IViewer>({
  handler: async function () {
    const userId = localStorage.getItem("userId");

    return await request({
      endpoint: `/auth/${userId}`,
      method: "GET",
    });
  },
});

export interface IChangeViewerParams {
  first_name: string;
  last_name: string;
}

export const changeViewerMutation = createQuery<IChangeViewerParams, IViewer>({
  handler: async function (body) {
    const userId = localStorage.getItem("userId");

    return await request({
      endpoint: `/auth/${userId}`,
      method: "PUT",
      body,
    });
  },
});

export interface IChangeViewerPasswordParams {
  password: string;
}
export const changeViewerPasswordMutation = createQuery<
  IChangeViewerPasswordParams,
  IViewer
>({
  handler: async function ({ password }) {
    const userId = localStorage.getItem("userId");

    return await request({
      endpoint: `/auth/${userId}`,
      method: "PUT",
      body: {
        password,
      },
    });
  },
});

export const deleteViewerMutation = createQuery<void, any>({
  handler: async function () {
    const userId = localStorage.getItem("userId");

    return await request({
      endpoint: `/auth/${userId}`,
      method: "DELETE",
    }).finally(function () {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      sessionCheckFx();
    });
  },
});
