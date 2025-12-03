import React from "react";
import {FocusableElementType, ParentElementType} from "../../NavigationTypes";


export interface NavigationListContextStoredValueProps {
    isListOpen?: boolean;
    parentRef?: React.RefObject<ParentElementType>;
}

export interface NavigationListContextInternalProps {
    GetCurrentIndex: (focusedElement: FocusableElementType) => number;
}

export interface NavigationListContextReturnValueProps {
    isListOpen?: boolean;
    parentRef?: React.RefObject<ParentElementType>;
    registerListItem: (focusableEl: FocusableElementType) => void;
    setFirstFocus: () => void;
    setLastFocus: () => void;
    setNextFocus: (focusableEl: FocusableElementType) => void;
    setPreviousFocus: (lastFocusableEl: FocusableElementType) => void;
    setSpecificFocus: (focusableEl: FocusableElementType) => void;
}


