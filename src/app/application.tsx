import { RouterProvider } from "atomic-router-react";

import { RoutesView } from "~/pages";

import { router } from "../shared/routing";

export function Application() {
  return (
    <RouterProvider router={router}>
      <div className="flex h-full flex-col">
        <RoutesView />
      </div>
    </RouterProvider>
  );
}
