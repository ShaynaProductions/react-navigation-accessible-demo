"use client";
import { use, useCallback, useState } from "react";
import {
  getFocusableElement,
  returnTrueElementOrUndefined,
} from "@/ui/utilities";
import {
  _getNextElementInList,
  _getPreviousElementInList,
  _returnStoredList,
  getRecursiveLastElementByParent,
  getRecursiveTopElementByElement,
} from "./hookFunctions";
import {
  NavigationContext,
  NavigationContextReturnValueProps,
  NavigationObjectProps,
} from "../../providers";
import {
  FocusableElementType,
  ParentElementType,
} from "../../components/NavigationTypes";
import {
  UseNavigationInternalTypes,
  UseNavigationReturnTypes,
} from "./useNavigationTypes";

export default function useNavigation() {
  const navigationContextObj = use(NavigationContext);
  const {
    isComponentActive,
    getNavigationArray,
    // getTopLevelParent,
    registerInList,
    registerLink,
    registerButtonInList,
    resetTopNavigation,
    setIsComponentActive,
    setIsListOpen,
    setListItems,
    topLevelParent,
    updateTopParent,
  } = returnTrueElementOrUndefined(
    !!navigationContextObj,
    navigationContextObj,
  );
  const [_lastComponentEl, _setLastComponentEl] =
    useState<FocusableElementType | null>(null);

  const _getIndexInTopRow: UseNavigationInternalTypes["_getIndexInTopRow"] =
    useCallback(
      (focusedEl) => {
        const topRow = getNavigationArray()[0];
        return topRow.storedList?.indexOf(focusedEl);
      },
      [getNavigationArray],
    );

  const _getFirstChildInRow: UseNavigationInternalTypes["_getFirstChildInRow"] =
    useCallback(
      (index) => {
        /*istanbul ignore next */
        const currentList = _returnStoredList(
          getNavigationArray()[index].storedList,
        );
        return currentList[0];
      },
      [getNavigationArray],
    );

  const _getLastChildInRow: UseNavigationInternalTypes["_getLastChildInRow"] =
    useCallback(
      (index) => {
        const currentList = _returnStoredList(
          getNavigationArray()[index].storedList,
        );
        return currentList[currentList.length - 1];
      },
      [getNavigationArray],
    );

  const _getNavigationObjectByParent: UseNavigationInternalTypes["_getNavigationObjectByParent"] =
    useCallback(
      (parentEl) => {
        let returnObj = {};
        const navArray = getNavigationArray();
        for (const navObject of navArray) {
          const { storedParentEl } = navObject;
          /* istanbul ignore else */
          if (storedParentEl === parentEl) {
            returnObj = navObject;
            break;
          }
        }
        return returnObj;
      },
      [getNavigationArray],
    );

  const _getNavigationObjectContainingElement: UseNavigationInternalTypes["_getNavigationObjectContainingElement"] =
    useCallback(
      (focusedEl) => {
        let returnObj = {};
        for (const navObject of getNavigationArray()) {
          const storedList = _returnStoredList(navObject.storedList);
          /* istanbul ignore else */
          if (storedList.length > 0 && storedList.indexOf(focusedEl) > -1) {
            returnObj = navObject;
            break;
          }
        }
        return returnObj;
      },
      [getNavigationArray],
    );

  const getTopParentElement: UseNavigationReturnTypes["getTopParentElement"] =
    useCallback(() => {
      return getNavigationArray()[0];
    }, [getNavigationArray]);

  const _closeComponent: UseNavigationInternalTypes["_closeComponent"] =
    useCallback(() => {
      const { storedList } = getTopParentElement();
      setIsComponentActive(false);
      storedList?.map((currentEl) => {
        if (currentEl.type === "button") {
          const { isSubListOpen, dispatchChildClose } =
            _getNavigationObjectByParent(currentEl as ParentElementType);

          if (isSubListOpen && dispatchChildClose) {
            dispatchChildClose(currentEl as HTMLButtonElement);
          }
        }
      });
    }, [
      _getNavigationObjectByParent,
      getTopParentElement,
      setIsComponentActive,
    ]);

  const _getLastFocusableElementTypeByParent: UseNavigationInternalTypes["_getLastFocusableElementTypeByParent"] =
    useCallback(
      (parentEl) => {
        return getRecursiveLastElementByParent(
          parentEl as ParentElementType,
          _getNavigationObjectByParent,
          _getNavigationObjectContainingElement,
        );
      },
      [_getNavigationObjectByParent, _getNavigationObjectContainingElement],
    );

  const _getParentByElement: UseNavigationInternalTypes["_getParentByElement"] =
    useCallback(
      (focusedEl) => {
        const { storedParentEl } =
          _getNavigationObjectContainingElement(focusedEl);
        return storedParentEl as ParentElementType;
      },
      [_getNavigationObjectContainingElement],
    );
  const _isInTopRow: UseNavigationInternalTypes["_isInTopRow"] = useCallback(
    (focusedEl) => {
      const topIndex = _getIndexInTopRow(focusedEl);
      return topIndex >= 0;
    },
    [_getIndexInTopRow],
  );

  const _getPreviousByElement: UseNavigationInternalTypes["_getPreviousByElement"] =
    useCallback(
      (focusedEl) => {
        const currentObject = _getNavigationObjectContainingElement(focusedEl);
        const currentItemsList = _returnStoredList(currentObject.storedList);
        const currentParent = currentObject.storedParentEl;
        const isInTopRow = _isInTopRow(focusedEl);

        // default to previous item in List
        let prevFocusableEl: FocusableElementType = _getPreviousElementInList(
          focusedEl,
          currentItemsList,
        );

        // Not in top row, and is first child
        if (!isInTopRow && currentItemsList.indexOf(focusedEl) === 0) {
          prevFocusableEl = currentParent as FocusableElementType;
        }

        if (!isInTopRow || focusedEl !== _getFirstChildInRow(0)) {
          return prevFocusableEl;
        }
      },
      [_getFirstChildInRow, _getNavigationObjectContainingElement, _isInTopRow],
    );

  const _getTopElement: UseNavigationInternalTypes["_getTopElement"] =
    useCallback(
      (focusedEl) => {
        if (_isInTopRow(focusedEl)) {
          return focusedEl;
        } else {
          return getRecursiveTopElementByElement(
            focusedEl,
            _getNavigationObjectContainingElement,
            _isInTopRow,
          );
        }
      },
      [_getNavigationObjectContainingElement, _isInTopRow],
    );

  const _isLastElementInComponent: UseNavigationInternalTypes["_isLastElementInComponent"] =
    useCallback(
      (focusedEl) => {
        let topParentEl = topLevelParent;
        /* istanbul ignore else */
        if (!topParentEl) {
          topParentEl = _getTopElement(focusedEl);
        }
        let lastEl = _lastComponentEl;
        /* istanbul ignore else */
        if (lastEl === null) {
          lastEl = _getLastFocusableElementTypeByParent(topParentEl);
          _setLastComponentEl(lastEl);
        }

        return focusedEl === lastEl;
      },
      [
        _getLastFocusableElementTypeByParent,
        _getTopElement,
        topLevelParent,
        _lastComponentEl,
      ],
    );

  const _isLastElementInList: UseNavigationInternalTypes["_isLastElementInList"] =
    useCallback(
      (focusedEl: FocusableElementType) => {
        const navObj = _getNavigationObjectContainingElement(focusedEl);
        const currentList = _returnStoredList(navObj.storedList);
        return currentList.indexOf(focusedEl) === currentList.length - 1;
      },
      [_getNavigationObjectContainingElement],
    );

  // -------------------------------------------------------
  // Controllers and public functions
  // -------------------------------------------------------

  const closeComponentWithFocus: UseNavigationReturnTypes["closeComponentWithFocus"] =
    useCallback(
      (focusedEl) => {
        _closeComponent();
        const { storedParentEl } = getTopParentElement();
        return storedParentEl === null
          ? _getTopElement(focusedEl)
          : storedParentEl;
      },
      [_closeComponent, _getTopElement, getTopParentElement],
    );
  const closeOpenSiblings: UseNavigationReturnTypes["closeOpenSiblings"] =
    useCallback(
      (focusedEl) => {
        const childList: FocusableElementType[] = _returnStoredList(
          getNavigationArray()[0].storedList,
        );

        for (const childEl of childList) {
          if (childEl !== focusedEl && childEl.type === "button") {
            const { isSubListOpen, dispatchChildClose } =
              _getNavigationObjectByParent(childEl as HTMLButtonElement);
            if (isSubListOpen && dispatchChildClose) {
              dispatchChildClose(childEl as HTMLButtonElement);
            }
          }
        }
      },
      [getNavigationArray, _getNavigationObjectByParent],
    );

  const getLastChildInTopRow: UseNavigationReturnTypes["getLastChildInTopRow"] =
    (focusedEl) => {
      const lastTopEl = _getLastChildInRow(0);
      const lastEl = _getLastFocusableElementTypeByParent(lastTopEl);
      if (!isComponentActive && focusedEl === lastEl) {
        return lastTopEl;
      } else {
        return focusedEl;
      }
    };

  const getNextByButton: UseNavigationReturnTypes["getNextByButton"] = (
    buttonEl,
    isSubListOpen,
  ) => {
    const buttonNavObject = _getNavigationObjectContainingElement(buttonEl);
    const currentItemsList = _returnStoredList(buttonNavObject.storedList);

    let nextFocusableEl: FocusableElementType = _getNextElementInList(
      buttonEl,
      currentItemsList,
    );
    // default to next item in List
    const currentNavObject = _getNavigationObjectByParent(
      buttonEl as HTMLButtonElement,
    );
    const { storedList } = currentNavObject;
    const subNavigation = _returnStoredList(storedList);

    // controlled list open, move into the first child.
    if (isSubListOpen && subNavigation.length > 0) {
      nextFocusableEl = subNavigation[0];
    }

    //last focusable element and sub list is collapsed. Set to topmost parent.
    if (
      !isSubListOpen &&
      currentItemsList.indexOf(buttonEl) === currentItemsList.length - 1
    ) {
      nextFocusableEl = _getParentByElement(buttonEl) as FocusableElementType;
    }

    return nextFocusableEl;
  };

  const getNextByButtonTab: UseNavigationReturnTypes["getNextByButtonTab"] = (
    buttonEl,
    isSubListOpen,
  ) => {
    let nextFocusableEl = getNextByButton(buttonEl, isSubListOpen);

    const buttonNavObject = _getNavigationObjectContainingElement(buttonEl);
    const currentItemsList = _returnStoredList(buttonNavObject.storedList);
    // When button is the last item in a list and it is not expanded, go to last child's
    // next DOM.
    if (
      !isSubListOpen &&
      currentItemsList.indexOf(buttonEl) === currentItemsList.length - 1
    ) {
      const lastEl = _getLastFocusableElementTypeByParent(buttonEl);
      const lastTopChild = _getLastChildInRow(0);
      nextFocusableEl = getFocusableElement(
        lastEl,
        "next",
      ) as FocusableElementType;
      if (buttonEl === lastTopChild) {
        _closeComponent();
      }
    }

    return nextFocusableEl;
  };

  const getNextByLink: UseNavigationReturnTypes["getNextByLink"] = (linkEl) => {
    const linkNavObject = _getNavigationObjectContainingElement(linkEl);
    const currentItemsList = _returnStoredList(linkNavObject.storedList);

    // default to next item in List
    let nextFocusableEl: FocusableElementType = _getNextElementInList(
      linkEl,
      currentItemsList,
    );

    if (currentItemsList.indexOf(linkEl) === currentItemsList.length - 1) {
      const { storedParentEl } = linkNavObject;
      const isInTopRow = storedParentEl && _isInTopRow(storedParentEl);
      if (isInTopRow) {
        nextFocusableEl = storedParentEl;
      } else {
        // get Top Element
        const topParent = _getTopElement(linkEl);
        const isParentLast = _isLastElementInList(
          storedParentEl as FocusableElementType,
        );
        const isLinkLast = _isLastElementInList(linkEl);

        if (isParentLast && isLinkLast) {
          nextFocusableEl = topParent;
        } else {
          const parentNavObject = _getNavigationObjectContainingElement(
            storedParentEl as FocusableElementType,
          );
          const parentList = _returnStoredList(parentNavObject.storedList);
          nextFocusableEl = _getNextElementInList(
            storedParentEl as FocusableElementType,
            parentList,
          );
        }
      }
    }
    return nextFocusableEl;
  };

  const getNextByLinkTab: UseNavigationReturnTypes["getNextByLinkTab"] = (
    linkEl,
  ) => {
    let nextFocusableEl = getNextByLink(linkEl);
    const isInTopRow = _isInTopRow(linkEl);
    const navObject = _getNavigationObjectContainingElement(linkEl);
    const storedList = _returnStoredList(navObject.storedList);

    if (
      (!isInTopRow && _isLastElementInComponent(linkEl)) ||
      (isInTopRow && storedList.indexOf(linkEl) === storedList.length - 1)
    ) {
      nextFocusableEl = getFocusableElement(
        linkEl,
        "next",
      ) as FocusableElementType;
      _closeComponent();
    }
    return nextFocusableEl;
  };

  const getPreviousByButton: UseNavigationReturnTypes["getPreviousByButton"] = (
    buttonEl,
  ) => {
    return _getPreviousByElement(buttonEl);
  };

  const getPreviousByButtonTab: UseNavigationReturnTypes["getPreviousByButton"] =
    (buttonEl) => {
      let prevFocusableEl = getPreviousByButton(buttonEl);
      if (_isInTopRow(buttonEl)) {
        const navObject = _getNavigationObjectContainingElement(buttonEl);
        const storedList = _returnStoredList(navObject.storedList);
        if (isComponentActive && storedList.indexOf(buttonEl) === 0) {
          prevFocusableEl = getFocusableElement(
            buttonEl,
            "prev",
          ) as FocusableElementType;
          _closeComponent();
        } else {
          prevFocusableEl = _getPreviousElementInList(buttonEl, storedList);
        }
      }

      return prevFocusableEl;
    };

  const getPreviousByLink: UseNavigationReturnTypes["getPreviousByLink"] = (
    linkEl: FocusableElementType,
  ) => {
    let prevFocusableEl = _getPreviousByElement(linkEl);
    const navObj = _getNavigationObjectByParent(
      prevFocusableEl as ParentElementType,
    );
    const currentList = _returnStoredList(navObj.storedList);

    const hasButtonType = () => {
      let isButtonType = false;
      if (prevFocusableEl && !!prevFocusableEl.type) {
        isButtonType = prevFocusableEl.type === "button";
      }
      return isButtonType;
    };

    if (hasButtonType()) {
      if (currentList.indexOf(linkEl) < 0) {
        const storedList = _returnStoredList(navObj.storedList);
        const isSubListOpen = navObj.isSubListOpen;
        /* istanbul ignore else */
        if (isSubListOpen) {
          prevFocusableEl = storedList[storedList.length - 1];
        }
      }
    }
    return prevFocusableEl;
  };

  const getPreviousByLinkTab: UseNavigationReturnTypes["getPreviousByLinkTab"] =
    (linkEl) => {
      let prevFocusableEl = getPreviousByLink(linkEl);

      if (_isInTopRow(linkEl)) {
        const navObject = _getNavigationObjectContainingElement(linkEl);
        const storedList = _returnStoredList(navObject.storedList);

        if (storedList.indexOf(linkEl) === 0) {
          prevFocusableEl = getFocusableElement(
            linkEl,
            "prev",
          ) as FocusableElementType;
          setIsComponentActive(false);
          _closeComponent();
        } else {
          prevFocusableEl = _getPreviousElementInList(linkEl, storedList);
        }
      }
      return prevFocusableEl;
    };

  const getChildrenInTree: UseNavigationReturnTypes["getChildrenInTree"] = (
    parentEl: HTMLButtonElement,
  ) => {
    const subNavListItems: NavigationObjectProps[] = [];
    const currentNavObject = _getNavigationObjectByParent(parentEl);
    const currentList = currentNavObject.storedList;
    /* istanbul ignore else */
    if (currentList) {
      for (const currentItem of currentList) {
        if (currentItem.type === "button") {
          const currentObject = _getNavigationObjectByParent(
            currentItem as ParentElementType,
          );
          /* istanbul ignore else */
          if (currentObject) {
            subNavListItems.push(currentObject as NavigationObjectProps);
          }
        }
      }
    }
    return subNavListItems;
  };

  const handleClickAwayClose: UseNavigationReturnTypes["handleClickAwayClose"] =
    () => {
      _closeComponent();
    };

  const handleNavigationItemFocus: UseNavigationReturnTypes["handleNavigationItemFocus"] =
    (focusedEl, closeOpenSiblings) => {
      if (isComponentActive && _getIndexInTopRow(focusedEl) !== -1) {
        closeOpenSiblings(focusedEl);
      }
      if (!isComponentActive) {
        setIsComponentActive(true);
      }
    };

  const registerInParentList: UseNavigationReturnTypes["registerInParentList"] =
    (buttonEl, parentEl) => {
      const parentObj = _getNavigationObjectByParent(parentEl);

      const { storedList } = parentObj;
      let navigationList: FocusableElementType[] = [];
      if (storedList && storedList.length > 0) {
        navigationList = storedList.slice();
      }

      if (navigationList.indexOf(buttonEl) === -1) {
        navigationList.push(buttonEl);
        setListItems(navigationList, parentEl);
      }
    };
  const registerTopSubNavigation = (isListOpen, parentEl) => {
    /* istanbul ignore else */
    if (parentEl !== null) {
      updateTopParent(parentEl);
    }
  };

  return {
    closeComponentWithFocus,
    closeOpenSiblings,
    getTopParentElement,
    getLastChildInTopRow,
    getNextByButton,
    getNextByButtonTab,
    getNextByLink,
    getNextByLinkTab,
    getPreviousByButton,
    getPreviousByButtonTab,
    getPreviousByLink,
    getPreviousByLinkTab,
    getChildrenInTree,
    handleClickAwayClose,
    handleNavigationItemFocus,
    isComponentActive,
    registerInParentList,
    registerLink,
    registerButtonInList,
    registerTopSubNavigation,
    resetTopNavigation,
    setIsComponentActive,
    setIsListOpen,
    setListItems,
  };
}
