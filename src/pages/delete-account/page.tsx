import { useUnit } from "effector-react";

import { deleteAccount } from "~/pages/delete-account/model.tsx";

import { Button } from "~/shared/ui/button";

export function DeleteAccountPage() {
  const { deleteAccountFn } = useUnit({ deleteAccountFn: deleteAccount });
  return (
    <div className="mt-3 flex h-full flex-col gap-4 pt-safe">
      <h2 className="text-lg text-ce-purple">
        Вы уверены, что хотите удалить аккаунт?
      </h2>
      <p>
        Нам жаль, что вы уходите, но мы уважаем ваш выбор. Если вы решите
        удалить свою учетную запись, вся ваша личная информация будет удалена
        сразу.
      </p>
      <Button color="danger" onClick={deleteAccountFn} className="mt-auto">
        Удалить
      </Button>
    </div>
  );
}
