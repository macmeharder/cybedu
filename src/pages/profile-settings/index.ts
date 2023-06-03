import { createRouteView } from "atomic-router-react";

import { CabinetLayout } from "~/widgets/layouts/cabinet-layout.tsx";

import { PageLoader } from "~/shared/ui/page-loader.tsx";

import { authorizedRoute, currentRoute, dataLoadedRoute } from "./model.tsx";
import { ProfileSettingsPage } from "./page.tsx";

const DataLoadedRouteView = createRouteView<unknown, any, any>({
  view: ProfileSettingsPage,
  route: dataLoadedRoute,
  otherwise: PageLoader,
});

const AuthorizedRoute = createRouteView<unknown, any, any>({
  view: DataLoadedRouteView,
  route: authorizedRoute,
  otherwise: PageLoader,
});

export const ProfileSettingsRoute = {
  view: AuthorizedRoute,
  route: currentRoute,
  layout: CabinetLayout,
  otherwise: PageLoader,
};
