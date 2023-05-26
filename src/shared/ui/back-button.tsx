import clsx from "clsx";

import { ReactComponent as ArrowLeft } from "~/shared/images/arrow-left.svg";
import { router } from "~/shared/routing";

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
