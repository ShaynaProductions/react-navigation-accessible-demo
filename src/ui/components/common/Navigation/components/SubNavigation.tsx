"use client";

import {
  CSSProperties,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  Button,
  ButtonProps,
  Icon,
  IconProps,
  ListItem,
  ListItemProps,
} from "@/ui/components";
import { usePrevious } from "@/ui/hooks";
import { ChevronRightIcon } from "@/ui/svg";
import { Keys } from "@/ui/utilities";

import {
  FocusableElementType,
  NavigationListProps,
  ParentElementType,
  SubNavigationProps,
} from "./NavigationTypes";
import { useNavigation, useNavigationList } from "../hooks";
import { setSubListWidth } from "./componentFunctions";
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
    getNextByButton,
    getNextByButtonTab,
    getPreviousByButton,
    getPreviousByButtonTab,
    handleButtonFocus,
    handleCloseSubNavigation,
    isComponentControlled,
    registerInParentList,
    registerButtonInList,
    setIsListOpen,
    setListItems,
  } = useNavigation();

  const buttonRef = useRef<ParentElementType>(null);
  const [isSubListOpen, setIsSubListOpen] = useState<boolean>(false);
  const prevIsSublistOpen = usePrevious(isSubListOpen);
  const [listWidth, setListWidth] = useState<number | null>(null);

  const closeSubNavigation = useCallback(
    (buttonEl: HTMLButtonElement) => {
      handleCloseSubNavigation(buttonEl);
      setIsSubListOpen(false);
    },
    [handleCloseSubNavigation],
  );

  const openSubNavigation = (buttonEl: HTMLButtonElement) => {
    setIsListOpen(true, buttonEl);
    setIsSubListOpen(true);
  };

  /* Register element into provider  */
  useEffect(() => {
    const buttonEl = buttonRef.current as FocusableElementType;
    registerItemInList(buttonEl);
    registerButtonInList(isSubListOpen, buttonEl, closeSubNavigation);
  }, [
    closeSubNavigation,
    isSubListOpen,
    registerItemInList,
    registerButtonInList,
  ]);

  /* Register Button into parent's list */
  useEffect(() => {
    registerInParentList(buttonRef.current as FocusableElementType, parentEl);
  }, [buttonRef, parentEl, registerInParentList]);

  useEffect(() => {
    setListItems(currentListItems, parentEl);
  }, [currentListItems, parentEl, setListItems]);

  useEffect(() => {
    setSubListWidth(buttonRef, setListWidth);
  }, [buttonRef]);

  useEffect(() => {}, [isSubListOpen]);

  const handleFocus = () => {
    const buttonEl = buttonRef.current as HTMLButtonElement;
    const returnEl = handleButtonFocus(
      buttonEl,
      isSubListOpen,
      prevIsSublistOpen || false,
    );

    if (returnEl && returnEl !== buttonEl) {
      setSpecificFocus(returnEl);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
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
      isComponentControlled,
      setFirstFocus,
      setLastFocus,
      setNextFocus,
      setPreviousFocus,
      setSpecificFocus,
    );

    // specific to button.
    let focusableEl;
    switch (e.key) {
      case Keys.UP:
        focusableEl = getPreviousByButton(buttonEl);
        break;
      case Keys.DOWN:
        focusableEl = getNextByButton(buttonEl, isSubListOpen);
        break;
      case Keys.TAB:
        if (e.shiftKey) {
          focusableEl = getPreviousByButtonTab(buttonEl);
        } else {
          focusableEl = getNextByButtonTab(buttonEl, isSubListOpen);
        }
        break;
    }
    if (focusableEl) {
      setSpecificFocus(focusableEl, isComponentControlled());
    }
  };

  const handlePress = () => {
    const buttonEl = buttonRef.current as HTMLButtonElement;
    if (isSubListOpen) {
      closeSubNavigation(buttonEl);
    } else {
      openSubNavigation(buttonEl);
    }
  };

  const buttonProps: ButtonProps = {
    "aria-controls": id,
    "aria-expanded": isSubListOpen,
    "aria-label": label,
    id: label.split(/(?<=^\S+)\s/)[0],
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

  const listItemProps: Omit<ListItemProps, "children"> = {
    cx: cx,
    style: { "--list-width": listWidth } as CSSProperties,
  };

  const navigationListProps: NavigationListProps = {
    id: id,
    isOpen: isSubListOpen,
    parentRef: buttonRef,
    testId: testId && `${testId}-list`,
  };

  return (
    <ListItem key={id} {...listItemProps}>
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
