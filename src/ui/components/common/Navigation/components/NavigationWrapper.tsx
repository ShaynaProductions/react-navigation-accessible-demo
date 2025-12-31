"use client";

import { useEffect } from "react";
import { NavigationWrapperProps, ParentElementType } from "./NavigationTypes";
import { useNavigation } from "../hooks";
import {
  ClickAwayListener,
  returnTrueElementOrUndefined,
} from "@/ui/utilities";
import { usePrevious } from "@/ui/hooks";

export function NavigationWrapper({
  children,
  cx,
  isOpen,
  label,
  parentRef,
  shouldPassthrough,
  ...rest
}: NavigationWrapperProps) {
  const {
    isComponentActive,
    getTopParentElement,
    getControllingElement,
    handleClickAwayClose,
    registerButtonInList,
    registerTopSubNavigation,
    setShouldPassthrough,
    setIsListOpen,
  } = useNavigation();
  const prevIsOpen = usePrevious(isOpen);

  useEffect(() => {
    const parentEl = parentRef?.current as ParentElementType;
    /* istanbul ignore else */
    if (!!parentEl) {
      registerTopSubNavigation(parentEl);
    }
  }, [
    getTopParentElement,
    parentRef,
    registerButtonInList,
    isOpen,
    registerTopSubNavigation,
  ]);
  useEffect(() => {
    if (prevIsOpen !== isOpen) {
      const { storedParentEl } = getTopParentElement();
      setIsListOpen(isOpen, storedParentEl);
    }
  }, [getTopParentElement, isOpen, prevIsOpen, setIsListOpen]);

  useEffect(() => {
    if (isOpen && !prevIsOpen) {
      const { storedList } = getTopParentElement();
      const parentList = storedList || [];
      if (parentRef?.current !== null) {
        parentList[0].focus({ preventScroll: true });
      }
    }
  }, [getTopParentElement, isOpen, parentRef, prevIsOpen]);

  useEffect(() => {
    setShouldPassthrough(shouldPassthrough);
  }, [shouldPassthrough, setShouldPassthrough]);

  if (getControllingElement() === null) {
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
  } else {
    return (
      <nav aria-label={label} className={cx} {...rest}>
        {children}
      </nav>
    );
  }
}
