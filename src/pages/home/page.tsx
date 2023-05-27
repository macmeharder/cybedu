import { useUnit } from "effector-react";

import { $subjects } from "~/entities/subject/model.ts";

import { routes } from "~/shared/routing";
import { SubjectItem } from "~/shared/ui/subject-item.tsx";

// const subject = [
//   {
//     id: "4",
//     lesson: true,
//     test: true,
//   },
//   {
//     id: "5",
//     lesson: true,
//     test: false,
//   },
//   {
//     id: "2",
//     lesson: true,
//     test: false,
//   },
//   {
//     id: "3",
//     lesson: true,
//     test: false,
//   },
//   {
//     id: "1",
//     lesson: true,
//     test: false,
//   },
// ];

export function HomePage() {
  const { subjects } = useUnit({ subjects: $subjects });
  return (
    <div className="flex flex-wrap-reverse justify-center gap-x-14 gap-y-11 py-10">
      {subjects.map(function (subject) {
        return (
          <SubjectItem to={routes.subject} {...subject} key={subject.id} />
        );
      })}
    </div>
  );
}
