"use client"
import {createContext, JSX, useCallback, useState} from "react";
import {
    NavigationContextInternalProps,
    NavigationContextReturnValueProps,
    NavigationContextStoredValueProps,
    NavigationContextValueProps
} from "./NavigationProviderTypes";
import {EmptyObject} from "@/ui/types";
import {arraysEqual} from "@/ui/utilities";

export const NavigationContext = createContext<
    NavigationContextValueProps | EmptyObject
>({});

export function NavigationProvider({children, value}): JSX.Element {
    const currentObj = {...value};

    const [navigationArray, setNavigationArray] = useState([currentObj]);

    const getNavigationIndex: NavigationContextInternalProps["getNavigationIndex"] = useCallback((parentEl) => {
        let foundIndex = -1, index = 0;
        for (const navObject of navigationArray) {
            const {storedParentEl} = navObject;
            if (storedParentEl === parentEl) {
                foundIndex = index;
                break;
            }
            index += 1;
        }
        return foundIndex;

    }, [navigationArray])

    const _getNavigationArray: NavigationContextInternalProps["_getNavigationArray"] = useCallback(() => {
        return navigationArray as NavigationContextStoredValueProps[];
    }, [navigationArray]);

    const setNavigationArrayObject: NavigationContextInternalProps["setNavigationArrayObject"] = useCallback((index, updatedContent) => {
        const currentObj = _getNavigationArray()[index];
        const mutableArray = _getNavigationArray();
        mutableArray[index] = {
            ...currentObj,
            ...updatedContent,
        };
        setNavigationArray(mutableArray);
    }, [_getNavigationArray])

    const _setListItems: NavigationContextReturnValueProps["_setListItems"] = useCallback((navigationList, parentEl) => {
        const parentIndex = getNavigationIndex(parentEl);
        /* istanbul ignore else */
        if (parentIndex >= 0) {
            const currentObj = _getNavigationArray()[parentIndex];
            if (!currentObj.storedList ||
                !arraysEqual(currentObj.storedList, navigationList)) {
                setNavigationArrayObject(parentIndex, {storedList: navigationList});
            }
        }
        // console.log(_getNavigationArray());
    }, [_getNavigationArray, getNavigationIndex, setNavigationArrayObject]);

    const setParentEl: NavigationContextInternalProps["setParentEl"] = useCallback((parentEl) => {
        const parentIndex = getNavigationIndex(parentEl);
        if (parentIndex === -1) {
            navigationArray.push({storedParentEl: parentEl});
        }
    }, [getNavigationIndex, navigationArray])


    const _registerNavLink: NavigationContextReturnValueProps["_registerNavLink"] =
        (navigationList, parentEl) => {
            setParentEl(parentEl);
            _setListItems(navigationList, parentEl);
        };

    const _registerSubNav: NavigationContextReturnValueProps["_registerSubNav"] = useCallback((parentEl) => {
        const parentIndex = getNavigationIndex(parentEl);
        if (parentIndex === -1) {
            setParentEl(parentEl);
        }
    }, [getNavigationIndex, setParentEl])

    const _resetParentNav: NavigationContextReturnValueProps["_resetParentNav"] =
        useCallback(
            (parentEl) => {
                const parentIndex = getNavigationIndex(parentEl);
                /* istanbul ignore else */
                if (parentIndex !== 0) {
                    navigationArray.shift();
                }
            },
            [getNavigationIndex, navigationArray],
        );

    return (
        <NavigationContext.Provider
            value={{
                _getNavigationArray,
                _registerNavLink,
                _registerSubNav,
                _resetParentNav,
                _setListItems
            }}>{children}</NavigationContext.Provider>
    )
}

NavigationProvider.context = NavigationContext;