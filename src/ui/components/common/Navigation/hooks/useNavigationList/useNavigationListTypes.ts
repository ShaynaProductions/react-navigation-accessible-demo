import React from "react";
import {FocusableElementType, ParentElementType} from "../..//NavigationTypes";



export interface UseNavigationListInternal {
    getCurrentIndex: (focusedElement: FocusableElementType) => number;
}

export interface UseNavigationListReturnProps {
    currentListItems: FocusableElementType[];
    parentEl: ParentElementType | null;
    parentRef: React.RefObject<ParentElementType>;
    registerListItem: (focusableEl: FocusableElementType) => void;
    setFirstFocus: () => void;
    setLastFocus: () => void;
    setNextFocus: (focusableEl: FocusableElementType) => void;
    setPreviousFocus: (lastFocusableEl: FocusableElementType) => void;
    setSpecificFocus: (focusableEl: FocusableElementType) => void;
}