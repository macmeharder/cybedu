import { Link } from "atomic-router-react";
import clsx from "clsx";
import { useUnit } from "effector-react";

import {
  $bottomNavigationActiveItem,
  $bottomNavigationVisibility,
} from "~/features/bottom-navigation/model.ts";

import { routes } from "~/shared/routing";

import { ReactComponent as Home } from "/public/images/home.svg";
import { ReactComponent as Profile } from "/public/images/profile.svg";

const navigationItems = [
  { to: routes.home, icon: <Home /> },
  { to: routes.profile, icon: <Profile /> },
];
export function BottomNavigation() {
  const { visibility, activeItem } = useUnit({
    visibility: $bottomNavigationVisibility,
    activeItem: $bottomNavigationActiveItem,
  });
  return (
    <nav
      className={clsx(
        "flex shrink-0 items-center justify-between bg-ce-gray pb-safe",
        { hidden: !visibility }
      )}
    >
      {navigationItems.map(function (item, index) {
        return (
          <Link
            key={index}
            to={item.to}
            className={clsx(
              "flex grow justify-center py-3",
              index === activeItem ? "text-ce-purple" : "text-ce-blue-gray"
            )}
          >
            {item.icon}
          </Link>
        );
      })}
    </nav>
  );
}
