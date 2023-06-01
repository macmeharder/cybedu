import { createEvent, restore } from "effector";

export enum BOTTOM_NAV_ITEM {
  HOME,
  PROFILE,
}

export const bottomNavigationActiveItemChanged = createEvent<BOTTOM_NAV_ITEM>();
export const $bottomNavigationActiveItem = restore(
  bottomNavigationActiveItemChanged,
  BOTTOM_NAV_ITEM.HOME
);

export const bottomNavigationVisibilityChanged = createEvent<boolean>();
export const $bottomNavigationVisibility = restore(
  bottomNavigationVisibilityChanged,
  true
);
