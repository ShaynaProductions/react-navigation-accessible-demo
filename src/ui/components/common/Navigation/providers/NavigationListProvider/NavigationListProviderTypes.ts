import React from "react";
import {FocusableElementType, ParentElementType} from "../../NavigationTypes";


export interface NavigationListContextStoredValueProps {
    parentRef: React.RefObject<ParentElementType>;
}

export interface NavigationListContextInternalProps {
    _getCurrentIndex: (focusedElement: FocusableElementType) => number;
}

export interface NavigationListContextReturnValueProps {
    _getCurrentIndex: (focusedElement: FocusableElementType) => number;
    _getCurrentListItems: () => FocusableElementType[];
    _getParentRef: () => React.RefObject<ParentElementType>;
    _registerListItem: (focusableEl: FocusableElementType) => void;
   
}


