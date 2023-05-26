import { createRoutesView } from "atomic-router-react";

import { ForgotPasswordRoute } from "~/pages/forgot-password";
import { LoginRoute } from "~/pages/login";
import { FirstRegistrationRoute } from "~/pages/registration-1";
import { SecondRegistrationRoute } from "~/pages/registration-2";

export const RoutesView = createRoutesView({
  routes: [
    LoginRoute,
    ForgotPasswordRoute,
    FirstRegistrationRoute,
    SecondRegistrationRoute,
  ],
});
