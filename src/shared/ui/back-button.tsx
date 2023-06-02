import clsx from "clsx";

import { router } from "~/shared/routing";

import { ReactComponent as ArrowLeft } from "/public/images/arrow-left.svg";

export function BackButton({ className }: { className: string }) {
  return (
    <button
      className={clsx("-ml-[7px] flex items-center justify-start", className)}
      onClick={router.back as any}
    >
      <ArrowLeft />
      Назад
    </button>
  );
}
