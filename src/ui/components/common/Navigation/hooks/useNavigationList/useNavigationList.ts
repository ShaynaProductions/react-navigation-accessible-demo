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
    isLayoutVertical = false,
  ) => {
    item.focus({ preventScroll: !isLayoutVertical });
  };

  const setFirstFocus: UseNavigationListReturnProps["setFirstFocus"] = (
    isLayoutVertical,
  ) => {
    setSpecificFocus(currentListItems[0], isLayoutVertical);
  };

  const setLastFocus: UseNavigationListReturnProps["setLastFocus"] = (
    isLayoutVertical,
  ) => {
    setSpecificFocus(
      currentListItems[currentListItems.length - 1],
      isLayoutVertical,
    );
  };

  const setNextFocus: UseNavigationListReturnProps["setNextFocus"] = (
    item,
    isLayoutVertical,
  ) => {
    const newIndex = getCurrentIndex(item) + 1;
    if (newIndex >= currentListItems.length) {
      setFirstFocus(isLayoutVertical);
    } else {
      setSpecificFocus(currentListItems[newIndex], isLayoutVertical);
    }
  };

  const setPreviousFocus: UseNavigationListReturnProps["setPreviousFocus"] = (
    item,
    isLayoutVertical,
  ) => {
    const newIndex = getCurrentIndex(item) - 1;
    if (newIndex < 0) {
      setLastFocus(isLayoutVertical);
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
