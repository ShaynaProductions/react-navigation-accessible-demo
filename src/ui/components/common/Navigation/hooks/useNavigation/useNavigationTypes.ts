import {
  FocusableElementType,
  ParentElementType,
} from "../../components/NavigationTypes";
import {
  NavigationContextReturnValueProps,
  NavigationObjectProps,
} from "../../providers";

export interface UseNavigationInternalTypes {
  _closeComponent: () => void;
  _closeOpenSiblings: (focusedEl: FocusableElementType) => void;
  _getChildrenInTree: (parentEl: HTMLButtonElement) => NavigationObjectProps[];
  _getFirstChildInRow: (index: number) => FocusableElementType;
  _getIndexInTopRow: (focusedEl: FocusableElementType | undefined) => number;
  _getLastChildInRow: (index: number) => FocusableElementType;
  _getLastChildInTopRow: (
    focusedEl: FocusableElementType,
  ) => FocusableElementType;
  _getLastFocusableElementTypeByParent: (
    parentEl: FocusableElementType,
  ) => FocusableElementType;
  _getNavigationObjectByParent: (
    parentEl: ParentElementType,
  ) => Partial<NavigationObjectProps>;
  _getNavigationObjectContainingElement: (
    focusedEl: FocusableElementType,
  ) => Partial<NavigationObjectProps>;
  _getParentByElement: (focusedEl: FocusableElementType) => ParentElementType;
  _getShouldPassthrough: () => boolean;
  _getPreviousByElement: (
    focusedEl: FocusableElementType,
  ) => FocusableElementType | undefined;
  _handleLastChildFocus: (focusedEl: FocusableElementType) => void;
  _handleNavigationItemFocus: (
    focusedEl: FocusableElementType,
    _closeOpenSiblings: UseNavigationInternalTypes["_closeOpenSiblings"],
  ) => void;
  _isFirstChildInComponent: (focusedEl: FocusableElementType) => boolean;
  _isInTopRow: (focusedEl: FocusableElementType) => boolean;
  _isLastChildInComponent: (focusedEl: FocusableElementType) => boolean;
  _isLastElementInComponent: (focusedEl: FocusableElementType) => boolean;
  _isLastElementInList: (focusedEl: FocusableElementType) => boolean;
}

export interface NavigationHookFunctionsProps {
  _getNextElementInList: (
    focusedEl: FocusableElementType,
    currentList: FocusableElementType[],
  ) => FocusableElementType;
  _getPreviousElementInList: (
    focusedEl: FocusableElementType,
    currentList: FocusableElementType[],
  ) => FocusableElementType;
  _returnStoredList: (
    storedList: NavigationObjectProps["storedList"] | undefined,
  ) => NavigationObjectProps["storedList"];
  getRecursiveLastElementByParent: (
    parentEl: ParentElementType,
    getNavObjectByParent: UseNavigationInternalTypes["_getNavigationObjectByParent"],
    getNavObjectContainingElement: UseNavigationInternalTypes["_getNavigationObjectContainingElement"],
  ) => FocusableElementType;
  getRecursiveTopElementByParent: (
    focusableEl: FocusableElementType,
    getNavObjectContainingElement: UseNavigationInternalTypes["_getNavigationObjectContainingElement"],
  ) => FocusableElementType;
}

export interface UseNavigationReturnTypes {
  closeComponentWithFocus: (
    focusedEl: FocusableElementType,
  ) => FocusableElementType | undefined;
  getControllingElement: NavigationContextReturnValueProps["getControllingElement"];
  getNextByButton: (
    buttonEl: FocusableElementType,
    isSubListOpen: boolean,
  ) => FocusableElementType;
  getNextByButtonTab: (
    buttonEl: FocusableElementType,
    isSubListOpen: boolean,
  ) => FocusableElementType;
  getNextByLink: (linkEl: FocusableElementType) => FocusableElementType;
  getNextByLinkTab: (linkEl: FocusableElementType) => FocusableElementType;
  getPreviousByButton: (
    buttonEl: FocusableElementType,
  ) => FocusableElementType | undefined;
  getPreviousByButtonTab: (
    buttonEl: FocusableElementType,
  ) => FocusableElementType | undefined;
  getPreviousByLink: (
    linkEl: FocusableElementType,
  ) => FocusableElementType | undefined;
  getPreviousByLinkTab: (
    linkEl: FocusableElementType,
  ) => FocusableElementType | undefined;
  getTopParentElement: () => Partial<NavigationObjectProps>;
  handleClickAwayClose: () => void;
  handleLinkFocus;
  handlePassthroughNavigation(focusedEl: FocusableElementType): void;
  isComponentActive: NavigationContextReturnValueProps["isComponentActive"];
  registerButtonInList: NavigationContextReturnValueProps["registerButtonInList"];
  registerInParentList: (
    buttonEl: FocusableElementType,
    parentEl: ParentElementType,
  ) => void;
  registerLinkInList: NavigationContextReturnValueProps["registerLinkInList"];
  setIsListOpen: NavigationContextReturnValueProps["setIsListOpen"];
  setListItems: NavigationContextReturnValueProps["setListItems"];
  setShouldPassthrough: NavigationContextReturnValueProps["setShouldPassthrough"];
}
