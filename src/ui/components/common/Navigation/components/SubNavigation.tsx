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
    getChildrenInTree,
    handleNavigationItemFocus,
    registerInParentList,
    registerButtonInList,
    setIsListOpen,
    setListItems,
  } = useNavigation();

  const buttonRef = useRef<ParentElementType>(null);
  const [isSubListOpen, setIsSubListOpen] = useState<boolean>(false);
  const [listWidth, setListWidth] = useState<number | null>(null);

  const closeSubNavigation = useCallback(
    (buttonEl: HTMLButtonElement) => {
      const dispatchArray = getChildrenInTree(buttonEl);
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
    [getChildrenInTree, setIsListOpen],
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
    currentListItems,
    isSubListOpen,
    parentRef,
    registerItemInList,
    registerButtonInList,
    setListItems,
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

  const handleFocus = () => {
    /* istanbul ignore else */
    if (buttonRef.current) {
      handleNavigationItemFocus(buttonRef.current, closeOpenSiblings);
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const buttonEl = buttonRef.current as FocusableElementType;
    /* istanbul ignore else */
    if (buttonEl) {
      handleNavigationItemFocus(buttonEl, closeOpenSiblings);
    }

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
    /* istanbul ignore else */
    if (buttonEl) {
      handleNavigationItemFocus(buttonEl, closeOpenSiblings);
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
