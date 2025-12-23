"use client";
import { createContext, JSX, useCallback, useState } from "react";
import {
  NavigationContextInternalProps,
  NavigationContextReturnValueProps,
  NavigationContextStoredValueProps,
  NavigationContextValueProps,
} from "./NavigationProviderTypes";
import { EmptyObject } from "@/ui/types";
import { arraysEqual } from "@/ui/utilities";
import { ParentElementType } from "@/ui/components";

export const NavigationContext = createContext<
  NavigationContextValueProps | EmptyObject
>({});

const registerTopLevelParent = (parentEl, setTopLevelParent) => {
  setTopLevelParent(parentEl);
};

export function NavigationProvider({ children, value }): JSX.Element {
  const currentObj = { ...value };

  const [navigationArray, setNavigationArray] = useState([currentObj]);
  const [componentActive, setComponentActive] = useState<boolean>(false);
  const [topLevelParent, setTopLevelParent] = useState<ParentElementType>(
    currentObj.storedParentEl,
  );

  const getNavigationIndex: NavigationContextInternalProps["getNavigationIndex"] =
    useCallback(
      (parentEl) => {
        let foundIndex = -1,
          index = 0;
        for (const navObject of navigationArray) {
          const { storedParentEl } = navObject;
          if (storedParentEl === parentEl) {
            foundIndex = index;
            break;
          }
          index += 1;
        }
        return foundIndex;
      },
      [navigationArray],
    );

  const _getNavigationArray: NavigationContextInternalProps["_getNavigationArray"] =
    useCallback(() => {
      return navigationArray as NavigationContextStoredValueProps[];
    }, [navigationArray]);

  const setNavigationArrayObject: NavigationContextInternalProps["setNavigationArrayObject"] =
    useCallback(
      (index, updatedContent) => {
        const currentObj = _getNavigationArray()[index];
        const mutableArray = _getNavigationArray();
        mutableArray[index] = {
          ...currentObj,
          ...updatedContent,
        };
        setNavigationArray(mutableArray);
      },
      [_getNavigationArray],
    );

  const _setDispatchChildClose = useCallback(
    (parentEl: HTMLButtonElement, dispatchChildClose) => {
      const parentIndex: number = getNavigationIndex(parentEl);
      /* istanbul ignore else */
      if (parentIndex >= 0) {
        const currentObj = _getNavigationArray()[parentIndex];
        if (
          currentObj.dispatchChildClose?.toString() !==
          dispatchChildClose?.toString()
        ) {
          setNavigationArrayObject(parentIndex, {
            dispatchChildClose: dispatchChildClose,
          });
        }
      }
    },
    [_getNavigationArray, getNavigationIndex, setNavigationArrayObject],
  );

  const _setListItems: NavigationContextReturnValueProps["_setListItems"] =
    useCallback(
      (navigationList, parentEl) => {
        const parentIndex = getNavigationIndex(parentEl);
        /* istanbul ignore else */
        if (parentIndex >= 0) {
          const currentObj = _getNavigationArray()[parentIndex];
          if (
            !currentObj.storedList ||
            !arraysEqual(currentObj.storedList, navigationList)
          ) {
            setNavigationArrayObject(parentIndex, {
              storedList: navigationList,
            });
          }
        }
      },
      [_getNavigationArray, getNavigationIndex, setNavigationArrayObject],
    );

  const setParentEl: NavigationContextInternalProps["setParentEl"] =
    useCallback(
      (parentEl) => {
        const parentIndex = getNavigationIndex(parentEl);
        if (parentIndex === -1) {
          navigationArray.push({ storedParentEl: parentEl });
        }
      },
      [getNavigationIndex, navigationArray],
    );

  const _setIsListOpen: NavigationContextReturnValueProps["_setIsListOpen"] =
    useCallback(
      (isListOpen, parentEl) => {
        const parentIndex: number = getNavigationIndex(parentEl);
        const currentObj = _getNavigationArray()[parentIndex];
        /* istanbul ignore else */
        if (parentIndex >= 0 && currentObj.isSubListOpen !== isListOpen) {
          setNavigationArrayObject(parentIndex, {
            isSubListOpen: isListOpen,
          });
        }
      },

      [getNavigationIndex, _getNavigationArray, setNavigationArrayObject],
    );

  const _registerNavLink: NavigationContextReturnValueProps["_registerNavLink"] =
    (navigationList, parentEl) => {
      setParentEl(parentEl);
      _setListItems(navigationList, parentEl);
    };

  const _registerSubNav: NavigationContextReturnValueProps["_registerSubNav"] =
    useCallback(
      (isListOpen, parentEl, dispatchChildClose) => {
        setParentEl(parentEl);
        _setIsListOpen(isListOpen, parentEl);
        _setDispatchChildClose(
          parentEl as HTMLButtonElement,
          dispatchChildClose,
        );
      },
      [setParentEl, _setIsListOpen, _setDispatchChildClose],
    );
  const _resetTopNavArray: NavigationContextReturnValueProps["_resetTopNavArray"] =
    useCallback(
      (parentEl) => {
        const parentIndex = getNavigationIndex(parentEl);
        const nullIndex = getNavigationIndex(null);
        /* istanbul ignore else */
        if (parentIndex !== 0 && navigationArray[0].storedParentEl === null) {
          registerTopLevelParent(parentEl, setTopLevelParent);
          navigationArray.splice(nullIndex, 1);
        }
      },
      [getNavigationIndex, navigationArray, setTopLevelParent],
    );

  return (
    <NavigationContext.Provider
      value={{
        _componentActive: componentActive,
        _getNavigationArray,
        _registerNavLink,
        _registerSubNav,
        _resetTopNavArray,
        _setComponentActive: setComponentActive,
        _setDispatchChildClose,
        _setIsListOpen,
        _setListItems,
        _topLevelParent: topLevelParent,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

NavigationProvider.context = NavigationContext;
