import { ProgressBar } from "~/shared/ui/progress-bar.tsx";

export function Left() {
  const max = 100;
  const value = 50;

  return (
    <div className="w-full">
      <h4>Прогресс</h4>
      <div className="flex items-center gap-4">
        <ProgressBar value={value} max={max} />
        <span>
          {value}/{max}
        </span>
      </div>
    </div>
  );
}
export function Center() {
  return <></>;
}
export function Right() {
  return <></>;
}
