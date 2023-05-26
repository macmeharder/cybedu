import { RouteInstance } from "atomic-router";
import { Link } from "atomic-router-react";
import clsx from "clsx";

import { getImageUrl } from "~/shared/images";
import { ReactComponent as SubjectBorder } from "~/shared/images/subject-border.svg";

export function SubjectItem({
  lesson = true,
  test = true,
  to,
  id,
}: {
  lesson?: boolean;
  test?: boolean;
  to: RouteInstance<any>;
  id: number;
}) {
  return (
    <Link
      to={to}
      params={{ id }}
      className="relative flex h-28 w-28 select-none flex-col"
    >
      <SubjectBorder
        className={clsx(lesson ? "text-ce-yellow" : "text-ce-gray-2")}
      />
      <div className="absolute left-1/2 top-1/2 -z-10 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-b-8 border-ce-purple-dark bg-ce-purple">
        <img
          alt=""
          src={getImageUrl(`./subjects/${id}.png`)}
          className="mt-1"
        />
      </div>
      <SubjectBorder
        className={clsx(
          "rotate-180 transform",
          test ? "text-ce-yellow" : "text-ce-gray-2"
        )}
      />
    </Link>
  );
}
