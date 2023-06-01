import {
  chainRoute,
  RouteInstance,
  RouteParams,
  RouteParamsAndQuery,
} from "atomic-router";
import {
  createEffect,
  createEvent,
  createStore,
  Effect,
  Event,
  sample,
} from "effector";

export interface ISession {
  token: string;
  user: {
    user_id: string;
  };
}

enum AuthStatus {
  Initial = 0,
  Pending,
  Anonymous,
  Authenticated,
}

export const setTokenFx = createEffect(function (token: string) {
  localStorage.setItem("token", token);
});

export const setUserIdFx = createEffect(function (userId: string) {
  localStorage.setItem("userId", userId);
});

export const sessionCheckFx = createEffect(function () {
  if (localStorage.getItem("token") === null) throw "don't have token";
});

sample({
  clock: setTokenFx.done,
  target: sessionCheckFx,
});

const $authenticationStatus = createStore(AuthStatus.Initial);

$authenticationStatus.on(sessionCheckFx, (status) => {
  if (status === AuthStatus.Initial) return AuthStatus.Pending;
  return status;
});

$authenticationStatus.on(sessionCheckFx.done, () => AuthStatus.Authenticated);

$authenticationStatus.on(sessionCheckFx.fail, () => AuthStatus.Anonymous);

interface ChainParams {
  otherwise?: Event<void> | Effect<void, any, any>;
}

export function chainAuthorized<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams = {}
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAnonymous = createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionCheckFx,
  });

  sample({
    clock: [alreadyAnonymous, sessionCheckFx.fail],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: sessionReceivedAnonymous,
  });

  if (otherwise) {
    sample({
      clock: sessionReceivedAnonymous,
      target: otherwise as Event<void>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAuthenticated, sessionCheckFx.done],
    cancelOn: sessionReceivedAnonymous,
  });
}

export function chainAnonymous<Params extends RouteParams>(
  route: RouteInstance<Params>,
  { otherwise }: ChainParams = {}
): RouteInstance<Params> {
  const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
  const sessionReceivedAuthenticated =
    createEvent<RouteParamsAndQuery<Params>>();

  const alreadyAuthenticated = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Authenticated,
  });

  const alreadyAnonymous = sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Anonymous,
  });

  sample({
    clock: sessionCheckStarted,
    source: $authenticationStatus,
    filter: (status) => status === AuthStatus.Initial,
    target: sessionCheckFx,
  });

  sample({
    clock: [alreadyAuthenticated, sessionCheckFx.done],
    source: { params: route.$params, query: route.$query },
    filter: route.$isOpened,
    target: sessionReceivedAuthenticated,
  });

  if (otherwise) {
    sample({
      clock: sessionReceivedAuthenticated,
      target: otherwise as Event<void>,
    });
  }

  return chainRoute({
    route,
    beforeOpen: sessionCheckStarted,
    openOn: [alreadyAnonymous, sessionCheckFx.fail],
    cancelOn: sessionReceivedAuthenticated,
  });
}

// interface ChainParams {
//   otherwise?: Event<void> | Effect<void, any, any>;
// }
//
// export function chainAuthorized<Params extends RouteParams>(
//   route: RouteInstance<Params>,
//   { otherwise }: ChainParams = {}
// ): RouteInstance<Params> {
//   const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
//
//   const alreadyAuthenticated = sample({
//     clock: sessionCheckStarted,
//     source: $token,
//     filter: (source) => Boolean(source),
//   });
//
//   const alreadyAnonymous = sample({
//     clock: sessionCheckStarted,
//     source: $token,
//     filter: (source) => !Boolean(source),
//   });
//
//   if (otherwise) {
//     sample({
//       clock: alreadyAnonymous,
//       target: otherwise as Event<void>,
//     });
//   }
//
//   return chainRoute({
//     route,
//     beforeOpen: sessionCheckStarted,
//     openOn: alreadyAuthenticated,
//     cancelOn: alreadyAnonymous,
//   });
// }
//
//
// export function chainAnonymous<Params extends RouteParams>(
//   route: RouteInstance<Params>,
//   { otherwise }: ChainParams = {}
// ): RouteInstance<Params> {
//   const sessionCheckStarted = createEvent<RouteParamsAndQuery<Params>>();
//
//   const alreadyAuthenticated = sample({
//     clock: sessionCheckStarted,
//     source: $token,
//     filter: (source) => Boolean(source),
//   });
//
//   const alreadyAnonymous = sample({
//     clock: sessionCheckStarted,
//     source: $token,
//     filter: (source) => !Boolean(source),
//   });
//
//   if (otherwise) {
//     sample({
//       clock: alreadyAuthenticated,
//       target: otherwise as Event<void>,
//     });
//   }
//
//   return chainRoute({
//     route,
//     beforeOpen: sessionCheckStarted,
//     openOn: alreadyAnonymous,
//     cancelOn: alreadyAuthenticated,
//   });
// }
