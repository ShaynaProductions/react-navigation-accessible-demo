"use client";
import { use, useCallback, useState } from "react";
import {
  getFocusableElement,
  returnTrueElementOrUndefined,
} from "@/ui/utilities";
import {
  _getNextElementInList,
  _getPreviousElementInList,
  returnStoredList,
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
    shouldPassthrough,
    getControllingElement,
    registerLinkInList,
    registerButtonInList,
    setIsComponentActive,
    setIsListOpen,
    setListItems,
    setShouldPassthrough,
    updateControllingElement,
  } = returnTrueElementOrUndefined(
    !!navigationContextObj,
    navigationContextObj,
  );
  const [_lastComponentEl, _setLastComponentEl] =
    useState<FocusableElementType | null>(null);

  const getTopParentElement: UseNavigationReturnTypes["getTopParentElement"] =
    useCallback(() => {
      return getNavigationArray()[0];
    }, [getNavigationArray]);

  const isComponentControlled = useCallback(() => {
    return getControllingElement() !== null;
  }, [getControllingElement]);

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
        return returnStoredList(getNavigationArray()[index].storedList)[0];
      },
      [getNavigationArray],
    );

  const _getLastChildInRow: UseNavigationInternalTypes["_getLastChildInRow"] =
    useCallback(
      (index) => {
        const currentList = returnStoredList(
          getNavigationArray()[index].storedList,
        );
        return currentList[currentList.length - 1];
      },
      [getNavigationArray],
    );

  const _getShouldPassthrough: UseNavigationInternalTypes["_getShouldPassthrough"] =
    useCallback(() => {
      return shouldPassthrough;
    }, [shouldPassthrough]);

  const _getNavigationObjectContainingElement: UseNavigationInternalTypes["_getNavigationObjectContainingElement"] =
    useCallback(
      (focusedEl) => {
        let returnObj = {};
        for (const navObject of getNavigationArray()) {
          const storedList = returnStoredList(navObject.storedList);
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

  const _isInTopRow: UseNavigationInternalTypes["_isInTopRow"] = useCallback(
    (focusedEl) => {
      const topIndex = _getIndexInTopRow(focusedEl);
      return topIndex >= 0;
    },
    [_getIndexInTopRow],
  );
  const _isFirstChildInComponent: UseNavigationInternalTypes["_isFirstChildInComponent"] =
    useCallback(
      (focusedEl) => {
        const firstComponentChild = _getFirstChildInRow(0);
        return firstComponentChild === focusedEl;
      },
      [_getFirstChildInRow],
    );

  const _getNavigationObjectByParent: UseNavigationInternalTypes["_getNavigationObjectByParent"] =
    useCallback(
      (parentEl) => {
        let returnObj = {};
        const navArray = getNavigationArray();
        for (const navObject of navArray) {
          const { storedParentEl } = navObject;
          /* istanbul ignore else */
          if (parentEl === storedParentEl) {
            returnObj = navObject;
            break;
          }
        }
        return returnObj;
      },
      [getNavigationArray],
    );

  const _closeOpenSiblings: UseNavigationInternalTypes["_closeOpenSiblings"] =
    useCallback(
      (focusedEl) => {
        if (!isComponentControlled()) {
          const siblingList: FocusableElementType[] = returnStoredList(
            getNavigationArray()[0].storedList,
          );

          for (const siblingEl of siblingList) {
            if (siblingEl !== focusedEl && siblingEl.type === "button") {
              const { isSubListOpen, dispatchChildClose } =
                _getNavigationObjectByParent(siblingEl as ParentElementType);
              if (isSubListOpen && dispatchChildClose) {
                dispatchChildClose(siblingEl as HTMLButtonElement);
              }
            }
          }
        }
      },
      [isComponentControlled, getNavigationArray, _getNavigationObjectByParent],
    );

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

  const _getLastFocusableElementByParent: UseNavigationInternalTypes["_getLastFocusableElementByParent"] =
    useCallback(
      (parentEl) => {
        return getRecursiveLastElementByParent(
          parentEl,
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

  const _getLastChildInTopRow: UseNavigationInternalTypes["_getLastChildInTopRow"] =
    useCallback(
      (focusedEl) => {
        const lastTopEl = _getLastChildInRow(0);
        const lastEl = _getLastFocusableElementByParent(lastTopEl);
        if (!isComponentActive && focusedEl === lastEl) {
          return lastTopEl;
        } else {
          return focusedEl;
        }
      },
      [_getLastChildInRow, _getLastFocusableElementByParent, isComponentActive],
    );

  const _handleLastChildFocus: UseNavigationInternalTypes["_handleLastChildFocus"] =
    useCallback(
      (focusedEl) => {
        const { isSubListOpen } =
          _getNavigationObjectContainingElement(focusedEl);
        if (!isSubListOpen) {
          if (isComponentControlled() && _getShouldPassthrough()) {
            return getControllingElement();
          } else {
            return _getLastChildInTopRow(focusedEl);
          }
        }
      },
      [
        _getLastChildInTopRow,
        _getNavigationObjectContainingElement,
        _getShouldPassthrough,
        getControllingElement,
        isComponentControlled,
      ],
    );

  const _getPreviousByElement: UseNavigationInternalTypes["_getPreviousByElement"] =
    useCallback(
      (focusedEl) => {
        const currentObject = _getNavigationObjectContainingElement(focusedEl);
        const currentItemsList = returnStoredList(currentObject.storedList);
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

  const _getLastElementInComponent: UseNavigationInternalTypes["_getLastElementInComponent"] =
    useCallback(() => {
      let lastEl = _lastComponentEl;
      /* istanbul ignore else */
      if (lastEl === null) {
        const lastParent = _getLastChildInRow(0);
        lastEl = _getLastFocusableElementByParent(lastParent);
        _setLastComponentEl(lastEl);
      }
      return lastEl;
    }, [
      _getLastChildInRow,
      _getLastFocusableElementByParent,
      _lastComponentEl,
    ]);

  const _isLastChildInComponent: UseNavigationInternalTypes["_isLastChildInComponent"] =
    useCallback(
      (focusedEl) => {
        const lastComponentChild = _getLastElementInComponent();
        return lastComponentChild === focusedEl;
      },
      [_getLastElementInComponent],
    );

  const _getChildrenInList: UseNavigationInternalTypes["_getChildrenInList"] = (
    parentEl: HTMLButtonElement,
  ) => {
    const subNavListItems: NavigationObjectProps[] = [];
    const currentNavObject = _getNavigationObjectByParent(parentEl);
    const currentList = returnStoredList(currentNavObject.storedList);
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

  const _isLastElementInComponent: UseNavigationInternalTypes["_isLastElementInComponent"] =
    useCallback(
      (focusedEl) => {
        const lastEl = _getLastElementInComponent();
        return focusedEl === lastEl;
      },
      [_getLastElementInComponent],
    );

  const _isLastElementInList: UseNavigationInternalTypes["_isLastElementInList"] =
    useCallback(
      (focusedEl: FocusableElementType) => {
        const navObj = _getNavigationObjectContainingElement(focusedEl);
        const currentList = returnStoredList(navObj.storedList);
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
        const controllingEl = getControllingElement();
        if (!isComponentControlled()) {
          return _getTopElement(focusedEl);
        } else {
          return controllingEl;
        }
      },
      [
        _closeComponent,
        _getTopElement,
        getControllingElement,
        isComponentControlled,
      ],
    );

  const getNextByButton: UseNavigationReturnTypes["getNextByButton"] = (
    buttonEl,
    isSubListOpen,
  ) => {
    const buttonNavObject = _getNavigationObjectContainingElement(buttonEl);
    const currentItemsList = returnStoredList(buttonNavObject.storedList);

    let nextFocusableEl: FocusableElementType = _getNextElementInList(
      buttonEl,
      currentItemsList,
    );
    // default to next item in List
    const currentNavObject = _getNavigationObjectByParent(
      buttonEl as HTMLButtonElement,
    );
    const { storedList } = currentNavObject;
    const subNavigation = returnStoredList(storedList);

    // list open, move into the first child.
    if (isSubListOpen && subNavigation.length > 0) {
      nextFocusableEl = subNavigation[0];
    }

    // last focusable element and sub list is collapsed. Set to topmost parent.
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
    const currentItemsList = returnStoredList(buttonNavObject.storedList);

    // When button is the last item in a list and it is not expanded, go to last child's
    // next DOM.
    if (
      !isSubListOpen &&
      currentItemsList.indexOf(buttonEl) === currentItemsList.length - 1
    ) {
      const lastEl = _getLastFocusableElementByParent(buttonEl);
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
    const currentItemsList = returnStoredList(linkNavObject.storedList);

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
          const parentList = returnStoredList(parentNavObject.storedList);
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
    const currentList = returnStoredList(navObject.storedList);

    if (
      (!isInTopRow && _isLastElementInComponent(linkEl)) ||
      (!isInTopRow && _isLastElementInList(linkEl)) ||
      (isInTopRow && currentList.indexOf(linkEl) === currentList.length - 1)
    ) {
      nextFocusableEl = getFocusableElement(
        linkEl,
        "next",
      ) as FocusableElementType;
      if (
        (!isInTopRow && _isLastElementInComponent(linkEl)) ||
        (isInTopRow && currentList.indexOf(linkEl) === currentList.length - 1)
      ) {
        _closeComponent();
      }
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
        const storedList = returnStoredList(navObject.storedList);
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
    const currentList = returnStoredList(navObj.storedList);

    const hasButtonType = () => {
      let isButtonType = false;
      if (prevFocusableEl && !!prevFocusableEl.type) {
        isButtonType = prevFocusableEl.type === "button";
      }
      return isButtonType;
    };

    if (hasButtonType()) {
      if (currentList.indexOf(linkEl) < 0) {
        const storedList = returnStoredList(navObj.storedList);
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
        const storedList = returnStoredList(navObject.storedList);

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

  const handleClickAwayClose: UseNavigationReturnTypes["handleClickAwayClose"] =
    () => {
      _closeComponent();
    };

  const _handleNavigationItemFocus: UseNavigationInternalTypes["_handleNavigationItemFocus"] =
    (focusedEl, _closeOpenSiblings) => {
      const { isSubListOpen } =
        _getNavigationObjectContainingElement(focusedEl);
      if (isComponentActive && _getIndexInTopRow(focusedEl) !== -1) {
        _closeOpenSiblings(focusedEl);
      }

      if (isSubListOpen && !isComponentActive) {
        setIsComponentActive(true);
      }
    };

  const handlePassthroughNavigation: UseNavigationReturnTypes["handlePassthroughNavigation"] =
    (focusedEl) => {
      let returnEl;
      const firstElement = _getFirstChildInRow(0);
      const lastElement = _getLastElementInComponent();
      const { isSubListOpen } =
        _getNavigationObjectContainingElement(firstElement);

      if (isComponentControlled() && !isSubListOpen && shouldPassthrough) {
        /* istanbul ignore else */
        if (focusedEl === firstElement) {
          returnEl = getFocusableElement(lastElement, "next");
        }
        return returnEl;
      }
    };

  const handleButtonFocus: UseNavigationReturnTypes["handleButtonFocus"] = (
    buttonEl,
    isSubListOpen,
    prevIsSubListOpen,
  ) => {
    let returnEl;
    if (isComponentControlled() && !isSubListOpen && _getShouldPassthrough()) {
      returnEl = handlePassthroughNavigation(buttonEl);
    }
    /* istanbul ignore if */
    if (
      _isFirstChildInComponent(buttonEl) &&
      isSubListOpen &&
      isComponentControlled()
    ) {
      /* istanbul ignore next */
      if (isSubListOpen !== prevIsSubListOpen) {
        returnEl = buttonEl;
      }
    } else {
      _handleNavigationItemFocus(buttonEl, _closeOpenSiblings);
    }

    return returnEl;
  };

  const handleLinkFocus: UseNavigationReturnTypes["handleLinkFocus"] = (
    linkEl,
  ) => {
    let nextEl;
    if (!isComponentActive) {
      setIsComponentActive(true);
    }
    if (_isLastChildInComponent(linkEl)) {
      nextEl = _handleLastChildFocus(linkEl);
    } else {
      nextEl = _getLastChildInTopRow(linkEl);
      _handleNavigationItemFocus(linkEl, _closeOpenSiblings);
      return nextEl;
    }

    return nextEl;
  };

  const handleCloseSubNavigation = (buttonEl) => {
    const dispatchArray = _getChildrenInList(buttonEl);
    for (const dispatchObj of dispatchArray) {
      const { dispatchChildClose, storedParentEl, isSubListOpen } = dispatchObj;
      if (isSubListOpen && dispatchChildClose && storedParentEl) {
        dispatchChildClose(storedParentEl);
      }
    }
    setIsListOpen(false, buttonEl);
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
  const registerControllingElement: UseNavigationReturnTypes["registerControllingElement"] =
    (parentEl) => {
      /* istanbul ignore else */
      if (parentEl !== null) {
        updateControllingElement(parentEl);
      }
    };

  return {
    closeComponentWithFocus,
    _closeOpenSiblings,

    _getChildrenInList,
    getControllingElement,
    getNextByButton,
    getNextByButtonTab,
    getNextByLink,
    getNextByLinkTab,
    _getShouldPassthrough,
    getPreviousByButton,
    getPreviousByButtonTab,
    getPreviousByLink,
    getPreviousByLinkTab,
    getTopParentElement,
    handleClickAwayClose,
    handleCloseSubNavigation,
    handleButtonFocus,
    handleLinkFocus,
    handlePassthroughNavigation,
    isComponentActive,
    isComponentControlled,
    registerButtonInList,
    registerInParentList,
    registerLinkInList,
    registerControllingElement,
    returnStoredList,
    setIsComponentActive,
    setIsListOpen,
    setShouldPassthrough,
    setListItems,
  };
}
