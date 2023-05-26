import { createEvent, restore } from "effector";
import { ReactNode } from "react";

export enum HEAD_NAVIGATION_COLOR {
  PURPLE = "purple",
  WHITE = "white",
}

export const headNavigationLeftChanged = createEvent<ReactNode>();
export const $headNavigationLeft = restore(headNavigationLeftChanged, null);

export const headNavigationCenterChanged = createEvent<ReactNode>();
export const $headNavigationCenter = restore(headNavigationCenterChanged, null);

export const headNavigationRightChanged = createEvent<ReactNode>();
export const $headNavigationRight = restore(headNavigationRightChanged, null);