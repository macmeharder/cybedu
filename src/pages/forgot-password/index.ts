import { AnonymousLayout } from "~/widgets/layouts/anonymous-layout.tsx";

import { currentRoute } from "./model.tsx";
import { ForgotPasswordPage } from "./page.tsx";

export const ForgotPasswordRoute = {
  route: currentRoute,
  view: ForgotPasswordPage,
  layout: AnonymousLayout,
};
