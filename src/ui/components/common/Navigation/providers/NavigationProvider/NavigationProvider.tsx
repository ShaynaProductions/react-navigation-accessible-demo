"use client";
import { createContext, JSX, useCallback, useState } from "react";
import {
  NavigationContextInternalProps,
  NavigationContextReturnValueProps,
  NavigationContextValueProps,
} from "./NavigationProviderTypes";
import { EmptyObject } from "@/ui/types";
import { arraysEqual } from "@/ui/utilities";
import { ParentElementType } from "@/ui/components";

export const NavigationContext = createContext<
  NavigationContextValueProps | EmptyObject
>({});

export function NavigationProvider({ children, value }): JSX.Element {
  const { controllingEl, ...rest } = value;

  const currentObj = { ...rest };

  const [navigationArray, setNavigationArray] = useState([currentObj]);
  const [isComponentActive, setIsComponentActive] = useState<boolean>(false);
  const [controllingElement, _setControllingElement] =
    useState<ParentElementType>(controllingEl);
  const [shouldPassthrough, setShouldPassthrough] = useState<boolean>(false);

  const _getNavigationIndex: NavigationContextInternalProps["_getNavigationIndex"] =
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

  const getNavigationArray: NavigationContextReturnValueProps["getNavigationArray"] =
    useCallback(() => {
      return navigationArray;
    }, [navigationArray]);

  const _setNavigationArrayObject: NavigationContextInternalProps["_setNavigationArrayObject"] =
    useCallback(
      (index, updatedContent) => {
        const currentObj = getNavigationArray()[index];
        const mutableArray = getNavigationArray();
        mutableArray[index] = {
          ...currentObj,
          ...updatedContent,
        };
        setNavigationArray(mutableArray);
      },
      [getNavigationArray],
    );
  const _setParentEl: NavigationContextInternalProps["_setParentEl"] =
    useCallback(
      (parentEl) => {
        const parentIndex = _getNavigationIndex(parentEl);
        if (parentIndex === -1) {
          navigationArray.push({ storedParentEl: parentEl });
        }
      },
      [_getNavigationIndex, navigationArray],
    );

  const getControllingElement = useCallback(() => {
    return controllingElement;
  }, [controllingElement]);

  const updateControllingElement = (parentEl) => {
    if (getControllingElement() !== parentEl) {
      _setControllingElement(parentEl);
    }
    // }
  };
  const _setDispatchChildClose: NavigationContextInternalProps["_setDispatchChildClose"] =
    useCallback(
      (parentEl: HTMLButtonElement, dispatchChildClose) => {
        const parentIndex: number = _getNavigationIndex(parentEl);
        /* istanbul ignore else */
        if (parentIndex >= 0) {
          const currentObj = getNavigationArray()[parentIndex];
          if (
            currentObj.dispatchChildClose?.toString() !==
            dispatchChildClose?.toString()
          ) {
            _setNavigationArrayObject(parentIndex, {
              dispatchChildClose: dispatchChildClose,
            });
          }
        }
      },
      [getNavigationArray, _getNavigationIndex, _setNavigationArrayObject],
    );

  const setIsListOpen: NavigationContextReturnValueProps["setIsListOpen"] =
    useCallback(
      (isListOpen, parentEl) => {
        const parentIndex: number = _getNavigationIndex(parentEl);
        const currentObj = getNavigationArray()[parentIndex];
        /* istanbul ignore else */
        if (parentIndex >= 0 && currentObj.isSubListOpen !== isListOpen) {
          _setNavigationArrayObject(parentIndex, {
            isSubListOpen: isListOpen,
          });
        }
      },

      [_getNavigationIndex, getNavigationArray, _setNavigationArrayObject],
    );

  const setListItems: NavigationContextReturnValueProps["setListItems"] =
    useCallback(
      (navigationList, parentEl) => {
        const parentIndex = _getNavigationIndex(parentEl);

        const currentObj = getNavigationArray()[parentIndex];
        if (
          !currentObj.storedList ||
          !arraysEqual(currentObj.storedList, navigationList)
        ) {
          _setNavigationArrayObject(parentIndex, {
            storedList: navigationList,
          });
        }
      },
      [_getNavigationIndex, getNavigationArray, _setNavigationArrayObject],
    );

  const registerLinkInList: NavigationContextReturnValueProps["registerLinkInList"] =
    (navigationList, parentEl) => {
      _setParentEl(parentEl);
      setListItems(navigationList, parentEl);
    };

  const registerButtonInList: NavigationContextReturnValueProps["registerButtonInList"] =
    useCallback(
      (isListOpen, parentEl, dispatchChildClose) => {
        _setParentEl(parentEl);
        setIsListOpen(isListOpen, parentEl);
        _setDispatchChildClose(
          parentEl as HTMLButtonElement,
          dispatchChildClose,
        );
      },
      [_setParentEl, setIsListOpen, _setDispatchChildClose],
    );

  return (
    <NavigationContext.Provider
      value={{
        getNavigationArray,
        isComponentActive,
        shouldPassthrough,
        getControllingElement,
        registerLinkInList: registerLinkInList,
        registerButtonInList,
        setIsComponentActive,
        setIsListOpen,
        setListItems,
        setShouldPassthrough,
        updateControllingElement,
      }}
    >
      {children}
    </NavigationContext.Provider>
  );
}

NavigationProvider.context = NavigationContext;
