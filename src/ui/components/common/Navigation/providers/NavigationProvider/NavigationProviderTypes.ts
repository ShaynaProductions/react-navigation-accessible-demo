"use client";
import {
  FocusableElementType,
  ParentElementType,
} from "../../components/NavigationTypes";

export type ControllingElementType = HTMLButtonElement | null;

export interface NavigationContextStoredValueProps {
  controllingEl: ControllingElementType;
  storedList?: FocusableElementType[];
  storedParentEl?: ParentElementType;
  isSubListOpen?: boolean;
}

export interface NavigationObjectProps extends NavigationContextStoredValueProps {
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
  _setControllingElement: (parentEl: ParentElementType) => void;
  _setDispatchChildClose: (
    parentEl: HTMLButtonElement,
    dispatchChildClose: () => void,
  ) => void;
  _setNavigationArrayObject: (
    index: number,
    updatedContent: Partial<NavigationObjectProps>,
  ) => void;
  _setParentEl: (parentEl: ParentElementType) => void;
}

export interface NavigationContextReturnValueProps {
  getControllingElement: () => ParentElementType;
  getNavigationArray: () => NavigationObjectProps[];
  isComponentActive: boolean;
  registerLinkInList: (
    navigationList: FocusableElementType[],
    parentEl: ParentElementType,
  ) => void;
  registerButtonInList: (
    isListOpen: boolean,
    parentEl: ParentElementType,
    dispatchChildClose: () => void,
  ) => void;
  setIsComponentActive: (isComponentActive: boolean) => void;
  setIsListOpen: (isListOpen: boolean, parentEl: ParentElementType) => void;
  setListItems: (
    navigationList: FocusableElementType[],
    parentEl: ParentElementType,
  ) => void;
  setShouldPassthrough: (shouldPassthrough: boolean) => void;
  shouldPassthrough: boolean;
  updateControllingElement: (parentEl: ParentElementType) => void;
}

export interface NavigationContextValueProps
  extends
    Omit<NavigationContextStoredValueProps, "controllingEl">,
    NavigationContextReturnValueProps {}
