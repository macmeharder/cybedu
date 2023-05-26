import { AnonymousLayout } from "~/widgets/layouts/anonymous/anonymous-layout.tsx";

import { currentRoute } from "./model.ts";
import { LoginPage } from "./page.tsx";

export const LoginRoute = {
  route: currentRoute,
  view: LoginPage,
  layout: AnonymousLayout,
};
