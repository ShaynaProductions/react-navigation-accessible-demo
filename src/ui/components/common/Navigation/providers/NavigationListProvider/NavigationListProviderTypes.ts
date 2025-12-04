import React from "react";
import {FocusableElementType, ParentElementType} from "../../NavigationTypes";


export interface NavigationListContextStoredValueProps {
              unknown
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


