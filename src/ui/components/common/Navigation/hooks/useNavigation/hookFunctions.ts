import { ParentElementType } from "@/ui/components";
import { FocusableElementType } from "../../components/NavigationTypes";
import { NavigationObjectProps } from "../../providers";
import {
  NavigationHookFunctionsProps,
  UseNavigationReturnTypes,
} from "./useNavigationTypes";

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

export const returnStoredList: UseNavigationReturnTypes["returnStoredList"] = (
  storedList,
) => {
  /* istanbul ignore next */
  return storedList || [];
};

export const getRecursiveLastElementByParent: NavigationHookFunctionsProps["getRecursiveLastElementByParent"] =
  (focusableEl, getNavObjectByParent, getNavObjectContainingElement) => {
    let navObj: NavigationObjectProps;
    if (!!focusableEl && focusableEl.type === "button") {
      navObj = getNavObjectByParent(
        focusableEl as ParentElementType,
      ) as NavigationObjectProps;
      const storedList = returnStoredList(navObj.storedList);

      return getRecursiveLastElementByParent(
        storedList[storedList.length - 1],
        getNavObjectByParent,
        getNavObjectContainingElement,
      );
    } else {
      navObj = getNavObjectContainingElement(
        focusableEl,
      ) as NavigationObjectProps;
    }
    const currentList = returnStoredList(navObj.storedList);
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
