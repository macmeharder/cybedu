import { useUnit } from "effector-react";
import { useForm } from "react-hook-form";

import { registerSchema, resetSchema } from "~/shared/schemas/shemas.ts";
import { PasswordInput } from "~/shared/ui/password-input.tsx";

import { changeViewerPasswordFormSubmitted } from "./model.tsx";

export function ChangePasswordPage() {
  const { changeViewerPasswordFormSubmittedFn } = useUnit({
    changeViewerPasswordFormSubmittedFn: changeViewerPasswordFormSubmitted,
  });
  const { register, handleSubmit, watch } = useForm<{
    current_password: string;
    new_password: string;
    confirmPassword: string;
  }>();
  return (
    <div className="flex h-full flex-col gap-10 pt-safe">
      <form
        className="flex flex-col gap-4"
        id="change-password"
        onSubmit={handleSubmit(function (data) {
          changeViewerPasswordFormSubmittedFn({
            password: data.new_password,
          });
        })}
      >
        <PasswordInput
          label="Текущий пароль"
          placeholder="Введите текущий пароль"
          register={register("current_password", resetSchema.password)}
        />
        <PasswordInput
          label="Новый пароль"
          placeholder="Введите пароль"
          register={register("new_password", registerSchema.password)}
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
      </form>
    </div>
  );
}
