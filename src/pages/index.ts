import { createRoutesView } from "atomic-router-react";

import { FirstRegistrationRoute } from "~/pages/first-registration";
import { ForgotPasswordRoute } from "~/pages/forgot-password";
import { LoginRoute } from "~/pages/login";

export const RoutesView = createRoutesView({
  routes: [LoginRoute, ForgotPasswordRoute, FirstRegistrationRoute],
});
