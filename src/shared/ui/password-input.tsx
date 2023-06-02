import clsx from "clsx";
import { InputHTMLAttributes, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  register: any;
}

export function PasswordInput({ label, className, register, ...props }: Props) {
  const [type, setType] = useState<"password" | "text">("password");

  function changeType() {
    setType((prevState) => (prevState === "password" ? "text" : "password"));
  }
  return (
    <label className="flex w-full flex-col gap-1">
      <span className="text-sm font-medium text-ce-purple">{label}</span>
      <div className="relative">
        <input
          className={clsx(
            "peer w-full border-none",
            "bg-ce-gray",
            "rounded-lg py-2.5 pl-3 pr-10",
            className
          )}
          type={type}
          {...props}
          {...register}
        />
        <label className="absolute right-3 top-1/2 -translate-y-1/2">
          <input
            type="checkbox"
            className="peer sr-only"
            onChange={changeType}
            tabIndex={-1}
          />
          <img
            src="/images/eye.svg"
            className="peer-checked:hidden"
            alt="show password"
          />
          <img
            src="/images/eye-off.svg"
            className="hidden peer-checked:block"
            alt="hide password"
          />
        </label>
      </div>
    </label>
  );
}
