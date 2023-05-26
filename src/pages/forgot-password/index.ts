import { AnonymousLayout } from "~/widgets/layouts/anonymous/anonymous-layout.tsx";

import { currentRoute } from "./model.ts";
import { ForgotPasswordPage } from "./page.tsx";

export const ForgotPasswordRoute = {
  route: currentRoute,
  view: ForgotPasswordPage,
  layout: AnonymousLayout,
};
