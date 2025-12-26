"use client";

import { useEffect } from "react";
import { NavigationWrapperProps, ParentElementType } from "./NavigationTypes";
import { useNavigation } from "../hooks";
import {
  ClickAwayListener,
  returnTrueElementOrUndefined,
} from "@/ui/utilities";
import { resetArray } from "./componentFunctions";

export function NavigationWrapper({
  children,
  cx,
  isOpen,
  label,
  parentRef,
  ...rest
}: NavigationWrapperProps) {
  const {
    isComponentActive,
    getTopParentElement,
    handleClickAwayClose,
    registerSubNavigation,
    resetTopNavigation,
  } = useNavigation();

  useEffect(() => {
    const storedParentEl = getTopParentElement().storedParentEl;
    const parentEl = parentRef?.current as ParentElementType;
    /* istanbul ignore else */
    if (!!parentEl && storedParentEl !== parentEl) {
      resetArray(parentEl, storedParentEl, resetTopNavigation);
    }
    if (!!parentEl) {
      registerSubNavigation(isOpen, parentEl);
    }
  }, [
    getTopParentElement,
    parentRef,
    resetTopNavigation,
    registerSubNavigation,
    isOpen,
  ]);

  return (
    <ClickAwayListener
      onClickAway={returnTrueElementOrUndefined(
        isComponentActive,
        handleClickAwayClose,
      )}
    >
      <nav aria-label={label} className={cx} {...rest}>
        {children}
      </nav>
    </ClickAwayListener>
  );
}
