"use client";

import React, { KeyboardEvent, RefObject, useEffect, useRef } from "react";
import { usePathname } from "@/hooks";
import { Link, LinkProps, ListItem, ListItemProps } from "@/ui/components";
import { usePrevious } from "@/ui/hooks";
import { Keys, returnTrueElementOrUndefined } from "@/ui/utilities";
import { useNavigation, useNavigationList } from "../hooks";
import { _handleKeyDown } from "../utilities";
import { FocusableElementType, NavigationLinkProps } from "./NavigationTypes";

export function NavigationLink({
  cx,
  href,
  id,
  label,
  ...rest
}: NavigationLinkProps) {
  const {
    currentListItems,
    parentEl,
    registerItemInList,
    setFirstFocus,
    setLastFocus,
    setNextFocus,
    setPreviousFocus,
    setSpecificFocus,
  } = useNavigationList();
  const {
    closeComponentWithFocus,
    getNextByLink,
    getNextByLinkTab,
    getPreviousByLink,
    getPreviousByLinkTab,
    handleLinkFocus,
    registerLinkInList,
  } = useNavigation();
  const currentPath = usePathname();

  const linkRef = useRef<FocusableElementType | null>(null);
  const prevLinkRef = usePrevious(linkRef);

  useEffect(() => {
    if (linkRef !== prevLinkRef) {
      registerItemInList(linkRef.current as HTMLAnchorElement);
    }
  }, [linkRef, prevLinkRef, registerItemInList]);

  useEffect(() => {
    registerLinkInList(currentListItems, parentEl);
  }, [currentListItems, parentEl, registerLinkInList]);

  const handleFocus = () => {
    const linkEl = linkRef.current;
    const returnEl = handleLinkFocus(linkEl as FocusableElementType);

    /* istanbul ignore else */
    if (!!returnEl && returnEl !== linkEl) {
      setSpecificFocus(returnEl);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const linkEl = linkRef.current as FocusableElementType;

    switch (e.key) {
      case Keys.HOME:
      case Keys.END:
      case Keys.LEFT:
      case Keys.RIGHT:
      case Keys.UP:
      case Keys.DOWN:
      case Keys.TAB:
        e.preventDefault();
        e.stopPropagation();
        break;
    }

    // common between link and button
    _handleKeyDown(
      e,
      linkEl,
      closeComponentWithFocus,
      setFirstFocus,
      setLastFocus,
      setNextFocus,
      setPreviousFocus,
      setSpecificFocus,
    );
    // specific to link.
    let focusableEl: FocusableElementType | undefined;
    switch (e.key) {
      case Keys.UP:
        focusableEl = getPreviousByLink(linkEl);
        break;
      case Keys.DOWN:
        focusableEl = getNextByLink(linkEl);
        break;
      case Keys.TAB:
        if (e.shiftKey) {
          focusableEl = getPreviousByLinkTab(linkEl);
        } else {
          focusableEl = getNextByLinkTab(linkEl);
        }
        break;
    }
    if (focusableEl) {
      setSpecificFocus(focusableEl);
    }
  };

  const listItemProps: Omit<ListItemProps, "children"> = {
    cx: cx,
    id: id,
  };

  const linkProps: Omit<LinkProps, "children"> = {
    "aria-current": returnTrueElementOrUndefined(currentPath === href),
    href: href,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    ref: linkRef as RefObject<HTMLAnchorElement>,
    ...rest,
  };

  return (
    <>
      <ListItem key={id} {...listItemProps}>
        <Link {...linkProps}>{label}</Link>
      </ListItem>
    </>
  );
}
