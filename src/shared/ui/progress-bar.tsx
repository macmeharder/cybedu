import { useEffect, useState } from "react";

export function ProgressBar({
  max = 100,
  value,
}: {
  max?: number;
  value: number;
}) {
  const [percent, setPercent] = useState(0);

  useEffect(
    function () {
      setPercent((100 * value) / max);
    },
    [max, value]
  );

  return (
    <div className="h-3.5 w-full rounded-lg bg-ce-gray">
      <div
        className="h-3.5 rounded-lg bg-ce-yellow"
        style={{ width: `${percent}%` }}
      ></div>
    </div>
  );
}
