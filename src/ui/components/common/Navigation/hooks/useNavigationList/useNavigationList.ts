"use client";
import { RefObject, use, useCallback } from "react";
import { returnTrueElementOrUndefined } from "@/ui/utilities";

import {
  FocusableElementType,
  ParentElementType,
} from "../../components/NavigationTypes";
import { NavigationListContext } from "../../providers/NavigationListProvider";
import {
  UseNavigationListInternal,
  UseNavigationListReturnProps,
} from "./useNavigationListTypes";

const extractParentEl = (parentRef) => {
  return parentRef.current;
};

export function useNavigationList(): UseNavigationListReturnProps {
  const navigationListContextObj = use(NavigationListContext);
  const { getCurrentListItems, getParentRef, registerItemInList } =
    returnTrueElementOrUndefined(
      !!navigationListContextObj,
      navigationListContextObj,
    );

  const currentListItems: FocusableElementType[] = getCurrentListItems();
  const parentRef: RefObject<ParentElementType> = getParentRef();
  const parentEl: ParentElementType = extractParentEl(parentRef);

  const getCurrentIndex: UseNavigationListInternal["getCurrentIndex"] =
    useCallback(
      (focusableEl: FocusableElementType): number => {
        let currentIndex = -1;
        /* istanbul ignore else */
        if (currentListItems.length > 0) {
          currentIndex = currentListItems.indexOf(focusableEl);
        }
        return currentIndex;
      },
      [currentListItems],
    );

  const setSpecificFocus: UseNavigationListReturnProps["setSpecificFocus"] = (
    item,
    isComponentControlled = false,
  ) => {
    item.focus({ preventScroll: !isComponentControlled });
  };

  const setFirstFocus: UseNavigationListReturnProps["setFirstFocus"] = (
    isComponentControlled,
  ) => {
    setSpecificFocus(currentListItems[0], isComponentControlled);
  };

  const setLastFocus: UseNavigationListReturnProps["setLastFocus"] = (
    isComponentControlled,
  ) => {
    setSpecificFocus(
      currentListItems[currentListItems.length - 1],
      isComponentControlled,
    );
  };

  const setNextFocus: UseNavigationListReturnProps["setNextFocus"] = (
    item,
    isComponentControlled,
  ) => {
    const newIndex = getCurrentIndex(item) + 1;
    if (newIndex >= currentListItems.length) {
      setFirstFocus(isComponentControlled);
    } else {
      setSpecificFocus(currentListItems[newIndex], isComponentControlled);
    }
  };

  const setPreviousFocus: UseNavigationListReturnProps["setPreviousFocus"] = (
    item,
    isComponentControlled,
  ) => {
    const newIndex = getCurrentIndex(item) - 1;
    if (newIndex < 0) {
      setLastFocus(isComponentControlled);
    } else {
      setSpecificFocus(currentListItems[newIndex]);
    }
  };

  return {
    currentListItems,
    parentEl,
    registerItemInList,
    setFirstFocus,
    setLastFocus,
    setNextFocus,
    setPreviousFocus,
    setSpecificFocus,
  };
}
