import {
  FocusableElementType,
  ParentElementType,
} from "../../components/NavigationTypes";
import React from "react";

export interface NavigationProviderFunctionsProps {
  registercontrollingElement: (
    parentEl: ParentElementType,
    _setControllingElement: React.Dispatch<
      React.SetStateAction<ParentElementType>
    >,
  ) => void;
}
export interface NavigationContextStoredValueProps {
  dispatchChildClose?: (parentEl: HTMLButtonElement) => void;
  storedList?: FocusableElementType[];
  storedParentEl?: ParentElementType;
  isSubListOpen?: boolean;
}

export interface NavigationObjectProps extends NavigationContextStoredValueProps {
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
  updateTopParent: (parentEl: ParentElementType) => void;
}

export interface NavigationContextValueProps
  extends
    NavigationContextStoredValueProps,
    NavigationContextReturnValueProps {}
