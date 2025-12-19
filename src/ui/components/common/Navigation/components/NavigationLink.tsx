"use client";

import React, {
  KeyboardEvent,
  RefObject,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { usePathname } from "@/hooks";
import { Link, LinkProps, ListItem, ListItemProps } from "@/ui/components";
import { usePrevious } from "@/ui/hooks";
import { Keys, returnTrueElementOrUndefined } from "@/ui/utilities";
import { useNavigation, useNavigationList } from "../hooks";
import { _handleKeyDown } from "../utilities";
import { FocusableElementType, NavigationLinkProps } from "../NavigationTypes";

export function NavigationLink({
  cx,
  href,
  id,
  label,
  ...rest
}: NavigationLinkProps) {
  const {
    currentListItems,
    parentRef,
    registerItemInList,
    setFirstFocus,
    setLastFocus,
    setNextFocus,
    setPreviousFocus,
    setSpecificFocus,
  } = useNavigationList();
  const {
    getLastTopElement,
    getNextByLink,
    getNextByLinkTab,
    getPreviousByLink,
    getPreviousByLinkTab,
    handleNavigationItemFocus,
    registerNavigationItem,
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
    registerNavigationItem(currentListItems, parentRef.current);
  }, [currentListItems, parentRef, registerNavigationItem]);

  const handleFocus = useCallback(() => {
    /* istanbul ignore else */
    if (linkRef.current) {
      handleNavigationItemFocus(linkRef.current);
    }
    const returnEl = getLastTopElement(linkRef.current);
    /* istanbul ignore else */
    if (returnEl) {
      setSpecificFocus(returnEl);
    }
  }, [getLastTopElement, handleNavigationItemFocus, setSpecificFocus]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
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
        setFirstFocus,
        setLastFocus,
        setNextFocus,
        setPreviousFocus,
      );
      // specific to link.
      switch (e.key) {
        case Keys.UP:
          const prevFocusableEl = getPreviousByLink(linkEl);
          /* istanbul ignore else */
          if (prevFocusableEl) {
            setSpecificFocus(prevFocusableEl);
          }
          break;
        case Keys.DOWN:
          const nextFocusableEl = getNextByLink(linkEl);
          /* istanbul ignore else */
          if (nextFocusableEl) {
            setSpecificFocus(nextFocusableEl);
          }
          break;

        case Keys.TAB:
          if (e.shiftKey) {
            const prevFocusableEl = getPreviousByLinkTab(linkEl);
            /* istanbul ignore else */
            if (prevFocusableEl) {
              setSpecificFocus(prevFocusableEl);
            }
          } else {
            const nextFocusableEl = getNextByLinkTab(linkEl);
            /* istanbul ignore else */
            if (nextFocusableEl) {
              setSpecificFocus(nextFocusableEl);
            }
          }
          break;
      }
    },
    [
      getNextByLink,
      getNextByLinkTab,
      getPreviousByLink,
      getPreviousByLinkTab,
      setFirstFocus,
      setLastFocus,
      setNextFocus,
      setPreviousFocus,
      setSpecificFocus,
    ],
  );

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
