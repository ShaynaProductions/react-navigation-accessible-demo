"use client";

import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  Button,
  ButtonProps,
  Icon,
  IconProps,
  ListItem,
} from "@/ui/components";
import { ChevronRightIcon } from "@/ui/svg";
import { Keys } from "@/ui/utilities";

import {
  FocusableElementType,
  NavigationListProps,
  ParentElementType,
  SubNavigationProps,
} from "../NavigationTypes";
import { useNavigation, useNavigationList } from "../hooks";
import { _handleKeyDown } from "../utilities";
import NavigationList from "./NavigationList";

export function SubNavigation({
  children,
  cx,
  id,
  label,
  testId,
}: SubNavigationProps) {
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
    closeComponentWithFocus,
    closeOpenSiblings,
    getNextByButton,
    getNextByButtonTab,
    getPreviousByButton,
    getPreviousByButtonTab,
    getSubNavigation,
    handleNavigationItemFocus,
    registerSubNavigation,
    setIsListOpen,
    setListItems,
  } = useNavigation();

  const buttonRef = useRef<ParentElementType>(null);
  const [isSubListOpen, setIsSubListOpen] = useState<boolean>(false);

  const closeSubNavigation = useCallback(
    (buttonEl: HTMLButtonElement) => {
      const dispatchArray = getSubNavigation(buttonEl);
      for (const dispatchObj of dispatchArray) {
        const { dispatchChildClose, storedParentEl, isSubListOpen } =
          dispatchObj;
        if (isSubListOpen && dispatchChildClose && storedParentEl) {
          dispatchChildClose(storedParentEl);
        }
      }
      setIsListOpen(false, buttonEl);
      setIsSubListOpen(false);
    },
    [getSubNavigation, setIsListOpen],
  );

  const openSubNavigation = useCallback(
    (buttonEl: HTMLButtonElement) => {
      setIsListOpen(true, buttonEl);
      setIsSubListOpen(true);
    },
    [setIsListOpen],
  );

  useEffect(() => {
    const buttonEl = buttonRef.current as FocusableElementType;
    registerItemInList(buttonEl);
    registerSubNavigation(isSubListOpen, buttonEl, closeSubNavigation);
  }, [
    closeSubNavigation,
    currentListItems,
    isSubListOpen,
    parentRef,
    registerItemInList,
    registerSubNavigation,
    setListItems,
  ]);

  useEffect(() => {
    setListItems(currentListItems, parentRef.current);
  }, [currentListItems, parentRef, setListItems]);

  const handleFocus = useCallback(() => {
    /* istanbul ignore else */
    if (buttonRef.current) {
      handleNavigationItemFocus(buttonRef.current, closeOpenSiblings);
    }
  }, [closeOpenSiblings, handleNavigationItemFocus]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      const buttonEl = buttonRef.current as FocusableElementType;

      switch (e.key) {
        case Keys.HOME:
        case Keys.END:
        case Keys.LEFT:
        case Keys.RIGHT:
        case Keys.UP:
        case Keys.DOWN:
        case Keys.TAB:
          e.preventDefault();
          break;
      }

      // common between link and button
      _handleKeyDown(
        e,
        buttonEl,
        closeComponentWithFocus,
        setFirstFocus,
        setLastFocus,
        setNextFocus,
        setPreviousFocus,
        setSpecificFocus,
      );
      // specific to button.
      switch (e.key) {
        case Keys.UP:
          const prevFocusableEl = getPreviousByButton(buttonEl);
          /* istanbul ignore else */
          if (prevFocusableEl) {
            setSpecificFocus(prevFocusableEl);
          }
          break;
        case Keys.DOWN:
          const nextFocusableEl = getNextByButton(buttonEl, isSubListOpen);
          /* istanbul ignore else */
          if (nextFocusableEl) {
            setSpecificFocus(nextFocusableEl);
          }
          break;
        case Keys.TAB:
          if (e.shiftKey) {
            const prevFocusableEl = getPreviousByButtonTab(buttonEl);
            /*istanbul ignore else */
            if (prevFocusableEl) {
              setSpecificFocus(prevFocusableEl);
            }
          } else {
            const nextFocusableEl = getNextByButtonTab(buttonEl, isSubListOpen);
            /* istanbul ignore else */
            if (nextFocusableEl) {
              setSpecificFocus(nextFocusableEl);
            }
          }
          break;
      }
    },
    [
      closeComponentWithFocus,
      getNextByButton,
      getNextByButtonTab,
      getPreviousByButton,
      getPreviousByButtonTab,
      isSubListOpen,
      setFirstFocus,
      setLastFocus,
      setNextFocus,
      setPreviousFocus,
      setSpecificFocus,
    ],
  );

  const handlePress = useCallback(() => {
    const buttonEl = buttonRef.current as HTMLButtonElement;
    if (isSubListOpen) {
      closeSubNavigation(buttonEl);
    } else {
      openSubNavigation(buttonEl);
    }
  }, [closeSubNavigation, isSubListOpen, openSubNavigation]);

  const buttonProps: ButtonProps = {
    "aria-controls": id,
    "aria-expanded": isSubListOpen,
    "aria-label": `${label}`,
    onFocus: handleFocus,
    onKeyDown: handleKeyDown,
    onPress: handlePress,
    ref: buttonRef,
    testId: testId,
  };

  const iconProps: IconProps = {
    IconComponent: ChevronRightIcon,
    isSilent: true,
  };

  const navigationListProps: NavigationListProps = {
    id: id,
    isOpen: isSubListOpen,
    parentRef: buttonRef,
    testId: testId && `${testId}-list`,
  };

  return (
    <ListItem key={id} cx={cx}>
      <Button {...buttonProps}>
        {label}
        <Icon {...iconProps} />
      </Button>
      <NavigationList key={`list-${id}`} {...navigationListProps}>
        {children}
      </NavigationList>
    </ListItem>
  );
}
