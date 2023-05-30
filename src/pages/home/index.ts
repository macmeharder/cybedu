import { createRouteView } from "atomic-router-react";

import { CabinetLayout } from "~/widgets/layouts/cabinet-layout.tsx";

import { PageLoader } from "~/shared/ui/page-loader.tsx";

import { authorizedRoute, currentRoute, dataLoadedRoute } from "./model.tsx";
import { HomePage } from "./page.tsx";

const DataLoadedRouteView = createRouteView<unknown, { id: string }, any>({
  view: HomePage,
  route: dataLoadedRoute,
  otherwise: PageLoader,
});

const AuthorizedRoute = createRouteView<unknown, { id: string }, any>({
  view: DataLoadedRouteView,
  route: authorizedRoute,
  otherwise: PageLoader,
});

export const HomeRoute = {
  view: AuthorizedRoute,
  route: currentRoute,
  layout: CabinetLayout,
  otherwise: PageLoader,
};
