import { useUnit } from "effector-react";

import { $learningContent } from "~/entities/learning-content/model.ts";

export function LearningContentPage() {
  const { learningContent } = useUnit({ learningContent: $learningContent });
  return (
    <div className="flex items-center gap-5">
      <p className="whitespace-pre-wrap">{learningContent?.learning_text}</p>
    </div>
  );
}
