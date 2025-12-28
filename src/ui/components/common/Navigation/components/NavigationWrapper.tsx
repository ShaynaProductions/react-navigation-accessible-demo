"use client";

import { useEffect } from "react";
import { NavigationWrapperProps, ParentElementType } from "./NavigationTypes";
import { useNavigation } from "../hooks";
import {
  ClickAwayListener,
  returnTrueElementOrUndefined,
} from "@/ui/utilities";

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
    registerButtonInList,
    registerTopSubNavigation,
  } = useNavigation();

  useEffect(() => {
    const parentEl = parentRef?.current as ParentElementType;
    /* istanbul ignore else */
    if (!!parentEl) {
      registerTopSubNavigation(isOpen, parentEl);
    }
  }, [
    getTopParentElement,
    parentRef,
    registerButtonInList,
    isOpen,
    registerTopSubNavigation,
  ]);

  // useEffect(() => {
  //   if (!!parentRef?.current && !isOpen) {
  //     handleClickAwayClose();
  //   }
  // }, [handleClickAwayClose, isOpen, parentRef]);

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
