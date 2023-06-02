import { useUnit } from "effector-react";

import { $subjects, $subjectsProgress } from "~/entities/subject/model.ts";

import { ProgressBar } from "~/shared/ui/progress-bar.tsx";

export function Left() {
  const { subjects, progress } = useUnit({
    subjects: $subjects,
    progress: $subjectsProgress,
  });
  const max = subjects.length * 2;
  const completed = progress.reduce(function (acc, item) {
    if (item.topic_completed) acc++;
    if (item.quiz_passed) acc++;
    return acc;
  }, 0);
  console.log(completed);
  return (
    <div className="w-full">
      <h4>Прогресс</h4>
      <div className="flex items-center gap-4">
        <ProgressBar value={completed} max={max} />
        <span>
          {completed}/{max}
        </span>
      </div>
    </div>
  );
}
export function Center() {
  return <></>;
}
export function Right() {
  return <></>;
}
