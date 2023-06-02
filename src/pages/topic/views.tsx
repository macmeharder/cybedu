import { useUnit } from "effector-react";

import { $topic } from "~/entities/topic/model.ts";

import { BackButton } from "~/shared/ui/back-button.tsx";

export function Left() {
  return <BackButton className="flex-1 text-white" />;
}
export function Center() {
  const { topic } = useUnit({ topic: $topic });

  return <h3 className="flex flex-[2] justify-center">{topic?.name}</h3>;
}
export function Right() {
  const { topic } = useUnit({ topic: $topic });

  return (
    <div className="flex flex-1 justify-end">
      <img alt="" src={`/images/subjects/${topic?.id}.png`} />
    </div>
  );
}
