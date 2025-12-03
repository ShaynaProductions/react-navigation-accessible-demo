import React from "react";
import {FocusableElementType, NavigationLinkProps, ParentElementType} from "../../NavigationTypes";


export interface NavigationListContextStoredValueProps {
    isListOpen?: boolean;
    parentRef?: React.RefObject<ParentElementType>;
}

export interface NavigationListContextInternalProps {
    _getCurrentIndex: (focusedElement: FocusableElementType) => number;
}

export interface NavigationListContextReturnValueProps {
    _getCurrentIndex: (focusedElement: FocusableElementType) => number;
    _getCurrentListItems: () => FocusableElementType[];
    isListOpen?: boolean;
    parentRef?: React.RefObject<ParentElementType>;
    _registerListItem: (focusableEl: FocusableElementType) => void;
   
}


