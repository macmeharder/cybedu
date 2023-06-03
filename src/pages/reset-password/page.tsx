import { useUnit } from "effector-react";
import { useForm } from "react-hook-form";

import { routes } from "~/shared/routing";
import { resetSchema } from "~/shared/schemas/shemas.ts";
import { Button } from "~/shared/ui/button.tsx";
import { PasswordInput } from "~/shared/ui/password-input.tsx";

import { resetFormSubmitted } from "./model.tsx";

export function ResetPasswordPage() {
  const { resetFormSubmittedFn } = useUnit({
    query: routes.reset_password.$query,
    resetFormSubmittedFn: resetFormSubmitted,
  });

  const {
    register,
    handleSubmit,
    formState: { isValid },
    watch,
  } = useForm<{ new_password: string; confirmPassword: string }>();

  return (
    <div className="flex h-full flex-col gap-10 pt-safe">
      <form
        className="flex flex-col gap-4"
        id="change-password"
        onSubmit={handleSubmit(resetFormSubmittedFn)}
      >
        <PasswordInput
          label="Новый пароль"
          placeholder="Введите пароль"
          register={register("new_password", resetSchema.password)}
        />
        <PasswordInput
          label="Подтвердите пароль"
          placeholder="Введите пароль повторно"
          register={register("confirmPassword", {
            validate: (value) =>
              value === watch("new_password") ||
              "Passwords do not match. Please try again",
            ...resetSchema.confirmPassword,
          })}
        />
        <Button disabled={!isValid}>Сохранить</Button>
      </form>
    </div>
  );
}
