import {
  chainRoute,
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
} from "atomic-router";
import { createEvent, createStore, Effect, Event, sample } from "effector";
import { persist } from "effector-storage/local";

export interface ISession {
  token: string;
}

export const tokenChanged = createEvent<string>();
export const $token = createStore<string | null>(null);
$token.on(tokenChanged, (_, payload) => payload);

persist({ store: $token, key: "token" });

interface ChainParams {
  otherwise?: Event<void> | Effect<void, any, any>;
}

export function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams = {}
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: [sessionCheckStarted, $token],
    source: $token,
    filter: (source) => Boolean(source),
  });

  const alreadyAnonymous = sample({
    clock: [sessionCheckStarted, $token],
    source: $token,
    filter: (source) => !Boolean(source),
  });

  if (otherwise) {
    sample({
      clock: alreadyAnonymous,
      target: otherwise as Event<void>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: alreadyAuthenticated,
    cancelOn: alreadyAnonymous,
  });
}

export function chainAnonymous<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams = {}
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: [sessionCheckStarted, $token],
    source: $token,
    filter: (source) => Boolean(source),
  });

  const alreadyAnonymous = sample({
    clock: [sessionCheckStarted, $token],
    source: $token,
    filter: (source) => !Boolean(source),
  });

  if (otherwise) {
    sample({
      clock: alreadyAuthenticated,
      target: otherwise as Event<void>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: alreadyAnonymous,
    cancelOn: alreadyAuthenticated,
  });
}
