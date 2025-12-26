import { RefObject } from "react";
import { ParentElementType } from "@/ui/components";
import { ResetArrayProps } from "./NavigationTypes";

export const resetArray: ResetArrayProps["resetArray"] = (
  parentEl,
  storedParentEl,
  resetTopNavigation,
) => {
  /* istanbul ignore else */
  if (storedParentEl === null && !!parentEl && parentEl !== storedParentEl) {
    resetTopNavigation(parentEl);
  }
};

export const returnStoredParentEl = (
  parentRef?: RefObject<ParentElementType | null>,
) => {
  return parentRef?.current || null;
};
