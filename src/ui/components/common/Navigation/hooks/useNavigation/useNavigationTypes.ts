import { FocusableElementType, ParentElementType } from "../../NavigationTypes";
import {
  NavigationArrayProps,
  NavigationContextStoredValueProps,
} from "../../providers";

export interface UseNavigationInternalTypes {
  _getIndexInTopRow: (focusedEl: FocusableElementType) => number;
  _getLastChildInRow: (index: number) => FocusableElementType;
  _getLastFocusableElementTypeByParent: (
    parentEl: FocusableElementType,
  ) => FocusableElementType;
  _getNavigationObjectByParent: (
    parentEl: ParentElementType,
  ) => Partial<NavigationArrayProps>;
  _getNavigationObjectContainingElement: (
    focusableEl: FocusableElementType,
  ) => NavigationContextStoredValueProps;
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
}

export interface UseNavigationTypes {
  getLastChildInTopRow: (
    focusableEl: FocusableElementType,
  ) => FocusableElementType;
  getTopNavigationParent: () => NavigationArrayProps;
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
  handleNavigationItemFocus(focusableEl: FocusableElementType): void;
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

export interface ExternalNavHookProps {
  getRecursiveLastElementByParent: (
    parentEl: ParentElementType,
    getNavObjectByParent: UseNavigationInternalTypes["_getNavigationObjectByParent"],
    getNavObjectContainingElement: UseNavigationInternalTypes["_getNavigationObjectContainingElement"],
  ) => FocusableElementType;
}
