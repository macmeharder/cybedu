import { createRouteView } from "atomic-router-react";

import { AnonymousLayout } from "~/widgets/layouts/anonymous-layout.tsx";

import { PageLoader } from "~/shared/ui/page-loader.tsx";

import { anonymousRoute, currentRoute } from "./model.tsx";
import { ResetPasswordPage } from "./page.tsx";

const AnonymousRoute = createRouteView<unknown, { code: string }, any>({
  view: ResetPasswordPage,
  route: anonymousRoute,
  otherwise: PageLoader,
});

export const ResetPasswordRoute = {
  view: AnonymousRoute,
  route: currentRoute,
  layout: AnonymousLayout,
  otherwise: PageLoader,
};
