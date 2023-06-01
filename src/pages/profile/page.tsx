import { Link } from "atomic-router-react";

import { routes } from "~/shared/routing";

const sections = [
  {
    text: "Личная информация",
    items: [
      {
        text: "Мой аккаунт",
        to: routes.profile_settings,
      },
    ],
  },
  {
    text: "Настройки аккаунта",
    items: [
      {
        text: "Изменить пароль",
        to: routes.change_password,
      },
      {
        text: "Удалить аккаунт",
        to: routes.delete_account,
      },
    ],
  },
];

export function ProfilePage() {
  // const logout = useUnit(logoutEv);

  return (
    <div className="flex h-full flex-col gap-10 pt-safe">
      {sections.map(function (section) {
        return (
          <div className="flex flex-col" key={section.text}>
            <h2 className="py-4 text-lg text-ce-purple">{section.text}</h2>
            <div className="-mt-1 flex flex-col">
              {section.items.map(function (item) {
                return (
                  <Link
                    key={item.text}
                    to={item.to}
                    className="flex items-center justify-between border-b border-ce-gray py-4 text-sm"
                  >
                    {item.text}
                    <img
                      src="/images/arrow-left.svg"
                      className="rotate-180 transform"
                      alt=""
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
      <button
        // onClick={logout}
        className="mb-10 mt-auto text-center text-lg text-ce-red"
      >
        Выйти
      </button>
    </div>
  );
}
