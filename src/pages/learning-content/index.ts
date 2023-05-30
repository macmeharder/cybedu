import { createRouteView } from "atomic-router-react";

import { LearningContentPage } from "~/pages/learning-content/page.tsx";

import { CabinetLayout } from "~/widgets/layouts/cabinet-layout.tsx";

import { PageLoader } from "~/shared/ui/page-loader.tsx";

import { authorizedRoute, currentRoute, dataLoadedRoute } from "./model.tsx";

const DataLoadedRouteView = createRouteView<unknown, { id: string }, any>({
  view: LearningContentPage,
  route: dataLoadedRoute,
  otherwise: PageLoader,
});

const AuthorizedRoute = createRouteView<unknown, { id: string }, any>({
  view: DataLoadedRouteView,
  route: authorizedRoute,
  otherwise: PageLoader,
});

export const LearningContentRoute = {
  view: AuthorizedRoute,
  route: currentRoute,
  layout: CabinetLayout,
  otherwise: PageLoader,
};
