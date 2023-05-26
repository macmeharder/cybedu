import { AnonymousLayout } from "~/widgets/layouts/anonymous/anonymous-layout.tsx";

import { currentRoute } from "./model.ts";
import { SecondRegistrationPage } from "./page.tsx";

export const SecondRegistrationRoute = {
  route: currentRoute,
  view: SecondRegistrationPage,
  layout: AnonymousLayout,
};
