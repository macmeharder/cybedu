import clsx from "clsx";
import { useUnit } from "effector-react";
import { useForm } from "react-hook-form";

import { $activeQuestion } from "~/pages/quiz/model.tsx";

import { $options } from "~/entities/option/model.ts";

import { Button } from "~/shared/ui/button.tsx";

export function QuizPage() {
  const { activeQuestion, options } = useUnit({
    activeQuestion: $activeQuestion,
    options: $options,
  });

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm();

  if (!activeQuestion) return null;
  return (
    <div className="flex h-full flex-col gap-10">
      <h2 className="text-center">{activeQuestion.question_text}</h2>
      <form
        className="flex h-full flex-col gap-6"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <div className="grid grid-cols-2 gap-4">
          {options.map(function (option) {
            return (
              <div className="col-span-1 flex w-full" key={option.id}>
                <input
                  type="radio"
                  className="peer sr-only"
                  id={`${option.question_id}-${option.id}`}
                  value={option.id}
                  {...register(`test-${option.question_id}`, {
                    required: true,
                  })}
                />
                <label
                  htmlFor={`${option.question_id}-${option.id}`}
                  className={clsx(
                    "flex w-full items-center justify-center rounded-2xl border-2 border-ce-blue-gray p-2.5 text-center",
                    "peer-checked:border-ce-purple"
                  )}
                >
                  {option.answer_text}
                </label>
              </div>
            );
          })}
        </div>
        <Button className="mt-auto" disabled={!isValid}>
          Ответить
        </Button>
      </form>
    </div>
  );
}
