import { createRoutesView, createRouteView } from "atomic-router-react";

import { CabinetLayout } from "~/widgets/layouts/cabinet-layout.tsx";

import { PageLoader } from "~/shared/ui/page-loader.tsx";

import { authorizedRoute, currentRoute, subjectsLoadedRoute } from "./model.ts";
import { HomePage } from "./page.tsx";

const SubjectsLoadedRouteView = createRouteView({
  view: HomePage,
  route: subjectsLoadedRoute,
  otherwise: PageLoader,
});

const AuthorizedRoute = {
  view: SubjectsLoadedRouteView,
  route: authorizedRoute,
};

export const HomeRoute = {
  view: createRoutesView({
    routes: [AuthorizedRoute],
  }),
  route: currentRoute,
  layout: CabinetLayout,
  otherwise: PageLoader,
};
