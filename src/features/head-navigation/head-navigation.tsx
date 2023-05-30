import clsx from "clsx";
import { useUnit } from "effector-react/effector-react.umd";

import {
  $headNavigationCenter,
  $headNavigationLeft,
  $headNavigationRight,
  HEAD_NAVIGATION_COLOR,
} from "./model.tsx";

export function HeadNavigation({ color }: { color: HEAD_NAVIGATION_COLOR }) {
  return (
    <nav
      className={clsx(
        "flex h-[72px] w-full shrink-0 items-center justify-between px-4 pt-safe",
        { "bg-ce-purple text-white": color === HEAD_NAVIGATION_COLOR.PURPLE },
        { "text-gray-3 bg-white": color === HEAD_NAVIGATION_COLOR.WHITE }
      )}
    >
      <Left />
      <Center />
      <Right />
    </nav>
  );
}

function Left() {
  const left = useUnit($headNavigationLeft);
  return <>{left}</>;
}

function Center() {
  const center = useUnit($headNavigationCenter);
  return <>{center}</>;
}

function Right() {
  const right = useUnit($headNavigationRight);
  return <>{right}</>;
}
