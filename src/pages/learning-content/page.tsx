import { useUnit } from "effector-react";

import { $learningContent } from "~/entities/learning-content/model.ts";
import { setTopicProgressMutation } from "~/entities/topic/api.ts";

import { Button } from "~/shared/ui/button.tsx";

export function LearningContentPage() {
  const { learningContent } = useUnit({ learningContent: $learningContent });

  function handleReadLesson() {
    if (!learningContent) return;
    setTopicProgressMutation.start({ id: learningContent?.topic_id });
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="whitespace-pre-wrap">{learningContent?.learning_text}</p>
      <Button onClick={handleReadLesson}>Я прочитал лекцию</Button>
    </div>
  );
}
