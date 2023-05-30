import { createRoutesView } from "atomic-router-react";

import { ForgotPasswordRoute } from "~/pages/forgot-password";
import { HomeRoute } from "~/pages/home";
import { LoginRoute } from "~/pages/login";
import { FirstRegistrationRoute } from "~/pages/registration-1";
import { SecondRegistrationRoute } from "~/pages/registration-2";
import { ThirdRegistrationRoute } from "~/pages/registration-3";
import { TopicRoute } from "~/pages/topic";

export const RoutesView = createRoutesView({
  routes: [
    LoginRoute,
    ForgotPasswordRoute,
    FirstRegistrationRoute,
    SecondRegistrationRoute,
    ThirdRegistrationRoute,
    HomeRoute,
    TopicRoute,
  ],
});
