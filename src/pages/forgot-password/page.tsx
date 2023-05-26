import { useUnit } from "effector-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { forgotFormSubmitted } from "~/pages/forgot-password/model.ts";
import { Button } from "~/shared/ui/button";
import { Input } from "~/shared/ui/input";
import { Logotype } from "~/shared/ui/logotype.tsx";

export function ForgotPasswordPage() {
  return (
    <div className="flex h-full flex-col items-center gap-6">
      <Logotype className="mb-8 mt-20" />
      <Form />
    </div>
  );
}
export function Form() {
  //   todo remove
  const [state, setState] = useState(false);
  const { forgotFormSubmittedFn } = useUnit({
    forgotFormSubmittedFn: forgotFormSubmitted,
  });
  const { register, handleSubmit } = useForm();
  return (
    <div className="flex w-full max-w-md flex-1 flex-col items-center gap-10">
      <form
        className="flex w-full flex-col gap-4"
        onSubmit={handleSubmit(forgotFormSubmittedFn)}
      >
        <Input label="E-mail" type="email" register={register("email")} />
        <Button onClick={() => setState(true)}>Восстановить пароль</Button>
      </form>
      {state && (
        <p className="rounded-2xl bg-green-200 p-4 text-sm text-green-500">
          На почту <span className="text-ce-purple">name@mail.com</span> была
          выслана инструкция по изменению пароля. Пожалуйста, проверьте свою
          почту
        </p>
      )}
    </div>
  );
}
