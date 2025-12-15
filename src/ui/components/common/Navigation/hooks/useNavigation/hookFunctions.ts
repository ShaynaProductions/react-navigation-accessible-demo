import {ParentElementType} from "@/ui/components";
import {FocusableElementType} from "../../NavigationTypes";
import {NavigationContextStoredValueProps} from "../../providers";
import {UseNavigationInternalTypes} from "./useNavigationTypes";


export const getRecursiveTopElementByElement = (focusableEl, getNavObjectContainingElement, isInTopRow) => {

    const parentNavObject = getNavObjectContainingElement(focusableEl);
    const currentStoredParentEl = parentNavObject.storedParentEl as FocusableElementType;
    if (isInTopRow(currentStoredParentEl) > 0) {
        return currentStoredParentEl;
    } else {
        return getRecursiveTopElementByElement(currentStoredParentEl, getNavObjectContainingElement, isInTopRow) as FocusableElementType;
    }
}

export const getRecursiveLastElementByParent = (
    focusableEl: FocusableElementType,
    getNavObjectByParent: UseNavigationInternalTypes["_getNavigationObjectByParent"],
    getNavObjectContainingElement: UseNavigationInternalTypes["_getNavigationObjectContainingElement"]
) => {
    let navObj: NavigationContextStoredValueProps;
    if (focusableEl.type === "button") {
        navObj = getNavObjectByParent(focusableEl as ParentElementType);
        /* istanbul ignore next */
        const storedList = navObj.storedList || [];

        return getRecursiveLastElementByParent(
            storedList[storedList.length - 1],
            getNavObjectByParent,
            getNavObjectContainingElement
        )
    } else {
        navObj = getNavObjectContainingElement(focusableEl);
}
    /* istanbul ignore next */
    const currentList = navObj.storedList || [];
    const listLength = currentList.length;

    return currentList[listLength - 1];
}