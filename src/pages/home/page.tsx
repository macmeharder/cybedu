import { useUnit } from "effector-react";

import { $subjects } from "~/entities/subject/model.ts";

import { routes } from "~/shared/routing";
import { SubjectItem } from "~/shared/ui/subject-item.tsx";

export function HomePage() {
  const { subjects } = useUnit({ subjects: $subjects });
  return (
    <div className="flex flex-wrap justify-center gap-x-14 gap-y-11 py-6">
      {subjects.map(function (subject) {
        return <SubjectItem to={routes.topic} {...subject} key={subject.id} />;
      })}
    </div>
  );
}
