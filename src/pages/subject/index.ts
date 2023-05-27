import { createRouteView } from "atomic-router-react";

import { CabinetLayout } from "~/widgets/layouts/cabinet-layout.tsx";

import { PageLoader } from "~/shared/ui/page-loader.tsx";

import { authorizedRoute, currentRoute, subjectLoadedRoute } from "./model.tsx";
import { SubjectPage } from "./page.tsx";

const SubjectLoadedRouteView = createRouteView<unknown, { id: string }, any>({
  view: SubjectPage,
  route: subjectLoadedRoute,
  otherwise: PageLoader,
});

const AuthorizedRoute = createRouteView<unknown, { id: string }, any>({
  view: SubjectLoadedRouteView,
  route: authorizedRoute,
  otherwise: PageLoader,
});

export const SubjectRoute = {
  view: AuthorizedRoute,
  route: currentRoute,
  layout: CabinetLayout,
  otherwise: PageLoader,
};
