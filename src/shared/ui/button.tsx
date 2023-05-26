import { Link } from "atomic-router-react";
import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "primary" | "white" | "danger";
  size?: "default";
  to?: any;
  params?: any;
  query?: any;
}

export function Button({
  children,
  color = "primary",
  className,
  to,
  ...props
}: Props) {
  const classList = clsx(
    "w-full border-2  text-center",
    "disabled:bg-ce-gray disabled:text-ce-blue-gray disabled:border-ce-gray",
    "text-lg rounded-lg py-3.5 px-6",
    {
      "bg-ce-purple text-white border-ce-purple": color === "primary",
      "bg-ce-red text-white border-ce-red": color === "danger",
      "bg-white text-ce-purple border-ce-purple": color === "white",
    },
    className
  );
  if (to) {
    return (
      <Link
        to={to}
        params={props.params}
        query={props.query}
        className={clsx(classList, className)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button {...props} className={clsx(classList, className)}>
      {children}
    </button>
  );
}
