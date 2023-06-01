import { Link } from "atomic-router-react";
import { useUnit } from "effector-react";

import {
  $registerForm,
  thirdRegistrationFormSubmitted,
} from "~/features/registration";

import { routes } from "~/shared/routing";
import { Logotype } from "~/shared/ui/logotype.tsx";
import { VerificationCode } from "~/shared/ui/verification-code.tsx";

export function ThirdRegistrationPage() {
  return (
    <div className="flex h-full flex-col items-center gap-6">
      <Logotype className="mb-8 mt-20" />
      <Form />
    </div>
  );
}

function Form() {
  const { registerForm, thirdRegistrationFormSubmittedFn } = useUnit({
    registerForm: $registerForm,
    thirdRegistrationFormSubmittedFn: thirdRegistrationFormSubmitted,
  });

  return (
    <div className="flex flex-1 flex-col items-center gap-7">
      <div className="flex flex-col gap-4">
        <p className="text-center text-sm">
          Мы отправили код на почту{" "}
          <span className="whitespace-nowrap text-ce-purple">
            {registerForm?.email}
          </span>
          <br />
          Введите код для активации аккаунта.
        </p>
      </div>
      <VerificationCode
        length={6}
        onSubmit={thirdRegistrationFormSubmittedFn}
      />
      <Bottom />
    </div>
  );
}

function Bottom() {
  return (
    <p className="w-full text-center text-sm mb-safe">
      Не получили sms?{" "}
      <Link to={routes.login} className="text-ce-purple">
        Отправить код повторно
      </Link>
      .
    </p>
  );
}
