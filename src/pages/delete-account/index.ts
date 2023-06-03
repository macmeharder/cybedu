import { createRouteView } from "atomic-router-react";

import { CabinetLayout } from "~/widgets/layouts/cabinet-layout.tsx";

import { PageLoader } from "~/shared/ui/page-loader.tsx";

import { authorizedRoute, currentRoute } from "./model.tsx";
import { DeleteAccountPage } from "./page.tsx";

const AuthorizedRoute = createRouteView<unknown, any, any>({
  view: DeleteAccountPage,
  route: authorizedRoute,
  otherwise: PageLoader,
});

export const DeleteAccountRoute = {
  view: AuthorizedRoute,
  route: currentRoute,
  layout: CabinetLayout,
  otherwise: PageLoader,
};
