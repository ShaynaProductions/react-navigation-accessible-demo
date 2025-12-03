import {use, useCallback} from "react";

import {returnTrueElementOrUndefined} from "@/ui/utilities";

import {FocusableElementType} from "../../NavigationTypes";
import {NavigationListContext} from "../../providers/NavigationListProvider";
import {UseNavigationListInternal, UseNavigationListReturnProps} from "./useNavigationListTypes";

export function useNavigationList(): UseNavigationListReturnProps {
    const navigationListContextObj = use(NavigationListContext);
    const {_getCurrentListItems, _registerListItem} =
        returnTrueElementOrUndefined(!!navigationListContextObj, navigationListContextObj);

    const currentListItems = _getCurrentListItems();
    const registerListItem = (focusableEl: FocusableElementType) => {
        _registerListItem(focusableEl);
    }

    const getCurrentIndex: UseNavigationListInternal["getCurrentIndex"] = useCallback(
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

    const setSpecificFocus: UseNavigationListReturnProps["setSpecificFocus"] = useCallback((item) => {
        item.focus({preventScroll: true});
    }, []);

    const setFirstFocus: UseNavigationListReturnProps["setFirstFocus"] = useCallback(() => {
        setSpecificFocus(currentListItems[0]);
    }, [currentListItems, setSpecificFocus]);

    const setLastFocus: UseNavigationListReturnProps["setLastFocus"] = useCallback(() => {

        setSpecificFocus(currentListItems[currentListItems.length - 1]);
    }, [currentListItems, setSpecificFocus]);

    const setNextFocus: UseNavigationListReturnProps["setNextFocus"] = useCallback((item) => {
        const newIndex = getCurrentIndex(item) + 1;
        if (newIndex >= currentListItems.length) {
            setFirstFocus()
        } else {
            setSpecificFocus(currentListItems[newIndex]);
        }
    }, [getCurrentIndex, currentListItems, setFirstFocus, setSpecificFocus]);

    const setPreviousFocus: UseNavigationListReturnProps["setPreviousFocus"] = useCallback((item) => {
        const newIndex = getCurrentIndex(item) - 1;
        if (newIndex < 0) {
            setLastFocus();
        } else {
            setSpecificFocus(currentListItems[newIndex]);
        }
    }, [getCurrentIndex, currentListItems, setLastFocus, setSpecificFocus])
    return {registerListItem, setFirstFocus, setLastFocus, setNextFocus, setPreviousFocus, setSpecificFocus};

}