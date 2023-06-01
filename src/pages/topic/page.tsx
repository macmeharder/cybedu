import { useUnit } from "effector-react";

import { routes } from "~/shared/routing";
import { Button } from "~/shared/ui/button.tsx";

export function TopicPage() {
  const { id } = useUnit(routes.topic.$params);
  return (
    <div className="flex items-center gap-5">
      <Button to={routes.learning_content} params={{ id }}>
        Лекция
      </Button>
      <Button color="white" to={routes.quiz} params={{ id }}>
        Тест
      </Button>
    </div>
  );
}
