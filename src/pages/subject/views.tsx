import { useUnit } from "effector-react";

import { $subject } from "~/entities/subject/model.ts";

import { getImageUrl } from "~/shared/images";
import { BackButton } from "~/shared/ui/back-button.tsx";

export function Left() {
  return <BackButton className="flex-1 text-white" />;
}
export function Center() {
  const { subject } = useUnit({ subject: $subject });

  return <h3 className="flex flex-[2] justify-center">{subject.name}</h3>;
}
export function Right() {
  const { subject } = useUnit({ subject: $subject });

  return (
    <div className="flex flex-1 justify-end">
      <img alt="" src={getImageUrl(`./subjects/${subject.id}.png`)} />
    </div>
  );
}
