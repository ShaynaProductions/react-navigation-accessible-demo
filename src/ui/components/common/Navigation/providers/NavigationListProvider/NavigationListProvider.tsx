"use client";
import React, {createContext, useCallback, useState} from "react";
import {EmptyObject} from "@/ui/types";

import {FocusableElementType} from "../../NavigationTypes";
import {
    NavigationListContextInternalProps,
    NavigationListContextReturnValueProps,
    NavigationListContextStoredValueProps,
} from "./NavigationListProviderTypes";

export const NavigationListContext = createContext<
    Partial<NavigationListContextReturnValueProps> | EmptyObject
>({});

export default function NavigationListProvider({children, value}) {
    const [currentListItems] = useState<FocusableElementType[]>([]);
    const {parentRef}: NavigationListContextStoredValueProps = value;

    const _getCurrentIndex: NavigationListContextInternalProps["GetCurrentIndex"] = useCallback(
        (
            focusableEl: FocusableElementType
        ): number => {
            let currentIndex = -1;
            /* istanbul ignore else */
            if (currentListItems.length > 0) {
                currentIndex = currentListItems.indexOf(focusableEl);
            }
            return currentIndex;
        }, [currentListItems],
    );

    const registerListItem = (focusableEl: FocusableElementType) => {
        /* istanbul ignore else */
        if (currentListItems?.indexOf(focusableEl) === -1) {
            currentListItems.push(focusableEl);
        }
    }

    const setSpecificFocus: NavigationListContextReturnValueProps["setSpecificFocus"] = useCallback((item) => {
        item.focus({preventScroll: true});
    }, []);

    const setFirstFocus: NavigationListContextReturnValueProps["setFirstFocus"] = useCallback(() => {
        setSpecificFocus(currentListItems[0]);
    }, [currentListItems, setSpecificFocus]);

    const setLastFocus: NavigationListContextReturnValueProps["setLastFocus"] = useCallback(() => {
        setSpecificFocus(currentListItems[currentListItems.length - 1]);
    }, [currentListItems, setSpecificFocus]);

    const setNextFocus: NavigationListContextReturnValueProps["setNextFocus"] = useCallback((item) => {
        const newIndex = _getCurrentIndex(item) + 1;
        if (newIndex >= currentListItems.length) {
            setFirstFocus()
        } else {
            setSpecificFocus(currentListItems[newIndex]);
        }
    }, [_getCurrentIndex, currentListItems, setFirstFocus, setSpecificFocus]);

    const setPreviousFocus: NavigationListContextReturnValueProps["setPreviousFocus"] = useCallback((item) => {
        const newIndex = _getCurrentIndex(item) - 1;
        if (newIndex < 0) {
            setLastFocus();
        } else {
            setSpecificFocus(currentListItems[newIndex]);
        }
    }, [_getCurrentIndex, currentListItems, setLastFocus, setSpecificFocus])

    return (
        <NavigationListContext.Provider
            value={{
                parentRef,
                registerListItem,
                setFirstFocus,
                setLastFocus,
                setNextFocus,
                setPreviousFocus,
                setSpecificFocus
            }}
        >
            {children}
        </NavigationListContext.Provider>
    );
}

NavigationListProvider.context = NavigationListContext;
