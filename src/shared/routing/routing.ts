import {
  createHistoryRouter,
  createRoute,
  createRouterControls,
} from "atomic-router";
import { sample } from "effector";
import { createBrowserHistory } from "history";

import { appStarted } from "~/shared/config/init";

export const routes = {
  login: createRoute(),
  register_1: createRoute(),
  register_2: createRoute(),
  register_3: createRoute(),
  forgot_password: createRoute(),

  home: createRoute(),
  topic: createRoute<{ id: string }>(),
  learning_content: createRoute<{ id: string }>(),
  test: createRoute<{ id: string }>(),

  profile: createRoute(),
  profile_settings: createRoute(),
  change_password: createRoute(),
  delete_account: createRoute(),
  deleted: createRoute(),
};

export const controls = createRouterControls();

export const router = createHistoryRouter({
  routes: [
    { path: "/login", route: routes.login },
    { path: "/register-1", route: routes.register_1 },
    { path: "/register-2", route: routes.register_2 },
    { path: "/register-3", route: routes.register_3 },
    { path: "/forgot-password", route: routes.forgot_password },

    { path: "/", route: routes.home },
    { path: "/topic/:id", route: routes.topic },
    { path: "/topic/:id/learning-content", route: routes.learning_content },
    { path: "/topic/:id/answer", route: routes.test },

    { path: "/profile", route: routes.profile },
    { path: "/profile/settings", route: routes.profile_settings },
    { path: "/profile/change-password", route: routes.change_password },
    { path: "/profile/delete", route: routes.delete_account },
    { path: "/profile/deleted", route: routes.deleted },
  ],
  controls,
});

sample({
  clock: appStarted,
  fn: () => createBrowserHistory(),
  target: router.setHistory,
});
