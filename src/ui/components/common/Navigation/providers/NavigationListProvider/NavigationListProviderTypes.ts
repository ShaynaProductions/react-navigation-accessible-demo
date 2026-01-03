import {
  FocusableElementType,
  ParentElementType,
} from "../../components/NavigationTypes";

export interface NavigationListContextStoredValueProps {
  parentRef: React.RefObject<ParentElementType>;
}

export interface NavigationListContextReturnValueProps {
  getCurrentListItems: () => FocusableElementType[];
  getParentRef: () => React.RefObject<ParentElementType>;
  registerItemInList: (focusableEl: FocusableElementType) => void;
}
