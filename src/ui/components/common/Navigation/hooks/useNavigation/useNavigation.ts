"use client";
import {use, useCallback} from "react";
import {returnTrueElementOrUndefined} from "@/ui/utilities";
import {NavigationContext} from "../../providers";
import {FocusableElementType, ParentElementType} from "../../NavigationTypes";
import {
    getRecursiveLastElementByParent,
    getRecursiveTopElementByElement,
} from "./hookFunctions";
import {UseNavigationInternalTypes, UseNavigationTypes} from "./useNavigationTypes";



export default function useNavigation() {
    const navigationContextObj = use(NavigationContext);
    const {
        _getNavigationArray,
        _registerNavLink,
        _registerSubNav,
        _resetTopNavArray,
        _setIsListOpen,
        _setListItems
    } = returnTrueElementOrUndefined(!!navigationContextObj, navigationContextObj);

    const _getIndexInTopRow: UseNavigationInternalTypes["_getIndexInTopRow"] = useCallback(
        (focusedEl) => {
            const topRow = _getNavigationArray()[0];
            return topRow.storedList?.indexOf(focusedEl);
        },
        [_getNavigationArray],
    );

    const _getNavigationObjectByParent: UseNavigationInternalTypes["_getNavigationObjectByParent"] =
        useCallback(
            (parentEl) => {
                let returnObj = {};
                const navArray = _getNavigationArray();
                for (const navObject of navArray) {
                    const {storedParentEl} = navObject;
                    /* istanbul ignore else */
                    if (storedParentEl === parentEl) {
                        returnObj = navObject;
                        break;
                    }
                }
                return returnObj;
            },
            [_getNavigationArray],
        );

    const _getNavigationObjectContainingElement:
        UseNavigationInternalTypes["_getNavigationObjectContainingElement"] =
        useCallback(
            (focusedEl) => {
                let returnObj = {};
                for (const navObject of _getNavigationArray()) {
                    /* istanbul ignore next */
                    const storedList = navObject.storedList || [];
                    /* istanbul ignore else */
                    if (storedList.length > 0 && storedList.indexOf(focusedEl) > -1) {
                        returnObj = navObject;
                        break;
                    }
                }
                return returnObj;
            },
            [_getNavigationArray],
        );

    const _getLastFocusableElementTypeByParent:
        UseNavigationInternalTypes["_getLastFocusableElementTypeByParent"] = useCallback(
        (focusableEl) => {
            return getRecursiveLastElementByParent(
                focusableEl,
                _getNavigationObjectByParent,
                _getNavigationObjectContainingElement
            );
        }, [_getNavigationObjectByParent, _getNavigationObjectContainingElement])

    const _getNextElementInRow: UseNavigationInternalTypes["_getNextElementInRow"] = useCallback(
        (
            focusableEl,
            currentList,
        ) => {
            const currentIndex = currentList.indexOf(focusableEl);
            const newIndex = currentIndex + 1;
            return currentList[newIndex];
        },
        [],
    );

    const _getPreviousElementInRow: UseNavigationInternalTypes["_getPreviousElementInRow"] =
        useCallback(
            (focusableEl, currentList) => {
                const currentIndex = currentList.indexOf(focusableEl);
                const newIndex = currentIndex - 1;
                return currentList[newIndex];
            }, []);


    const _getTopParentByElement: UseNavigationInternalTypes["_getTopParentByElement"] =
        useCallback(
            (focusableEl) => {
                const {storedParentEl} = _getNavigationObjectContainingElement(focusableEl);
                return storedParentEl as ParentElementType
            },
            [_getNavigationObjectContainingElement],
        );

    const _isInTopRow: UseNavigationInternalTypes["_isInTopRow"] = useCallback(
        (focusableEl) => {
            const topIndex = _getIndexInTopRow(focusableEl);
            return topIndex >= 0;
        }, [_getIndexInTopRow])

    const _getTopElement: UseNavigationInternalTypes["_getTopElement"] = useCallback(
        (focusableEl) => {

            return getRecursiveTopElementByElement(focusableEl, _getNavigationObjectContainingElement, _getIndexInTopRow);
        }, [_getIndexInTopRow, _getNavigationObjectContainingElement])

    const getTopNavigationParent: UseNavigationTypes["getTopNavigationParent"] =
        useCallback(() => {
            return _getNavigationArray()[0];
        }, [_getNavigationArray]);


    const _getNextElement: UseNavigationInternalTypes["_getNextElement"] = useCallback(
        (focusableEl, currentItemsList) => {
            return _getNextElementInRow(
                focusableEl,
                currentItemsList,
            );
        }, [_getNextElementInRow]);

    const _getPreviousByElement: UseNavigationInternalTypes["_getPreviousElement"] = useCallback(
        (focusableEl) => {
            const currentObject = _getNavigationObjectContainingElement(focusableEl);
            /* istanbul ignore next */
            const currentItemsList = currentObject.storedList || [];
            const currentParent = currentObject.storedParentEl;
            const isInTopRow = _isInTopRow(focusableEl);

            // default to previous item in List
            let prevFocusableEl: FocusableElementType = _getPreviousElementInRow(
                focusableEl,
                currentItemsList,
            );

            // Not in top row, and is first child
            if (!isInTopRow && currentItemsList.indexOf(focusableEl) === 0) {
                prevFocusableEl = currentParent as FocusableElementType;
            }

            if (!isInTopRow) {
                return prevFocusableEl;
            }

        }, [_getNavigationObjectContainingElement, _getPreviousElementInRow, _isInTopRow])

    // -------------------------------------------------------
    // Controllers
    // -------------------------------------------------------

    const getNextByButton: UseNavigationTypes["getNextByButton"] = useCallback((
        buttonEl, isSubListOpen
    ) => {
        const buttonNavObject = _getNavigationObjectContainingElement(buttonEl);
        /* istanbul ignore next */
        const currentItemsList = buttonNavObject.storedList || [];

        let nextFocusableElement: FocusableElementType = _getNextElement(
            buttonEl,
            currentItemsList
        );
        // default to next item in List
        const currentNavObject = _getNavigationObjectByParent(
            buttonEl as HTMLButtonElement,
        );
        const {storedList} = currentNavObject;
        /* istanbul ignore next */
        const subNavigation = storedList || [];

        // controlled list open, move into the first child.
        if (isSubListOpen && subNavigation.length > 0) {
            nextFocusableElement = subNavigation[0];
        }

        //last focusable element and sub list is collapsed. Set to topmost
        // parent.
        if (!isSubListOpen && currentItemsList.indexOf(buttonEl) === currentItemsList.length - 1) {
            nextFocusableElement = _getTopParentByElement(buttonEl) as FocusableElementType;
        }

        return nextFocusableElement;

    }, [_getNavigationObjectByParent, _getNavigationObjectContainingElement, _getNextElement, _getTopParentByElement]);

    const getNextByLink: UseNavigationTypes["getNextByLink"] = useCallback((linkEl) => {
                const linkNavObject = _getNavigationObjectContainingElement(linkEl);
                /* istanbul ignore next */
                const currentItemsList = linkNavObject.storedList || [];

                // default to next item in List
                let nextFocusableEl: FocusableElementType = _getNextElement(
                    linkEl,
                    currentItemsList,
                );

                if (currentItemsList.indexOf(linkEl) === currentItemsList.length - 1) {
                    const {storedParentEl} = linkNavObject;
                    const isInTopRow
                        = storedParentEl && _isInTopRow(storedParentEl);
                    if (isInTopRow) {
                        nextFocusableEl = storedParentEl as FocusableElementType;
                    } else {
                        // get Top Element
                        const topParent = _getTopElement(linkEl);
                        const lastEl = _getLastFocusableElementTypeByParent(topParent as FocusableElementType) as FocusableElementType;

                        if (linkEl === lastEl) {
                            nextFocusableEl = topParent as FocusableElementType;

                        } else {
                            const parentNavObject = _getNavigationObjectContainingElement(storedParentEl as FocusableElementType);
                            /* istanbul ignore next */
                            const parentList = parentNavObject.storedList || [];
                            nextFocusableEl = _getNextElementInRow(storedParentEl as FocusableElementType, parentList);
                        }
                    }
                }
                return nextFocusableEl;

            }
            ,
            [_getLastFocusableElementTypeByParent, _getNavigationObjectContainingElement, _getNextElement, _getNextElementInRow, _getTopElement, _isInTopRow]
        )
    ;


    const getPreviousByButton: UseNavigationTypes["getPreviousByButton"] = useCallback((focusableEl) => {
        return _getPreviousByElement(focusableEl);
    }, [_getPreviousByElement])

    const getPreviousByLink = useCallback((focusableEl: FocusableElementType) => {
        let previousFocusableEl = _getPreviousByElement(focusableEl) as FocusableElementType;

        if (previousFocusableEl.type === "button") {
            const navObj = _getNavigationObjectByParent(previousFocusableEl as ParentElementType);
            /* istanbul ignore next */
            const currentList = navObj.storedList || [];
            if (currentList.indexOf(focusableEl) < 0) {
                /* istanbul ignore next */
                const storedList = navObj.storedList || [];
                const isSubListOpen = navObj.isSubListOpen;
                /* istanbul ignore else */
                if (isSubListOpen) {
                    previousFocusableEl = storedList[storedList.length - 1];
                }
            }


        }
        return previousFocusableEl;
    }, [_getNavigationObjectByParent, _getPreviousByElement])


    return {
        getTopNavigationParent,
        getNextByButton,
        getNextByLink,
        getPreviousByButton,
        getPreviousByLink,
        registerNavigationItem: _registerNavLink,
        registerSubNavigation: _registerSubNav,
        _resetTopNavArray: _resetTopNavArray,
        setIsListOpen: _setIsListOpen,
        setListItems: _setListItems,
    }

}