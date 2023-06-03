import { createRouteView } from "atomic-router-react";

import { CabinetLayout } from "~/widgets/layouts/cabinet-layout.tsx";

import { PageLoader } from "~/shared/ui/page-loader.tsx";

import { authorizedRoute, currentRoute } from "./model.tsx";
import { ChangePasswordPage } from "./page.tsx";

const AuthorizedRoute = createRouteView<unknown, any, any>({
  view: ChangePasswordPage,
  route: authorizedRoute,
  otherwise: PageLoader,
});

export const ChangePasswordRoute = {
  view: AuthorizedRoute,
  route: currentRoute,
  layout: CabinetLayout,
  otherwise: PageLoader,
};
