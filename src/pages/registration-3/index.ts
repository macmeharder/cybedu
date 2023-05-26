import { AnonymousLayout } from "~/widgets/layouts/anonymous/anonymous-layout.tsx";

import { currentRoute } from "./model.ts";
import { ThirdRegistrationPage } from "./page.tsx";

export const ThirdRegistrationRoute = {
  route: currentRoute,
  view: ThirdRegistrationPage,
  layout: AnonymousLayout,
};
