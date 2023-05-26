import { createEvent, createStore } from "effector";
import { persist } from "effector-storage/local";

export interface ISession {
  token: string;
}

export const tokenChanged = createEvent<string>();
export const $token = createStore<string | null>(null);
$token.on(tokenChanged, (_, payload) => payload);

persist({ store: $token, key: "token" });
