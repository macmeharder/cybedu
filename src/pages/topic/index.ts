import { createRouteView } from "atomic-router-react";

import { CabinetLayout } from "~/widgets/layouts/cabinet-layout.tsx";

import { PageLoader } from "~/shared/ui/page-loader.tsx";

import { authorizedRoute, currentRoute, topicLoadedRoute } from "./model.tsx";
import { TopicPage } from "./page.tsx";

const TopicLoadedRouteView = createRouteView<unknown, { id: string }, any>({
  view: TopicPage,
  route: topicLoadedRoute,
  otherwise: PageLoader,
});

const AuthorizedRoute = createRouteView<unknown, { id: string }, any>({
  view: TopicLoadedRouteView,
  route: authorizedRoute,
  otherwise: PageLoader,
});

export const TopicRoute = {
  view: AuthorizedRoute,
  route: currentRoute,
  layout: CabinetLayout,
  otherwise: PageLoader,
};
