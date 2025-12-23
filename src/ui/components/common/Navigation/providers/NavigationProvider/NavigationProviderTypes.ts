import { FocusableElementType, ParentElementType } from "../../NavigationTypes";

export interface NavigationContextStoredValueProps {
  dispatchChildClose?: (parentEl: HTMLButtonElement) => void;
  storedList?: FocusableElementType[];
  storedParentEl?: ParentElementType;
  isSubListOpen?: boolean;
}

export interface NavigationObjectProps {
  dispatchChildClose?: (parentEl: HTMLButtonElement) => void;
  storedList: FocusableElementType[];
  storedParentEl: ParentElementType;
  isSubListOpen: boolean;
}

export interface NavigationContextInternalProps {
  _getNavigationArray: () => NavigationContextStoredValueProps[];
  getNavigationIndex: (parentEl: ParentElementType) => number;
  _getNavigationObjectByParent: (
    parentEl: ParentElementType,
  ) => NavigationContextStoredValueProps;
  setNavigationArrayObject: (
    index: number,
    updatedContent: Partial<NavigationContextStoredValueProps>,
  ) => void;
  setParentEl: (parentEl: ParentElementType) => void;
}

export interface NavigationContextReturnValueProps {
  _componentActive: boolean;
  _getNavigationArray: () => NavigationContextStoredValueProps[];
  _registerNavLink: (
    navigationList: FocusableElementType[],
    parentEl: ParentElementType,
  ) => void;
  _registerSubNav: (
    isListOpen: boolean,
    parentEl: ParentElementType,
    dispatchChildClose: () => void,
  ) => void;
  _resetTopNavArray: (parentEl: HTMLButtonElement) => void;
  _setComponentActive: (componentActive: boolean) => void;
  _setDispatchChildClose: (
    parentEl: HTMLButtonElement,
    dispatchChildClose: () => void,
  ) => void;
  _setIsListOpen: (isListOpen: boolean, parentEl: ParentElementType) => void;
  _setListItems: (
    navigationList: FocusableElementType[],
    parentEl: ParentElementType,
  ) => void;
  _topLevelParent: HTMLButtonElement | null;
}

export interface NavigationContextValueProps
  extends
    NavigationContextStoredValueProps,
    NavigationContextReturnValueProps {}
