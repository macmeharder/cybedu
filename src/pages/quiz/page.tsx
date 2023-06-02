import clsx from "clsx";
import { useUnit } from "effector-react";
import { SubmitHandler, useForm } from "react-hook-form";

import {
  $activeQuestion,
  $activeQuestionNextId,
  activeQuestionNext,
  questionSubmit,
} from "~/pages/quiz/model.tsx";

import { getOptionsQuery } from "~/entities/option/api.ts";
import { $options } from "~/entities/option/model.ts";
import { setQuestionsProgressMutation } from "~/entities/question/api.ts";
import { $questionsProgress } from "~/entities/question/model.ts";

import { routes } from "~/shared/routing";
import { Button } from "~/shared/ui/button.tsx";
import { PageLoader } from "~/shared/ui/page-loader.tsx";

export function QuizPage() {
  const {
    activeQuestion,
    activeQuestionNextId,
    activeQuestionNextFn,
    options,
    questionSubmitFn,
    questionProgress,
  } = useUnit({
    activeQuestion: $activeQuestion,
    activeQuestionNextId: $activeQuestionNextId,
    activeQuestionNextFn: activeQuestionNext,
    options: $options,
    questionSubmitFn: questionSubmit,
    questionProgress: $questionsProgress,
  });

  const progressMutation = useUnit(setQuestionsProgressMutation);
  const optionsQuery = useUnit(getOptionsQuery);

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

  if (!activeQuestion || optionsQuery.pending) return <PageLoader />;

  const isSubmitted = questionProgress?.question_id === activeQuestion.id;

  return (
    <div className="flex h-full flex-col gap-10">
      <h2 className="text-center">{activeQuestion.question_text}</h2>
      <form
        className="flex h-full flex-col gap-6"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid gap-4">
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
                  disabled={isSubmitted}
                />
                <label
                  htmlFor={`${option.question_id}-${option.id}`}
                  className={clsx(
                    "flex w-full items-center justify-center rounded-2xl border-2 border-ce-blue-gray p-2.5 text-center",
                    {
                      "peer-checked:border-ce-purple": !isSubmitted,
                      "peer-checked:border-ce-green":
                        isSubmitted && questionProgress?.is_correct === true,
                      "peer-checked:border-ce-red":
                        isSubmitted && questionProgress?.is_correct === false,
                    }
                  )}
                >
                  {option.answer_text}
                </label>
              </div>
            );
          })}
        </div>
        {!isSubmitted && (
          <Button
            className="mt-auto"
            disabled={!isValid || progressMutation.pending}
          >
            Ответить
          </Button>
        )}
        {isSubmitted && activeQuestionNextId !== "finish" && (
          <Button className="mt-auto" onClick={() => activeQuestionNextFn()}>
            Далее
          </Button>
        )}
        {isSubmitted && activeQuestionNextId === "finish" && (
          <Button
            className="mt-auto"
            to={routes.quiz_progress}
            params={{ id: activeQuestion.quiz_id }}
          >
            Закончить
          </Button>
        )}
      </form>
    </div>
  );
}
