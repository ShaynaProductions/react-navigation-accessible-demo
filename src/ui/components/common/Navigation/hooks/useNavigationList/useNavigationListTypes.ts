import React from "react";
import {
  FocusableElementType,
  ParentElementType,
} from "../../components/NavigationTypes";

export interface UseNavigationListInternal {
  getCurrentIndex: (focusedElement: FocusableElementType) => number;
}

export interface UseNavigationListReturnProps {
  currentListItems: FocusableElementType[];
  parentEl: ParentElementType | null;
  parentRef: React.RefObject<ParentElementType>;
  registerItemInList: (focusableEl: FocusableElementType) => void;
  setFirstFocus: (isComponentControlled: boolean) => void;
  setLastFocus: (isComponentcontrolled: boolean) => void;
  setNextFocus: (
    focusableEl: FocusableElementType,
    isComponentControlled: boolean,
  ) => void;
  setPreviousFocus: (
    lastFocusableEl: FocusableElementType,
    isComponentControlled: boolean,
  ) => void;
  setSpecificFocus: (
    focusableEl: FocusableElementType,
    isComponentControlled?: boolean,
  ) => void;
}
