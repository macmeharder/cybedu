import { useUnit } from "effector-react";

import { $quiz } from "~/entities/quiz/model.ts";

import { getImageUrl } from "~/shared/images";
import { BackButton } from "~/shared/ui/back-button.tsx";

export function Left() {
  return <BackButton className="flex-1 text-white" />;
}
export function Center() {
  return <h3 className="flex flex-[2] justify-center">Тест</h3>;
}
export function Right() {
  const { quiz } = useUnit({ quiz: $quiz });

  return (
    <div className="flex flex-1 justify-end">
      <img alt="" src={getImageUrl(`./subjects/${quiz?.topic_id}.png`)} />
    </div>
  );
}
