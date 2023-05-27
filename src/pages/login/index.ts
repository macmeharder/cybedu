import { AnonymousLayout } from "~/widgets/layouts/anonymous-layout.tsx";

import { currentRoute } from "./model.tsx";
import { LoginPage } from "./page.tsx";

export const LoginRoute = {
  route: currentRoute,
  view: LoginPage,
  layout: AnonymousLayout,
};
