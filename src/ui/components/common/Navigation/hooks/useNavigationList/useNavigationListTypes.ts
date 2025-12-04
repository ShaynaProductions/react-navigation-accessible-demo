import {FocusableElementType} from "@/ui/components/common/Navigation/NavigationTypes";

export interface UseNavigationListReturnProps {
    registerListItem: (focusableEl: FocusableElementType) => void;
    setFirstFocus: () => void;
    setLastFocus: () => void;
    setNextFocus: (focusableEl: FocusableElementType) => void;
    setPreviousFocus: (lastFocusableEl: FocusableElementType) => void;
    setSpecificFocus: (focusableEl: FocusableElementType) => void;
}

export interface UseNavigationListInternal {
    getCurrentIndex: (focusedElement: FocusableElementType) => number;
}