import { Link } from "atomic-router-react";

import { ReactComponent as Home } from "~/shared/images/home.svg";
import { ReactComponent as Profile } from "~/shared/images/profile.svg";
import { routes } from "~/shared/routing";

const navigationItems = [
  { to: routes.home, icon: <Home /> },
  { to: routes.profile, icon: <Profile /> },
];
export function BottomNavigation() {
  return (
    <nav className="flex shrink-0 items-center justify-between bg-ce-gray pb-safe">
      {navigationItems.map(function (item, index) {
        return (
          <Link
            key={index}
            to={item.to}
            activeClassName="text-ce-purple"
            inactiveClassName="text-ce-blue-gray"
            className="flex grow justify-center py-3"
          >
            {item.icon}
          </Link>
        );
      })}
    </nav>
  );
}
