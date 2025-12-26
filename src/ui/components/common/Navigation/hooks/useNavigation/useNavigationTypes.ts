import {
  FocusableElementType,
  ParentElementType,
} from "../../components/NavigationTypes";
import {
  NavigationContextReturnValueProps,
  NavigationObjectProps,
} from "../../providers";

export interface UseNavigationInternalTypes {
  _getIndexInTopRow: (focusedEl: FocusableElementType | undefined) => number;
  _getFirstChildInRow: (index: number) => FocusableElementType;
  _getLastChildInRow: (index: number) => FocusableElementType;
  _getNavigationObjectByParent: (
    parentEl: ParentElementType,
  ) => Partial<NavigationObjectProps>;
  _getNavigationObjectContainingElement: (
    focusedEl: FocusableElementType,
  ) => Partial<NavigationObjectProps>;
  _closeComponent: () => void;
  _getLastFocusableElementTypeByParent: (
    parentEl: FocusableElementType,
  ) => FocusableElementType;
  _getParentByElement: (focusedEl: FocusableElementType) => ParentElementType;
  _isInTopRow: (focusedEl: FocusableElementType) => boolean;
  _getPreviousByElement: (
    focusedEl: FocusableElementType,
  ) => FocusableElementType | undefined;
  _getTopElement: (focusedEl: FocusableElementType) => FocusableElementType;
  _isLastElementInComponent: (focusedEl: FocusableElementType) => boolean;
  _isLastElementInList: (focusedEl: FocusableElementType) => boolean;
}

export interface UseNavigationReturnTypes {
  getTopParentElement: () => Partial<NavigationObjectProps>;
  closeComponentWithFocus: (
    focusedEl: FocusableElementType,
  ) => FocusableElementType | undefined;
  closeOpenSiblings: (focusedEl: FocusableElementType) => void;
  getLastChildInTopRow: (
    focusedEl: FocusableElementType,
  ) => FocusableElementType;

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
  getChildrenInTree: (parentEl: HTMLButtonElement) => NavigationObjectProps[];
  handleClickAwayClose: () => void;
  handleNavigationItemFocus: (
    focusedEl: FocusableElementType,
    closeOpenSiblings: UseNavigationReturnTypes["closeOpenSiblings"],
  ) => void;
  isComponentActive: NavigationContextReturnValueProps["isComponentActive"];
  registerLink: NavigationContextReturnValueProps["registerLink"];
  registerSubNavigation: NavigationContextReturnValueProps["registerSubNavigation"];
  resetTopNavigation: NavigationContextReturnValueProps["resetTopNavigation"];
  setIsListOpen: NavigationContextReturnValueProps["setIsListOpen"];
  setListItems: NavigationContextReturnValueProps["setListItems"];
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
