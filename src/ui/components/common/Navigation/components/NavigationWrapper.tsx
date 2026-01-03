"use client";

import { useEffect } from "react";
import {
  ClickAwayListener,
  returnTrueElementOrUndefined,
} from "@/ui/utilities";
import { usePrevious } from "@/ui/hooks";

import { NavigationWrapperProps, ParentElementType } from "./NavigationTypes";
import { returnStoredList, useNavigation } from "../hooks";

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
    closeComponent,
    isComponentActive,
    getTopParentElement,
    handleClickAwayClose,
    isComponentControlled,
    registerButtonInList,
    registerControllingElement,
    setShouldPassthrough,
    setIsListOpen,
  } = useNavigation();
  const prevIsOpen = usePrevious(isOpen);

  useEffect(() => {
    const parentEl = parentRef?.current as ParentElementType;
    /* istanbul ignore else */
    if (!!parentEl) {
      registerControllingElement(parentEl);
    }
  }, [
    getTopParentElement,
    parentRef,
    registerButtonInList,
    isOpen,
    registerControllingElement,
  ]);

  useEffect(() => {
    const { storedList, storedParentEl } = getTopParentElement();
    if (prevIsOpen !== isOpen) {
      setIsListOpen(isOpen, storedParentEl);
      if (!isOpen) {
        closeComponent();
      }
    }
    if (isOpen && !prevIsOpen) {
      const parentList = returnStoredList(storedList);
      /*istanbul ignore else */
      if (parentRef?.current !== null) {
        parentList[0].focus({ preventScroll: true });
      }
    }
  }, [
    closeComponent,
    getTopParentElement,
    isOpen,
    parentRef,
    prevIsOpen,
    setIsListOpen,
  ]);

  useEffect(() => {
    setShouldPassthrough(shouldPassthrough);
  }, [shouldPassthrough, setShouldPassthrough]);

  const clickAwayProps = {
    onClickAway: returnTrueElementOrUndefined(
      isComponentActive,
      handleClickAwayClose,
    ),
  };

  const navigationProps = {
    "aria-label": label,
    className: cx,
    ...rest,
  };

  if (isComponentControlled()) {
    return <nav {...navigationProps}>{children}</nav>;
  } else {
    return (
      <ClickAwayListener {...clickAwayProps}>
        <nav {...navigationProps}>{children}</nav>
      </ClickAwayListener>
    );
  }
}
