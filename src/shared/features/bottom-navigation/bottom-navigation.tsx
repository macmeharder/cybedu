import clsx from "clsx";
import { ReactNode } from "react";

export enum HEAD_NAVIGATION_COLOR {
  PURPLE = "purple",
  WHITE = "white",
}

export function BottomNavigation({
  left = null,
  center = null,
  right = null,
  color,
}: {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  color: HEAD_NAVIGATION_COLOR;
}) {
  return (
    <nav
      className={clsx(
        "flex h-[72px] w-full items-center justify-between px-4 pt-safe",
        { "bg-ce-purple text-white": color === HEAD_NAVIGATION_COLOR.PURPLE },
        { "text-gray-3 bg-white": color === HEAD_NAVIGATION_COLOR.WHITE }
      )}
    >
      {left}
      {center}
      {right}
    </nav>
  );
}
