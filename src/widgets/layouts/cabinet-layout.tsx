import { ReactNode } from "react";
import { Helmet } from "react-helmet";

import { BottomNavigation } from "~/features/bottom-navigation";
import { HeadNavigation } from "~/features/head-navigation";

export function CabinetLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Helmet>
        <meta name="theme-color" content="#7879f1" />
      </Helmet>
      <HeadNavigation />
      <div className="flex h-full flex-1 flex-col overflow-y-scroll p-4">
        {children}
      </div>
      <BottomNavigation />
    </>
  );
}
