import { AnonymousLayout } from "~/widgets/layouts/anonymous-layout.tsx";

import { currentRoute } from "./model.tsx";
import { FirstRegistrationPage } from "./page.tsx";

export const FirstRegistrationRoute = {
  route: currentRoute,
  view: FirstRegistrationPage,
  layout: AnonymousLayout,
};
