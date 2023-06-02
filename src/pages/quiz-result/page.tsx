import { useUnit } from "effector-react";

import { $quizResult } from "~/pages/quiz-result/model.tsx";

export function QuizResultPage() {
  const { result } = useUnit({
    result: $quizResult,
  });

  console.log(result);

  return <div className="flex h-full flex-col gap-10">{result?.Grade}</div>;
}
