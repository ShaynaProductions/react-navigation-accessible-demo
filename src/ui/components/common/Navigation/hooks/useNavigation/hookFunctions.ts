import {ParentElementType} from "@/ui/components";
import {FocusableElementType} from "../../NavigationTypes";
import {NavigationArrayProps,} from "../../providers";
import {ExternalNavHookProps} from "./useNavigationTypes";


export const getRecursiveTopElementByElement = (focusableEl, getNavObjectContainingElement, isInTopRow) => {

    const parentNavObject = getNavObjectContainingElement(focusableEl);
    const currentStoredParentEl = parentNavObject.storedParentEl as FocusableElementType;
    if (isInTopRow(currentStoredParentEl) > 0) {
        return currentStoredParentEl;
    } else {
        return getRecursiveTopElementByElement(currentStoredParentEl, getNavObjectContainingElement, isInTopRow) as FocusableElementType;
    }
}

export const getRecursiveLastElementByParent: ExternalNavHookProps["getRecursiveLastElementByParent"] = (
    focusableEl,
    getNavObjectByParent,
    getNavObjectContainingElement
) => {
    let navObj: NavigationArrayProps;
    if (!!focusableEl && focusableEl.type === "button") {
        navObj = getNavObjectByParent(focusableEl as ParentElementType) as NavigationArrayProps;
        /* istanbul ignore next */
        const storedList = navObj.storedList || [];

        return getRecursiveLastElementByParent(
            storedList[storedList.length - 1] as ParentElementType,
            getNavObjectByParent,
            getNavObjectContainingElement
        )
    } else {
        navObj = getNavObjectContainingElement(focusableEl as FocusableElementType) as NavigationArrayProps;
}
    /* istanbul ignore next */
    const currentList = navObj.storedList || [];
    const listLength = currentList.length;

    return currentList[listLength - 1];
}