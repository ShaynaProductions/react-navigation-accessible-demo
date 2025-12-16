import React from "react";
import {FocusableElementType, ParentElementType} from "../../NavigationTypes";


export interface NavigationListContextStoredValueProps {
    parentRef: React.RefObject<ParentElementType>;
}

export interface NavigationListContextReturnValueProps {
    _getCurrentListItems: () => FocusableElementType[];
    _getParentRef: () => React.RefObject<ParentElementType>;
    _registerItemInList: (focusableEl: FocusableElementType) => void;
   
}


