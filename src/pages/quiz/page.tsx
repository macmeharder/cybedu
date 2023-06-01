import clsx from "clsx";
import { useUnit } from "effector-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { $activeQuestion, questionSubmit } from "~/pages/quiz/model.tsx";

import { $options } from "~/entities/option/model.ts";

import { Button } from "~/shared/ui/button.tsx";

export function QuizPage() {
  const { activeQuestion, options, questionSubmitFn } = useUnit({
    activeQuestion: $activeQuestion,
    options: $options,
    questionSubmitFn: questionSubmit,
  });

  const {
    handleSubmit,
    register,
    formState: { isValid },
  } = useForm<{ answer_id: string }>();

  const onSubmit: SubmitHandler<{ answer_id: string }> = function ({
    answer_id,
  }) {
    const user_id = localStorage.getItem("userId");
    if (!user_id || !activeQuestion) return null;

    questionSubmitFn({
      question_id: activeQuestion?.id,
      answer_id: parseInt(answer_id),
      quiz_id: activeQuestion?.quiz_id,
      user_id,
    });
  };

  if (!activeQuestion) return null;

  return (
    <div className="flex h-full flex-col gap-10">
      <h2 className="text-center">{activeQuestion.question_text}</h2>
      <form
        className="flex h-full flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
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
                  {...register(`answer_id`, {
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
