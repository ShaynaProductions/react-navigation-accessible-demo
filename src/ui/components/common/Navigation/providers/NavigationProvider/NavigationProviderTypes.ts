import {FocusableElementType, ParentElementType} from "../../NavigationTypes";

export interface NavigationContextStoredValueProps {
    storedList?: FocusableElementType[];
    storedParentEl?: ParentElementType;
}

export interface NavigationContextInternalProps {
    _getNavigationArray: () => NavigationContextStoredValueProps[];
    getNavigationIndex: (parentEl: ParentElementType) => number;
    _getNavigationObjectByParent: (parentEl: ParentElementType) => NavigationContextStoredValueProps;
    setNavigationArrayObject: (
        index: number,
        updatedContent: Partial<NavigationContextStoredValueProps>) => void;
    setParentEl: (parentEl: ParentElementType) => void;

}

export interface NavigationContextReturnValueProps {
    _getNavigationArray: () => NavigationContextStoredValueProps[];
    _registerNavLink: (
        navigationList: FocusableElementType[],
        parentEl: ParentElementType,
    ) => void;
    _resetTopNavArray: (parentEl: HTMLButtonElement) => void;
    _setListItems: (
        navigationList: FocusableElementType[],
        parentEl: ParentElementType,
    ) => void;
}

export interface NavigationContextValueProps
    extends NavigationContextStoredValueProps,
        NavigationContextReturnValueProps {
}