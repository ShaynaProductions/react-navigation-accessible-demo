import {FocusableElementType, ParentElementType} from "../../NavigationTypes";
import {NavigationContextStoredValueProps} from "../../providers";

export interface UseNavigationInternalTypes {
    _getLastElementByParent: (parentEl: ParentElementType) => FocusableElementType;
    _getNavigationObjectByParent: (parentEl: ParentElementType) => NavigationContextStoredValueProps;
    _getNavigationObjectContainingElement: (focusableEl: FocusableElementType) => NavigationContextStoredValueProps;
    _getNextElementInRow: (focusableEl: FocusableElementType, currentList: FocusableElementType[]) => FocusableElementType;
    _getPreviousElementInRow: (focusableEl: FocusableElementType, currentList: FocusableElementType[]) => FocusableElementType;
    _getTopParentByElement: (focusableEl: FocusableElementType) => ParentElementType;
    _isInTopRow: (parentEl: ParentElementType) => boolean;
}

export interface UseNavigationTypes {
    getNavigationParent: () => NavigationContextStoredValueProps;
    getNextByButton: (
        buttonEl: FocusableElementType,
        isSubListOpen: boolean,
    ) => FocusableElementType;
    getNextByLink: (
        linkEl: FocusableElementType,
    ) => FocusableElementType;
    getPreviousByElement: (
        focusableEl: FocusableElementType,
    ) => FocusableElementType | undefined;
    registerNavigationItem: (
        navigationList: FocusableElementType[],
        parentEl: ParentElementType,
    ) => void;
    _resetTopNavArray: (parentEl: HTMLButtonElement) => void;
    setListItems: (
        navigationList: FocusableElementType[],
        parentEl: ParentElementType,
    ) => void;
}