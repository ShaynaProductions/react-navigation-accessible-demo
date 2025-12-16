"use client";
import React, {createContext, useCallback, useState} from "react";
import {EmptyObject} from "@/ui/types";

import {FocusableElementType} from "../../NavigationTypes";
import {
    NavigationListContextReturnValueProps,
    NavigationListContextStoredValueProps,
} from "./NavigationListProviderTypes";

export const NavigationListContext = createContext<
    Partial<NavigationListContextReturnValueProps> | EmptyObject
>({});

export function NavigationListProvider({children, value}) {
    const [currentListItems] = useState<FocusableElementType[]>([]);
    const {parentRef}: NavigationListContextStoredValueProps = value;


    const _getCurrentListItems: NavigationListContextReturnValueProps["_getCurrentListItems"] = useCallback(() => {
        return currentListItems;
    }, [currentListItems]);

    const _getParentRef = useCallback(()=> {
        return parentRef;
    },[parentRef])

    const _registerItemInList = useCallback((focusableEl: FocusableElementType) => {
        /* istanbul ignore else */
        if (currentListItems?.indexOf(focusableEl) === -1) {
            currentListItems.push(focusableEl);
        }
    }, [currentListItems])


    return (
        <NavigationListContext.Provider
            value={{
                _getCurrentListItems,
                _getParentRef,
                _registerItemInList,
            }}
        >
            {children}
        </NavigationListContext.Provider>
    );
}

NavigationListProvider.context = NavigationListContext;
