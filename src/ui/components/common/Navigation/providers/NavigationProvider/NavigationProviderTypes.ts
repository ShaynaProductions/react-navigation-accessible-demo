import {FocusableElementType, ParentElementType} from "@/ui/components/common/Navigation/NavigationTypes";


export interface NavigationContextStoredValueProps {
    storedList?: FocusableElementType[];
    storedParentEl?: ParentElementType;
}

export interface NavigationContextInternalProps {
   getNavigationArray: () => NavigationContextStoredValueProps[];
    getNavigationIndex: (parentEl: ParentElementType) => number;
    setNavigationArrayObject: (
        index: number,
        updatedContent: Partial<NavigationContextStoredValueProps>) => void;
    setParentEl: (parentEl: ParentElementType) => void;
   
}

export interface NavigationContextReturnValueProps {
    _registerNavItem: (
        navigationList: FocusableElementType[],
        parentEl: ParentElementType,
    ) => void;
    _registerSubNav: (
        parentEl: ParentElementType,
    ) => void;
    _setListItems: (
        navigationList: FocusableElementType[],
        parentEl: ParentElementType,
    ) => void;
}

export interface NavigationContextValueProps
    extends NavigationContextStoredValueProps,
        NavigationContextReturnValueProps {
}