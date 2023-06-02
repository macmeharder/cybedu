import { useUnit } from "effector-react";

import { $subjects, $subjectsProgress } from "~/entities/subject/model.ts";

import { routes } from "~/shared/routing";
import { SubjectItem } from "~/shared/ui/subject-item.tsx";

export function HomePage() {
  const { subjects, progress } = useUnit({
    subjects: $subjects,
    progress: $subjectsProgress,
  });
  return (
    <div className="flex flex-wrap justify-center gap-x-14 gap-y-11 py-6">
      {subjects.map(function (subject) {
        const withProgress = progress.find(
          (item) => item.subject_id === subject.id
        );
        if (withProgress) {
          return (
            <SubjectItem
              test={withProgress.quiz_passed}
              lesson={withProgress.topic_completed}
              to={routes.topic}
              {...subject}
              key={subject.id}
            />
          );
        }
        return <SubjectItem to={routes.topic} {...subject} key={subject.id} />;
      })}
    </div>
  );
}
