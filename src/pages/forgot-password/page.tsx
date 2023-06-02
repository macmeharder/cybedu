import { useUnit } from "effector-react";
import { useForm } from "react-hook-form";

import {
  $forgotPasswordEmail,
  forgotFormSubmitted,
} from "~/pages/forgot-password/model.tsx";

import { forgotSchema } from "~/shared/schemas/shemas.ts";
import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";

export function ForgotPasswordPage() {
  return (
    <div className="flex h-full flex-col items-center gap-6">
      <Form />
    </div>
  );
}
export function Form() {
  const { forgotFormSubmittedFn, email } = useUnit({
    forgotFormSubmittedFn: forgotFormSubmitted,
    email: $forgotPasswordEmail,
  });

  const {
    register,
    formState: { isValid },
    handleSubmit,
  } = useForm<{ email: string }>();

  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center gap-10">
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit(forgotFormSubmittedFn)}
      >
        <Input
          label="E-mail"
          type="email"
          register={register("email", forgotSchema.email)}
        />
        <Button disabled={!isValid}>Восстановить пароль</Button>
      </form>
      {email !== null && (
        <p className="rounded-2xl bg-green-100 p-4 text-sm text-green-600">
          На почту <span className="text-ce-purple">{email}</span> была выслана
          инструкция по изменению пароля. Пожалуйста, проверьте свою почту.
        </p>
      )}
    </div>
  );
}
