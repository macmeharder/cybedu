import { useUnit } from "effector-react";

import { $learningContent } from "~/entities/learning-content/model.ts";

import { getImageUrl } from "~/shared/images";
import { BackButton } from "~/shared/ui/back-button.tsx";

export function Left() {
  return <BackButton className="flex-1 text-white" />;
}
export function Center() {
  return <h3 className="flex flex-[2] justify-center">Лекция</h3>;
}
export function Right() {
  const { learningContent } = useUnit({ learningContent: $learningContent });

  return (
    <div className="flex flex-1 justify-end">
      <img
        alt=""
        src={getImageUrl(`./subjects/${learningContent?.topic_id}.png`)}
      />
    </div>
  );
}
