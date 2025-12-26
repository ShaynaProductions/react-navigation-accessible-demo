import { ParentElementType } from "@/ui/components";
import { FocusableElementType } from "../../components/NavigationTypes";
import { NavigationObjectProps } from "../../providers";
import { NavigationHookFunctionsProps } from "./useNavigationTypes";

export const _getNextElementInList: NavigationHookFunctionsProps["_getNextElementInList"] =
  (focusedEl, currentList) => {
    const currentIndex = currentList.indexOf(focusedEl);
    const newIndex = currentIndex + 1;
    return currentList[newIndex];
  };

export const _getPreviousElementInList: NavigationHookFunctionsProps["_getPreviousElementInList"] =
  (focusedEl, currentList) => {
    const currentIndex = currentList.indexOf(focusedEl);
    const newIndex = currentIndex - 1;
    return currentList[newIndex];
  };

export const getRecursiveLastElementByParent: NavigationHookFunctionsProps["getRecursiveLastElementByParent"] =
  (focusableEl, getNavObjectByParent, getNavObjectContainingElement) => {
    let navObj: NavigationObjectProps;
    if (!!focusableEl && focusableEl.type === "button") {
      navObj = getNavObjectByParent(
        focusableEl as ParentElementType,
      ) as NavigationObjectProps;
      /* istanbul ignore next */
      const storedList = navObj.storedList || [];

      return getRecursiveLastElementByParent(
        storedList[storedList.length - 1] as ParentElementType,
        getNavObjectByParent,
        getNavObjectContainingElement,
      );
    } else {
      navObj = getNavObjectContainingElement(
        focusableEl as FocusableElementType,
      ) as NavigationObjectProps;
    }
    /* istanbul ignore next */
    const currentList = navObj.storedList || [];
    const listLength = currentList.length;

    return currentList[listLength - 1];
  };

export const getRecursiveTopElementByElement = (
  focusableEl,
  getNavObjectContainingElement,
  isInTopRow,
) => {
  const parentNavObject = getNavObjectContainingElement(focusableEl);
  const currentStoredParentEl =
    parentNavObject.storedParentEl as FocusableElementType;
  if (isInTopRow(currentStoredParentEl)) {
    return currentStoredParentEl;
  } else {
    return getRecursiveTopElementByElement(
      currentStoredParentEl,
      getNavObjectContainingElement,
      isInTopRow,
    ) as FocusableElementType;
  }
};
