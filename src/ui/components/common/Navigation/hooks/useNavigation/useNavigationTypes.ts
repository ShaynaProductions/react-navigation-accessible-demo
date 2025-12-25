import { FocusableElementType, ParentElementType } from "../../NavigationTypes";
import { NavigationObjectProps } from "../../providers";

export interface UseNavigationInternalTypes {
  _closeParentComponent: () => void;
  _getIndexInTopRow: (focusedEl: FocusableElementType | undefined) => number;
  _getFirstChildInRow: (index: number) => FocusableElementType;
  _getLastChildInRow: (index: number) => FocusableElementType;
  _getLastFocusableElementTypeByParent: (
    parentEl: FocusableElementType,
  ) => FocusableElementType;
  _getNavigationObjectByParent: (
    parentEl: ParentElementType,
  ) => Partial<NavigationObjectProps>;
  _getNavigationObjectContainingElement: (
    focusableEl: FocusableElementType,
  ) => Partial<NavigationObjectProps>;
  _getNextElement: (
    focusableEl: FocusableElementType,
    currentItemsList: FocusableElementType[],
  ) => FocusableElementType;
  _getNextElementInRow: (
    focusableEl: FocusableElementType,
    currentList: FocusableElementType[],
  ) => FocusableElementType;
  _getParentByElement: (focusableEl: FocusableElementType) => ParentElementType;
  _getPreviousElement: (
    focusableEl: FocusableElementType,
  ) => FocusableElementType | undefined;
  _getPreviousElementInRow: (
    focusableEl: FocusableElementType,
    currentList: FocusableElementType[],
  ) => FocusableElementType;
  _getTopElement: (focusableEl: FocusableElementType) => FocusableElementType;
  _isFirstOrLastItem: (focusableEl: FocusableElementType) => boolean;
  _isInTopRow: (focusableEl: FocusableElementType) => boolean;
  isLastElementInComponent: (focusableEl: FocusableElementType) => boolean;
  _isLastElementInList: (focusedEl: FocusableElementType) => boolean;
}

export interface UseNavigationTypes {
  closeComponentWithFocus: (
    focusedEl: FocusableElementType,
  ) => FocusableElementType | undefined;
  closeOpenSiblings: (currentlyFocusedEl: FocusableElementType) => void;
  getLastChildInTopRow: (
    focusableEl: FocusableElementType,
  ) => FocusableElementType;
  getTopNavigationParent: () => Partial<NavigationObjectProps>;
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
  getPreviousByElement: (
    focusableEl: FocusableElementType,
  ) => FocusableElementType;
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
  getSubNavigation: (parentEl: HTMLButtonElement) => NavigationObjectProps[];
  handleClickAwayClose: () => void;
  handleNavigationItemFocus: (
    focusableEl: FocusableElementType,
    closeOpenSiblings: UseNavigationTypes["closeOpenSiblings"],
  ) => void;
  isComponentActive: () => boolean;
  registerNavigationItem: (
    navigationList: FocusableElementType[],
    parentEl: ParentElementType,
  ) => void;
  resetTopNavArray: (parentEl: HTMLButtonElement) => void;
  setIsListOpen: (isListOpen: boolean, parentEl: ParentElementType) => void;

  setListItems: (
    navigationList: FocusableElementType[],
    parentEl: ParentElementType,
  ) => void;
}

export interface NavigationHookFunctionsProps {
  getRecursiveLastElementByParent: (
    parentEl: ParentElementType,
    getNavObjectByParent: UseNavigationInternalTypes["_getNavigationObjectByParent"],
    getNavObjectContainingElement: UseNavigationInternalTypes["_getNavigationObjectContainingElement"],
  ) => FocusableElementType;
}
