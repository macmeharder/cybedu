import { Link } from "atomic-router-react";
import { useUnit } from "effector-react";
import { useForm } from "react-hook-form";

import {
  $registerForm,
  ISecondRegistrationForm,
  secondRegistrationFormSubmitted,
} from "~/features/registration";

import { routes } from "~/shared/routing";
import { registerSchema } from "~/shared/schemas";
import { Button } from "~/shared/ui/button.tsx";
import { Input } from "~/shared/ui/input.tsx";
import { Logotype } from "~/shared/ui/logotype.tsx";
import { PasswordInput } from "~/shared/ui/password-input.tsx";

export function SecondRegistrationPage() {
  return (
    <div className="flex h-full flex-col items-center gap-6">
      <Logotype className="mb-8 mt-20" />
      <Form />
    </div>
  );
}

function Form() {
  const { registerForm, secondRegistrationFormSubmittedFn } = useUnit({
    registerForm: $registerForm,
    secondRegistrationFormSubmittedFn: secondRegistrationFormSubmitted,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { isValid },
  } = useForm<ISecondRegistrationForm>();

  return (
    <form
      id="register-form"
      className="flex w-full max-w-md flex-1 flex-col items-center gap-4"
      onSubmit={handleSubmit(secondRegistrationFormSubmittedFn)}
    >
      <div className="flex w-full flex-col gap-4">
        <Input
          label="E-mail"
          type="email"
          placeholder="Введите вашу почту"
          defaultValue={registerForm?.email}
          register={register("email", registerSchema.email)}
        />
        <PasswordInput
          label="Пароль"
          placeholder="Введите пароль"
          register={register("password", registerSchema.password)}
        />
        <PasswordInput
          label="Подтвердите пароль"
          placeholder="Введите пароль повторно"
          register={register("confirmPassword", {
            validate: (value) =>
              value === watch("password") ||
              "Passwords do not match. Please try again",
            ...registerSchema.confirmPassword,
          })}
        />
      </div>
      <Button className="mt-auto" disabled={!isValid}>
        Далее
      </Button>
      <Bottom />
    </form>
  );
}

function Bottom() {
  return (
    <p className="w-full text-center text-sm mb-safe">
      Уже есть аккаунт?{" "}
      <Link to={routes.login} className="text-ce-purple">
        Войдите.
      </Link>
    </p>
  );
}
