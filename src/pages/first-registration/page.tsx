import { Link } from "atomic-router-react";
import { useUnit } from "effector-react";
import { useForm } from "react-hook-form";

import {
  $registerForm,
  firstRegistrationFormSubmitted,
} from "~/features/registration";
import { IFirstRegistrationForm } from "~/features/registration/model.ts";

import { routes } from "~/shared/routing";
import { registerSchema } from "~/shared/schemas";
import { Button } from "~/shared/ui/button.tsx";
import { Input } from "~/shared/ui/input.tsx";
import { Logotype } from "~/shared/ui/logotype.tsx";

export function FirstRegistrationPage() {
  return (
    <div className="flex h-full flex-col items-center gap-6">
      <Logotype className="mb-8 mt-20" />
      <Form />
    </div>
  );
}

function Form() {
  const { registerForm, firstRegistrationFormSubmittedFn } = useUnit({
    registerForm: $registerForm,
    firstRegistrationFormSubmittedFn: firstRegistrationFormSubmitted,
  });

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<IFirstRegistrationForm>();

  return (
    <form
      id="register-form"
      className="flex w-full max-w-md flex-1 flex-col items-center gap-4"
      onSubmit={handleSubmit(firstRegistrationFormSubmittedFn)}
    >
      <div className="flex w-full flex-col gap-4">
        <Input
          label="Имя"
          type="text"
          placeholder="Введите ваше имя"
          defaultValue={registerForm?.first_name}
          register={register("first_name", registerSchema.firstname)}
        />
        <Input
          label="Фамилия"
          type="text"
          placeholder="Введите вашу фамилию"
          defaultValue={registerForm?.last_name}
          register={register("last_name", registerSchema.lastname)}
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
