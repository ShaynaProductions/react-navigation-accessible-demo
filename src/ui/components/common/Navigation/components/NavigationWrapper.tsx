"use client";

import { useEffect } from "react";
import {
  NavigationWrapperProps,
  ParentElementType,
  ResetArrayProps,
} from "../NavigationTypes";
import { useNavigation } from "../hooks";
import {
  ClickAwayListener,
  returnTrueElementOrUndefined,
} from "@/ui/utilities";

const resetArray: ResetArrayProps["resetArray"] = (
  parentEl,
  storedParentEl,
  resetTopNavArray,
) => {
  /* istanbul ignore else */
  if (storedParentEl === null && !!parentEl && parentEl !== storedParentEl) {
    resetTopNavArray(parentEl);
  }
};

export function NavigationWrapper({
  children,
  cx,
  isOpen,
  label,
  parentRef,
  ...rest
}: NavigationWrapperProps) {
  const {
    componentActive,
    getTopNavigationParent,
    handleClickAwayClose,
    registerSubNavigation,
    resetTopNavigationArray,
  } = useNavigation();

  useEffect(() => {
    const storedParentEl = getTopNavigationParent().storedParentEl;
    const parentEl = parentRef?.current as ParentElementType;
    /* istanbul ignore else */
    if (!!parentEl && storedParentEl !== parentEl) {
      resetArray(parentEl, storedParentEl, resetTopNavigationArray);
    }
    if (!!parentEl) {
      registerSubNavigation(isOpen, parentEl);
    }
  }, [
    getTopNavigationParent,
    parentRef,
    resetTopNavigationArray,
    registerSubNavigation,
    isOpen,
  ]);

  return (
    <ClickAwayListener
      onClickAway={returnTrueElementOrUndefined(
        componentActive,
        handleClickAwayClose,
      )}
    >
      <nav aria-label={label} className={cx} {...rest}>
        {children}
      </nav>
    </ClickAwayListener>
  );
}
