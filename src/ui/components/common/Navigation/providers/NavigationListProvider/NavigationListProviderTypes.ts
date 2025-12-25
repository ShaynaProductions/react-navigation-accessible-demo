import React from "react";
import { FocusableElementType, ParentElementType } from "../../NavigationTypes";

export interface NavigationListContextStoredValueProps {
  parentRef: React.RefObject<ParentElementType>;
}

export interface NavigationListContextReturnValueProps {
  getCurrentListItems: () => FocusableElementType[];
  getParentRef: () => React.RefObject<ParentElementType>;
  registerItemInList: (focusableEl: FocusableElementType) => void;
}
