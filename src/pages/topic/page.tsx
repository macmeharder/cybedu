import { useUnit } from "effector-react";

import { routes } from "~/shared/routing";
import { Button } from "~/shared/ui/button.tsx";

export function TopicPage() {
  const { id } = useUnit(routes.topic.$params);
  return (
    <div className="mt-4 flex items-center gap-5">
      <Button to={routes.lesson} params={{ id }}>
        Лекция
      </Button>
      <Button
        color="white"
        to={routes.test}
        params={{ id }}
        query={{ testId: 1, questionId: 1 }}
      >
        Тест
      </Button>
    </div>
  );
}
