import clsx from "clsx";

export function Logotype({ className = "" }: { className?: string }) {
  return (
    <h1 className={clsx("text-4xl font-semibold text-ce-purple", className)}>
      CybEdu
    </h1>
  );
}
