import { Link } from "atomic-router-react";
import { useUnit } from "effector-react";

import { $quizResult } from "~/pages/quiz-result/model.tsx";

import { router, routes } from "~/shared/routing";

export function QuizResultPage() {
  const { result } = useUnit({
    result: $quizResult,
  });

  // const isSuccess = result && result.Grade > 60;

  return (
    <div className="flex h-full flex-col items-center gap-10">
      <div className="flex flex-1 shrink-0 flex-col items-center justify-center text-gray-700">
        <h2 className="text-xl">Вы набрали</h2>
        <div className="text-7xl font-bold tracking-widest">
          {result?.QuestionsCorrect}/{result?.QuestionsAnswered}
        </div>
      </div>
      <div className="flex w-full flex-col">
        <Link
          to={routes.home}
          color="danger"
          className="w-full p-4 text-center text-ce-red"
        >
          Закончить
        </Link>
        <button
          color="white"
          className="w-full p-4 text-center text-ce-purple"
          onClick={() => router.back()}
        >
          Пройти еще раз
        </button>
      </div>
    </div>
  );
}
