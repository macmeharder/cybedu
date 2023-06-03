import { BackButton } from "~/shared/ui/back-button.tsx";

export function Left() {
  return <BackButton className="flex-1 text-ce-purple" />;
}
export function Center() {
  return (
    <h2 className="flex flex-[2] justify-center text-ce-gray-3">Мой аккаунт</h2>
  );
}
export function Right() {
  return (
    <button
      type="submit"
      form="profile-settings"
      className="flex flex-1 justify-end text-ce-purple"
    >
      Сохранить
    </button>
  );
}
