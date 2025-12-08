import {FocusableElementType, ParentElementType} from "@/ui/components/common/Navigation/NavigationTypes";
import {NavigationContextStoredValueProps} from "../../providers";


export interface UseNavigationTypes {
    getNavigationParent: () => NavigationContextStoredValueProps;
    registerNavigationItem: (
        navigationList: FocusableElementType[],
        parentEl: ParentElementType,
    ) => void;
    registerSubNav: (
        parentEl: ParentElementType,
    ) => void;
    _resetTopNavArray: (parentEl: HTMLButtonElement) => void;
    setListItems: (
        navigationList: FocusableElementType[],
        parentEl: ParentElementType,
    ) => void;
}