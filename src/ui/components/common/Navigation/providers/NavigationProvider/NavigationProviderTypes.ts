import { FocusableElementType, ParentElementType } from "../../NavigationTypes";
import React from "react";

export interface NavigationProviderFunctionsProps {
  registerTopLevelParent: (
    parentEl: ParentElementType,
    setTopLevelParent: React.Dispatch<React.SetStateAction<ParentElementType>>,
  ) => void;
}
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
  _getNavigationIndex: (parentEl: ParentElementType) => number;
  _getNavigationObjectByParent: (
    parentEl: ParentElementType,
  ) => NavigationObjectProps;

  _setNavigationArrayObject: (
    index: number,
    updatedContent: Partial<NavigationContextStoredValueProps>,
  ) => void;
  _setParentEl: (parentEl: ParentElementType) => void;
}

export interface NavigationContextReturnValueProps {
  componentActive: boolean;
  getNavigationArray: () => NavigationContextStoredValueProps[];
  registerNavLink: (
    navigationList: FocusableElementType[],
    parentEl: ParentElementType,
  ) => void;
  registerSubNav: (
    isListOpen: boolean,
    parentEl: ParentElementType,
    dispatchChildClose: () => void,
  ) => void;
  resetTopNavArray: (parentEl: HTMLButtonElement) => void;
  setComponentActive: (componentActive: boolean) => void;
  setDispatchChildClose: (
    parentEl: HTMLButtonElement,
    dispatchChildClose: () => void,
  ) => void;
  setIsListOpen: (isListOpen: boolean, parentEl: ParentElementType) => void;
  setListItems: (
    navigationList: FocusableElementType[],
    parentEl: ParentElementType,
  ) => void;
  topLevelParent: HTMLButtonElement | null;
}

export interface NavigationContextValueProps
  extends
    NavigationContextStoredValueProps,
    NavigationContextReturnValueProps {}
