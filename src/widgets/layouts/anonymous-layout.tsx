import { ReactNode } from "react";
import { Helmet } from "react-helmet";

import {
  HEAD_NAVIGATION_COLOR,
  HeadNavigation,
} from "~/features/head-navigation";

export function AnonymousLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Helmet>
        <meta name="theme-color" content="#ffffff" />
      </Helmet>
      <HeadNavigation color={HEAD_NAVIGATION_COLOR.WHITE} />
      <div className="flex h-full flex-col px-4">{children}</div>
    </>
  );
}
