"use client";
import { RefObject, use, useCallback } from "react";
import { returnTrueElementOrUndefined } from "@/ui/utilities";

import { FocusableElementType, ParentElementType } from "../../NavigationTypes";
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
  ) => {
    item.focus({ preventScroll: true });
  };

  const setFirstFocus: UseNavigationListReturnProps["setFirstFocus"] = () => {
    setSpecificFocus(currentListItems[0]);
  };

  const setLastFocus: UseNavigationListReturnProps["setLastFocus"] = () => {
    setSpecificFocus(currentListItems[currentListItems.length - 1]);
  };

  const setNextFocus: UseNavigationListReturnProps["setNextFocus"] = (item) => {
    const newIndex = getCurrentIndex(item) + 1;
    if (newIndex >= currentListItems.length) {
      setFirstFocus();
    } else {
      setSpecificFocus(currentListItems[newIndex]);
    }
  };

  const setPreviousFocus: UseNavigationListReturnProps["setPreviousFocus"] = (
    item,
  ) => {
    const newIndex = getCurrentIndex(item) - 1;
    if (newIndex < 0) {
      setLastFocus();
    } else {
      setSpecificFocus(currentListItems[newIndex]);
    }
  };

  return {
    currentListItems,
    parentEl,
    parentRef,
    registerItemInList,
    setFirstFocus,
    setLastFocus,
    setNextFocus,
    setPreviousFocus,
    setSpecificFocus,
  };
}
