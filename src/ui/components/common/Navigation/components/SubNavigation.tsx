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
} from "@/ui/components";
import { ChevronRightIcon } from "@/ui/svg";
import { Keys } from "@/ui/utilities";

import {
  FocusableElementType,
  NavigationListProps,
  ParentElementType,
  SubNavigationProps,
} from "./NavigationTypes";
import { useNavigation, useNavigationList } from "../hooks";
import { _handleKeyDown } from "../utilities";
import NavigationList from "./NavigationList";
import { setSubListWidth } from "@/ui/components/common/Navigation/components/componentFunctions";
import { usePrevious } from "@/ui/hooks";

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
    getNextByButton,
    getNextByButtonTab,
    getPreviousByButton,
    getPreviousByButtonTab,
    handleButtonFocus,
    handleCloseSubNavigation,
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
  useEffect(() => {
    registerInParentList(
      buttonRef.current as FocusableElementType,
      parentRef.current,
    );
  }, [buttonRef, parentRef, registerInParentList]);

  useEffect(() => {
    setListItems(currentListItems, parentRef.current);
  }, [currentListItems, parentRef, setListItems]);

  useEffect(() => {
    setSubListWidth(buttonRef, setListWidth);
  }, [buttonRef]);

  useEffect(() => {}, [isSubListOpen]);

  const handleFocus = () => {
    const buttonEl = buttonRef.current as FocusableElementType;
    const returnEl = handleButtonFocus(
      buttonEl,
      isSubListOpen,
      prevIsSublistOpen,
    );

    if (returnEl && returnEl !== buttonEl) {
      setSpecificFocus(returnEl);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const buttonEl = buttonRef.current as FocusableElementType;
    /* istanbul ignore else */
    // if (buttonEl) {
    //   _handleNavigationItemFocus(buttonEl, _closeOpenSiblings);
    // }

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

  const navigationListProps: NavigationListProps = {
    id: id,
    isOpen: isSubListOpen,
    parentRef: buttonRef,
    testId: testId && `${testId}-list`,
  };

  return (
    <ListItem
      key={id}
      cx={cx}
      style={{ "--list-width": listWidth } as CSSProperties}
    >
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
