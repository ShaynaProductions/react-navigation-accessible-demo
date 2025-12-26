import {
  FocusableElementType,
  ParentElementType,
} from "../../components/NavigationTypes";
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

  _setNavigationArrayObject: (
    index: number,
    updatedContent: Partial<NavigationObjectProps>,
  ) => void;
  _setParentEl: (parentEl: ParentElementType) => void;
}

export interface NavigationContextReturnValueProps {
  getNavigationArray: () => NavigationObjectProps[];
  isComponentActive: boolean;

  setDispatchChildClose: (
    parentEl: HTMLButtonElement,
    dispatchChildClose: () => void,
  ) => void;
  setIsComponentActive: (isComponentActive: boolean) => void;
  setIsListOpen: (isListOpen: boolean, parentEl: ParentElementType) => void;
  setListItems: (
    navigationList: FocusableElementType[],
    parentEl: ParentElementType,
  ) => void;
  registerLink: (
    navigationList: FocusableElementType[],
    parentEl: ParentElementType,
  ) => void;
  registerSubNavigation: (
    isListOpen: boolean,
    parentEl: ParentElementType,
    dispatchChildClose: () => void,
  ) => void;
  resetTopNavigation: (parentEl: HTMLButtonElement) => void;
  topLevelParent: HTMLButtonElement | null;
}

export interface NavigationContextValueProps
  extends
    NavigationContextStoredValueProps,
    NavigationContextReturnValueProps {}
