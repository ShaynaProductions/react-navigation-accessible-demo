import {FocusableElementType, ParentElementType} from "../../NavigationTypes";
import {NavigationContextStoredValueProps} from "../../providers";


export interface UseNavigationInternalTypes {
    _getIndexInTopRow: (focusedEl: FocusableElementType) => number;
    _getLastElementByParent: (parentEl: ParentElementType) => FocusableElementType;
    _getLastFocusableElementTypeByParent: (parentEl: FocusableElementType) => FocusableElementType;
    _getNavigationObjectByParent: (parentEl: ParentElementType) => NavigationContextStoredValueProps;
    _getNavigationObjectContainingElement: (focusableEl: FocusableElementType) => NavigationContextStoredValueProps;
    _getNextElement: (focusableEl: FocusableElementType, currentItemsList: FocusableElementType[]) => FocusableElementType;
    _getNextElementInRow: (focusableEl: FocusableElementType, currentList: FocusableElementType[]) => FocusableElementType;
    _getPreviousElement: (focusableEl: FocusableElementType) => FocusableElementType | undefined;
    _getPreviousElementInRow: (focusableEl: FocusableElementType, currentList: FocusableElementType[]) => FocusableElementType;
    _getTopElement: (focusableEl: FocusableElementType) => FocusableElementType;
    _getTopParentByElement: (focusableEl: FocusableElementType) => ParentElementType;
    _isInTopRow: (focusableEl: FocusableElementType) => boolean;
}

export interface UseNavigationTypes {
    getTopNavigationParent: () => NavigationContextStoredValueProps;
    getNextByButton: (
        buttonEl: FocusableElementType,
        isSubListOpen: boolean,
    ) => FocusableElementType;
    getNextByLink: (
        linkEl: FocusableElementType,
    ) => FocusableElementType;
    getPreviousByElement: (
        focusableEl: FocusableElementType,
    ) => FocusableElementType;
    getPreviousByButton: (focusableEl: FocusableElementType) => FocusableElementType | undefined;
    getPreviousByLink: (focusableEl) => FocusableElementType;
    registerNavigationItem: (
        navigationList: FocusableElementType[],
        parentEl: ParentElementType,
    ) => void;
    _resetTopNavArray: (parentEl: HTMLButtonElement) => void;
    setIsListOpen: (isListOpen: boolean, parentEl: ParentElementType) => void;

    setListItems: (
        navigationList: FocusableElementType[],
        parentEl: ParentElementType,
    ) => void;
}

export interface ExternalNavHookProps {
    getRecursiveLastElementByParent: (parentEl: ParentElementType, getNavObjectByParent: UseNavigationInternalTypes["_getNavigationObjectByParent"]) => FocusableElementType;
}