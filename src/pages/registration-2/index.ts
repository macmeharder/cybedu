import { AnonymousLayout } from "~/widgets/layouts/anonymous-layout.tsx";

import { currentRoute } from "./model.tsx";
import { SecondRegistrationPage } from "./page.tsx";

export const SecondRegistrationRoute = {
  route: currentRoute,
  view: SecondRegistrationPage,
  layout: AnonymousLayout,
};
