import { createRouteView } from "atomic-router-react";

import { CabinetLayout } from "~/widgets/layouts/cabinet-layout.tsx";

import { PageLoader } from "~/shared/ui/page-loader.tsx";

import { authorizedRoute, currentRoute } from "./model.tsx";
import { ProfilePage } from "./page.tsx";

const AuthorizedRoute = createRouteView({
  view: ProfilePage,
  route: authorizedRoute,
  otherwise: PageLoader,
});

export const ProfileRoute = {
  view: AuthorizedRoute,
  route: currentRoute,
  layout: CabinetLayout,
  otherwise: PageLoader,
};
