import {
  FocusableElementType,
  ParentElementType,
} from "../../components/NavigationTypes";
import {
  NavigationContextReturnValueProps,
  NavigationObjectProps,
} from "../../providers";
import { FocusableElement } from "@/ui/utilities";

export interface UseNavigationInternalTypes {
  _closeOpenSiblings: (focusedEl: FocusableElementType) => void;
  _getChildrenInList: (parentEl: HTMLButtonElement) => NavigationObjectProps[];
  _getFirstChildInRow: (index: number) => FocusableElementType;
  _getIndexInTopRow: (focusedEl: FocusableElementType | undefined) => number;
  _getLastChildInRow: (index: number) => FocusableElementType;
  _getLastChildInTopRow: (
    focusedEl: FocusableElementType,
  ) => FocusableElementType;
  _getLastElementInComponent: () => FocusableElementType;
  _getLastFocusableElementByParent: (
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
  _getTopElement: (focusedEl: FocusableElementType) => FocusableElementType;
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

  getRecursiveLastElementByParent: (
    parentEl: FocusableElementType,
    getNavObjectByParent: UseNavigationInternalTypes["_getNavigationObjectByParent"],
    getNavObjectContainingElement: UseNavigationInternalTypes["_getNavigationObjectContainingElement"],
  ) => FocusableElementType;
  getRecursiveTopElementByParent: (
    focusableEl: FocusableElementType,
    getNavObjectContainingElement: UseNavigationInternalTypes["_getNavigationObjectContainingElement"],
  ) => FocusableElementType;
}

export interface UseNavigationReturnTypes {
  closeComponent: () => void;
  closeComponentWithFocus: (
    focusedEl: FocusableElementType,
  ) => FocusableElementType;
  getControllingElement: NavigationContextReturnValueProps["getControllingElement"];
  getNextByButton: (
    buttonEl: FocusableElementType,
    isSubListOpen: boolean,
  ) => FocusableElementType | undefined;
  getNextByButtonTab: (
    buttonEl: FocusableElementType,
    isSubListOpen: boolean,
  ) => FocusableElementType | undefined;
  getNextByLink: (
    linkEl: FocusableElementType,
  ) => FocusableElementType | undefined;
  getNextByLinkTab: (
    linkEl: FocusableElementType,
  ) => FocusableElementType | undefined;
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
  getTopParentElement: () => NavigationObjectProps;
  handleButtonFocus: (
    buttonEl: HTMLButtonElement,
    isSubListOpen: boolean,
    prevIsSubListOpen: boolean,
  ) => FocusableElementType;
  handleClickAwayClose: () => void;
  handleCloseSubNavigation: (
    buttonEl: HTMLButtonElement,
  ) => FocusableElementType;
  handleLinkFocus: (linkEl: FocusableElementType) => FocusableElementType;
  handlePassthroughNavigation(
    focusedEl: FocusableElementType,
  ): FocusableElement | undefined;
  isComponentActive: NavigationContextReturnValueProps["isComponentActive"];
  isComponentControlled: () => boolean;
  isLayoutVertical: () => boolean;
  registerButtonInList: NavigationContextReturnValueProps["registerButtonInList"];
  registerControllingElement: (parentEl: ParentElementType) => void;
  registerInParentList: (
    buttonEl: FocusableElementType,
    parentEl: ParentElementType,
  ) => void;
  registerLinkInList: NavigationContextReturnValueProps["registerLinkInList"];
  returnStoredList: (
    storedList: NavigationObjectProps["storedList"] | undefined,
  ) => NavigationObjectProps["storedList"];
  setIsListOpen: NavigationContextReturnValueProps["setIsListOpen"];
  setListItems: NavigationContextReturnValueProps["setListItems"];
  setShouldPassthrough: NavigationContextReturnValueProps["setShouldPassthrough"];
}
