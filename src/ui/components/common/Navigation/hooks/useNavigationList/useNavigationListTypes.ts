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
  registerItemInList: (focusableEl: FocusableElementType) => void;
  setFirstFocus: (isLayoutVertical: boolean) => void;
  setLastFocus: (isLayoutVertical: boolean) => void;
  setNextFocus: (
    focusableEl: FocusableElementType,
    isLayoutVertical: boolean,
  ) => void;
  setPreviousFocus: (
    lastFocusableEl: FocusableElementType,
    isLayoutVertical: boolean,
  ) => void;
  setSpecificFocus: (
    focusableEl: FocusableElementType,
    isLayoutVertical?: boolean,
  ) => void;
}
