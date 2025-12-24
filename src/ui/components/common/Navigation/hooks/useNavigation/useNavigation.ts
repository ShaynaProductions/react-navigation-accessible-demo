"use client";
import { use, useCallback, useState } from "react";
import {
  getFocusableElement,
  returnTrueElementOrUndefined,
} from "@/ui/utilities";
import { NavigationContext, NavigationObjectProps } from "../../providers";
import { FocusableElementType, ParentElementType } from "../../NavigationTypes";
import {
  getRecursiveLastElementByParent,
  getRecursiveTopElementByElement,
} from "./hookFunctions";
import {
  UseNavigationInternalTypes,
  UseNavigationTypes,
} from "./useNavigationTypes";

export default function useNavigation() {
  const navigationContextObj = use(NavigationContext);
  const {
    _componentActive,
    _getNavigationArray,
    _registerNavLink,
    _registerSubNav,
    _resetTopNavArray,
    _setComponentActive,
    _setIsListOpen,
    _setListItems,
    _topLevelParent,
  } = returnTrueElementOrUndefined(
    !!navigationContextObj,
    navigationContextObj,
  );
  const [lastComponentEl, setLastComponentEl] =
    useState<FocusableElementType | null>(null);

  const _getIndexInTopRow: UseNavigationInternalTypes["_getIndexInTopRow"] =
    useCallback(
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
          const { storedParentEl } = navObject;
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

  const _getNavigationObjectContainingElement: UseNavigationInternalTypes["_getNavigationObjectContainingElement"] =
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

  const _getLastChildInRow: UseNavigationInternalTypes["_getLastChildInRow"] =
    useCallback(
      (index) => {
        /* istanbul ignore next */
        const currentList = _getNavigationArray()[index].storedList || [];
        return currentList[currentList.length - 1];
      },
      [_getNavigationArray],
    );

  const getTopNavigationParent: UseNavigationTypes["getTopNavigationParent"] =
    useCallback(() => {
      return _getNavigationArray()[0];
    }, [_getNavigationArray]);

  const _closeComponent: UseNavigationInternalTypes["_closeParentComponent"] =
    useCallback(() => {
      const { storedList } = getTopNavigationParent();
      _setComponentActive(false);
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
      _setComponentActive,
      getTopNavigationParent,
    ]);

  const _getLastFocusableElementTypeByParent: UseNavigationInternalTypes["_getLastFocusableElementTypeByParent"] =
    useCallback(
      (focusableEl) => {
        return getRecursiveLastElementByParent(
          focusableEl as ParentElementType,
          _getNavigationObjectByParent,
          _getNavigationObjectContainingElement,
        );
      },
      [_getNavigationObjectByParent, _getNavigationObjectContainingElement],
    );

  const _getNextElementInRow: UseNavigationInternalTypes["_getNextElementInRow"] =
    useCallback((focusableEl, currentList) => {
      const currentIndex = currentList.indexOf(focusableEl);
      const newIndex = currentIndex + 1;
      return currentList[newIndex];
    }, []);

  const _getPreviousElementInRow: UseNavigationInternalTypes["_getPreviousElementInRow"] =
    useCallback((focusableEl, currentList) => {
      const currentIndex = currentList.indexOf(focusableEl);
      const newIndex = currentIndex - 1;
      return currentList[newIndex];
    }, []);

  const _getParentByElement: UseNavigationInternalTypes["_getParentByElement"] =
    useCallback(
      (focusableEl) => {
        const { storedParentEl } =
          _getNavigationObjectContainingElement(focusableEl);
        return storedParentEl as ParentElementType;
      },
      [_getNavigationObjectContainingElement],
    );

  const _isInTopRow: UseNavigationInternalTypes["_isInTopRow"] = useCallback(
    (focusableEl) => {
      const topIndex = _getIndexInTopRow(focusableEl);
      return topIndex >= 0;
    },
    [_getIndexInTopRow],
  );

  const _getTopElement: UseNavigationInternalTypes["_getTopElement"] =
    useCallback(
      (focusableEl) => {
        if (_isInTopRow(focusableEl)) {
          return focusableEl;
        } else {
          return getRecursiveTopElementByElement(
            focusableEl,
            _getNavigationObjectContainingElement,
            _isInTopRow,
          );
        }
      },
      [_getNavigationObjectContainingElement, _isInTopRow],
    );

  const _getPreviousByElement: UseNavigationInternalTypes["_getPreviousElement"] =
    useCallback(
      (focusableEl) => {
        const currentObject =
          _getNavigationObjectContainingElement(focusableEl);
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
      },
      [
        _getNavigationObjectContainingElement,
        _getPreviousElementInRow,
        _isInTopRow,
      ],
    );

  const isLastElementInComponent: UseNavigationInternalTypes["isLastElementInComponent"] =
    useCallback(
      (focusableEl) => {
        let topParentEl = _topLevelParent;
        /* istanbul ignore else */
        if (!topParentEl) {
          topParentEl = _getTopElement(focusableEl);
        }
        let lastEl = lastComponentEl;
        /* istanbul ignore else */
        if (lastEl === null) {
          lastEl = _getLastFocusableElementTypeByParent(topParentEl);
          setLastComponentEl(lastEl);
        }

        return focusableEl === lastEl;
      },
      [
        _getLastFocusableElementTypeByParent,
        _getTopElement,
        _topLevelParent,
        lastComponentEl,
      ],
    );

  const _isLastElementInList = useCallback(
    (focusedEl) => {
      const navObj = _getNavigationObjectContainingElement(focusedEl);
      /* istanbul ignore next */
      const currentList = navObj.storedList || [];
      return currentList.indexOf(focusedEl) === currentList.length - 1;
    },
    [_getNavigationObjectContainingElement],
  );

  const _isFirstOrLastItem: UseNavigationInternalTypes["_isFirstOrLastItem"] =
    useCallback(
      (focusableEl) => {
        const lastTopRowChild = _getLastChildInRow(0);
        const currentIndexInTopRow = _getIndexInTopRow(focusableEl);
        let isFirstOrLastItem = false;

        if (isLastElementInComponent(focusableEl)) {
          isFirstOrLastItem = true;
        }
        if (currentIndexInTopRow === 0 || focusableEl === lastTopRowChild) {
          isFirstOrLastItem = true;
        }
        return isFirstOrLastItem;
      },
      [_getIndexInTopRow, _getLastChildInRow, isLastElementInComponent],
    );

  // -------------------------------------------------------
  // Controllers and public functions
  // -------------------------------------------------------

  const closeComponentWithFocus: UseNavigationTypes["closeComponentWithFocus"] =
    useCallback(
      (focusedEl) => {
        _closeComponent();
        const { storedParentEl } = getTopNavigationParent();
        return storedParentEl === null
          ? _getTopElement(focusedEl)
          : storedParentEl;
      },
      [_closeComponent, _getTopElement, getTopNavigationParent],
    );
  const closeOpenSiblings: UseNavigationTypes["closeOpenSiblings"] =
    useCallback(
      (currentlyFocusedEl) => {
        /* istanbul ignore next */
        const childList: FocusableElementType[] =
          _getNavigationArray()[0].storedList || [];

        for (const childEl of childList) {
          if (childEl !== currentlyFocusedEl && childEl.type === "button") {
            const { isSubListOpen, dispatchChildClose } =
              _getNavigationObjectByParent(childEl as HTMLButtonElement);
            if (isSubListOpen && dispatchChildClose) {
              dispatchChildClose(childEl as HTMLButtonElement);
            }
          }
        }
      },
      [_getNavigationArray, _getNavigationObjectByParent],
    );

  const getLastChildInTopRow: UseNavigationTypes["getLastChildInTopRow"] =
    useCallback(
      (focusableEl) => {
        const lastTopEl = _getLastChildInRow(0);
        const lastEl = _getLastFocusableElementTypeByParent(lastTopEl);
        if (!_componentActive && focusableEl === lastEl) {
          return lastTopEl;
        } else {
          return focusableEl;
        }
      },
      [
        _componentActive,
        _getLastChildInRow,
        _getLastFocusableElementTypeByParent,
      ],
    );

  const getNextByButton: UseNavigationTypes["getNextByButton"] = useCallback(
    (buttonEl, isSubListOpen) => {
      const buttonNavObject = _getNavigationObjectContainingElement(buttonEl);
      /* istanbul ignore next */
      const currentItemsList = buttonNavObject.storedList || [];

      let nextFocusableEl: FocusableElementType = _getNextElementInRow(
        buttonEl,
        currentItemsList,
      );
      // default to next item in List
      const currentNavObject = _getNavigationObjectByParent(
        buttonEl as HTMLButtonElement,
      );
      const { storedList } = currentNavObject;
      /* istanbul ignore next */
      const subNavigation = storedList || [];

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
    },
    [
      _getNavigationObjectByParent,
      _getNavigationObjectContainingElement,
      _getNextElementInRow,
      _getParentByElement,
    ],
  );

  const getNextByButtonTab: UseNavigationTypes["getNextByButtonTab"] =
    useCallback(
      (buttonEl, isSubListOpen) => {
        let nextFocusableEl = getNextByButton(buttonEl, isSubListOpen);

        const buttonNavObject = _getNavigationObjectContainingElement(buttonEl);
        /* istanbul ignore next */
        const currentItemsList = buttonNavObject.storedList || [];
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
      },
      [
        _closeComponent,
        _getLastChildInRow,
        _getLastFocusableElementTypeByParent,
        _getNavigationObjectContainingElement,
        getNextByButton,
      ],
    );

  const getNextByLink: UseNavigationTypes["getNextByLink"] = useCallback(
    (linkEl) => {
      const linkNavObject = _getNavigationObjectContainingElement(linkEl);
      /* istanbul ignore next */
      const currentItemsList = linkNavObject.storedList || [];

      // default to next item in List
      let nextFocusableEl: FocusableElementType = _getNextElementInRow(
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
          const isParentLast = _isLastElementInList(storedParentEl);
          const isLinkLast = _isLastElementInList(linkEl);

          if (isParentLast && isLinkLast) {
            nextFocusableEl = topParent;
          } else {
            const parentNavObject = _getNavigationObjectContainingElement(
              storedParentEl as FocusableElementType,
            );
            /* istanbul ignore next */
            const parentList = parentNavObject.storedList || [];
            nextFocusableEl = _getNextElementInRow(
              storedParentEl as FocusableElementType,
              parentList,
            );
          }
        }
      }
      return nextFocusableEl;
    },
    [
      _getNavigationObjectContainingElement,
      _getNextElementInRow,
      _getTopElement,
      _isInTopRow,
      _isLastElementInList,
    ],
  );

  const getNextByLinkTab: UseNavigationTypes["getNextByLinkTab"] = useCallback(
    (linkEl) => {
      let nextFocusableEl = getNextByLink(linkEl);
      const isInTopRow = _isInTopRow(linkEl);
      const navObject = _getNavigationObjectContainingElement(linkEl);
      /* istanbul ignore next */
      const storedList = navObject.storedList || [];

      if (
        (!isInTopRow && isLastElementInComponent(linkEl)) ||
        (isInTopRow && storedList.indexOf(linkEl) === storedList.length - 1)
      ) {
        nextFocusableEl = getFocusableElement(
          linkEl,
          "next",
        ) as FocusableElementType;
        _closeComponent();
      }
      return nextFocusableEl;
    },
    [
      getNextByLink,
      _isInTopRow,
      _getNavigationObjectContainingElement,
      isLastElementInComponent,
      _closeComponent,
    ],
  );

  const getPreviousByButton: UseNavigationTypes["getPreviousByButton"] =
    useCallback(
      (buttonEl) => {
        return _getPreviousByElement(buttonEl);
      },
      [_getPreviousByElement],
    );

  const getPreviousByButtonTab: UseNavigationTypes["getPreviousByButton"] =
    useCallback(
      (buttonEl) => {
        let prevFocusableEl = getPreviousByButton(buttonEl);
        if (_isInTopRow(buttonEl)) {
          const navObject = _getNavigationObjectContainingElement(buttonEl);
          /* istanbul ignore next */
          const storedList = navObject.storedList || [];
          if (_componentActive && storedList.indexOf(buttonEl) === 0) {
            prevFocusableEl = getFocusableElement(
              buttonEl,
              "prev",
            ) as FocusableElementType;
            _closeComponent();
          } else {
            prevFocusableEl = _getPreviousElementInRow(buttonEl, storedList);
          }
        }

        return prevFocusableEl;
      },
      [
        _closeComponent,
        _componentActive,
        _getNavigationObjectContainingElement,
        _getPreviousElementInRow,
        _isInTopRow,
        getPreviousByButton,
      ],
    );

  const getPreviousByLink: UseNavigationTypes["getPreviousByLink"] =
    useCallback(
      (linkEl: FocusableElementType) => {
        let prevFocusableEl = _getPreviousByElement(linkEl);
        const navObj = _getNavigationObjectByParent(
          prevFocusableEl as ParentElementType,
        );
        /* istanbul ignore next */
        const currentList = navObj.storedList || [];

        const hasButtonType = () => {
          let isButtonType = false;
          if (prevFocusableEl && !!prevFocusableEl.type) {
            isButtonType = prevFocusableEl.type === "button";
          }
          return isButtonType;
        };

        if (hasButtonType()) {
          if (currentList.indexOf(linkEl) < 0) {
            /* istanbul ignore next */
            const storedList = navObj.storedList || [];
            const isSubListOpen = navObj.isSubListOpen;
            /* istanbul ignore else */
            if (isSubListOpen) {
              prevFocusableEl = storedList[storedList.length - 1];
            }
          }
        }
        return prevFocusableEl;
      },
      [_getNavigationObjectByParent, _getPreviousByElement],
    );

  const getPreviousByLinkTab: UseNavigationTypes["getPreviousByLinkTab"] =
    useCallback(
      (linkEl) => {
        let prevFocusableEl = getPreviousByLink(linkEl);

        if (_isInTopRow(linkEl)) {
          const navObject = _getNavigationObjectContainingElement(linkEl);
          /* istanbul ignore next */
          const storedList = navObject.storedList || [];

          if (storedList.indexOf(linkEl) === 0) {
            prevFocusableEl = getFocusableElement(
              linkEl,
              "prev",
            ) as FocusableElementType;
            _setComponentActive(false);
            _closeComponent();
          } else {
            prevFocusableEl = _getPreviousElementInRow(linkEl, storedList);
          }
        }
        return prevFocusableEl;
      },
      [
        _closeComponent,
        _getNavigationObjectContainingElement,
        _getPreviousElementInRow,
        _isInTopRow,
        _setComponentActive,
        getPreviousByLink,
      ],
    );

  const getSubNavigation = useCallback(
    (parentEl: HTMLButtonElement) => {
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
    },
    [_getNavigationObjectByParent],
  );

  const handleNavigationItemFocus: UseNavigationTypes["handleNavigationItemFocus"] =
    useCallback(
      (focusableEl, closeOpenSiblings) => {
        if (_getIndexInTopRow(focusableEl) !== -1) {
          closeOpenSiblings(focusableEl);
        }
        if (!_componentActive && _isFirstOrLastItem(focusableEl)) {
          _setComponentActive(true);
        }
      },
      [
        _componentActive,
        _getIndexInTopRow,
        _isFirstOrLastItem,
        _setComponentActive,
      ],
    );

  return {
    closeComponentWithFocus,
    closeOpenSiblings,
    getTopNavigationParent,
    getLastChildInTopRow,
    getNextByButton,
    getNextByButtonTab,
    getNextByLink,
    getNextByLinkTab,
    getPreviousByButton,
    getPreviousByButtonTab,
    getPreviousByLink,
    getPreviousByLinkTab,
    getSubNavigation,
    handleNavigationItemFocus,
    registerNavigationItem: _registerNavLink,
    registerSubNavigation: _registerSubNav,
    resetTopNavigationArray: _resetTopNavArray,
    setIsListOpen: _setIsListOpen,
    setListItems: _setListItems,
  };
}
