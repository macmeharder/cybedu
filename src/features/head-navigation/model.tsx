import { createEvent, restore } from "effector";
import { ReactNode } from "react";

export enum HEAD_NAVIGATION_COLOR {
  PURPLE = "purple",
  WHITE = "white",
}

export const headNavigationColorChanged = createEvent<HEAD_NAVIGATION_COLOR>();
export const $headNavigationColor = restore(
  headNavigationColorChanged,
  HEAD_NAVIGATION_COLOR.WHITE
);

export const headNavigationVisibilityChanged = createEvent<boolean>();
export const $headNavigationVisibility = restore(
  headNavigationVisibilityChanged,
  true
);

export const headNavigationLeftChanged = createEvent<ReactNode>();
export const $headNavigationLeft = restore(headNavigationLeftChanged, null);

export const headNavigationCenterChanged = createEvent<ReactNode>();
export const $headNavigationCenter = restore(headNavigationCenterChanged, null);

export const headNavigationRightChanged = createEvent<ReactNode>();
export const $headNavigationRight = restore(headNavigationRightChanged, null);
