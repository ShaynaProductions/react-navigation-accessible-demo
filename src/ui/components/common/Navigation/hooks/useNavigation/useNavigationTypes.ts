import {FocusableElementType, ParentElementType} from "@/ui/components/common/Navigation/NavigationTypes";


export interface UseNavigationTypes {
    registerNavigationItem: (
        navigationList: FocusableElementType[],
        parentEl: ParentElementType,
    ) => void;
    registerSubNav: (
        parentEl: ParentElementType,
    ) => void;
    setListItems: (
        navigationList: FocusableElementType[],
        parentEl: ParentElementType,
    ) => void;
}