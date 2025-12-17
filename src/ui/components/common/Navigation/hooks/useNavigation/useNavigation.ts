"use client";
import { use, useCallback } from "react";
import {
  getFocusableElement,
  returnTrueElementOrUndefined,
} from "@/ui/utilities";
import { NavigationContext } from "../../providers";
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
    _getNavigationArray,
    _registerNavLink,
    _registerSubNav,
    _resetTopNavArray,
    _setIsListOpen,
    _setListItems,
  } = returnTrueElementOrUndefined(
    !!navigationContextObj,
    navigationContextObj,
  );

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
            _getIndexInTopRow,
          );
        }
      },
      [_getIndexInTopRow, _getNavigationObjectContainingElement, _isInTopRow],
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

  const _isLastElementInTree: UseNavigationInternalTypes["_isLastElementInTree"] =
    useCallback(
      (focusableEl) => {
        const topParent = _getTopElement(focusableEl);
        const lastEl = _getLastFocusableElementTypeByParent(topParent);
        return focusableEl === lastEl;
      },
      [_getLastFocusableElementTypeByParent, _getTopElement],
    );
  // -------------------------------------------------------
  // Controllers and public functions
  // -------------------------------------------------------
  const getLastComponentElement = useCallback(
    (focusableEl) => {
      const lastTopRowElement = _getLastChildInRow(0);
      const lastComponentElement =
        _getLastFocusableElementTypeByParent(lastTopRowElement);
      if (focusableEl === lastComponentElement) {
        return lastTopRowElement;
      }
    },
    [_getLastChildInRow, _getLastFocusableElementTypeByParent],
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

  const getNextByButtonTab = useCallback(
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
        nextFocusableEl = getFocusableElement(
          lastEl,
          "next",
        ) as FocusableElementType;
      }

      return nextFocusableEl;
    },
    [
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

          if (_isLastElementInTree(linkEl)) {
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
      _isLastElementInTree,
    ],
  );

  const getNextByLinkTab = useCallback(
    (linkEl) => {
      let nextFocusableEl = getNextByLink(linkEl);
      const isInTopRow = _isInTopRow(linkEl);
      if (!isInTopRow && _isLastElementInTree(linkEl)) {
        nextFocusableEl = getFocusableElement(
          linkEl,
          "next",
        ) as FocusableElementType;
      }

      if (isInTopRow) {
        const navObject = _getNavigationObjectContainingElement(linkEl);
        /* istanbul ignore next */
        const storedList = navObject.storedList || [];
        if (storedList.indexOf(linkEl) === storedList.length - 1) {
          nextFocusableEl = getFocusableElement(
            linkEl,
            "next",
          ) as FocusableElementType;
        }
      }

      return nextFocusableEl;
    },
    [
      _getNavigationObjectContainingElement,
      _isInTopRow,
      _isLastElementInTree,
      getNextByLink,
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
          if (storedList.indexOf(buttonEl) === 0) {
            prevFocusableEl = getFocusableElement(
              buttonEl,
              "prev",
            ) as FocusableElementType;
          } else {
            prevFocusableEl = _getPreviousElementInRow(buttonEl, storedList);
          }
        }

        return prevFocusableEl;
      },
      [
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

        const hasButtonType = () => {
          let isButtonType = false;
          if (prevFocusableEl && !!prevFocusableEl.type) {
            isButtonType = prevFocusableEl.type === "button";
          }
          return isButtonType;
        };

        if (hasButtonType()) {
          const navObj = _getNavigationObjectByParent(
            prevFocusableEl as ParentElementType,
          );
          /* istanbul ignore next */
          const currentList = navObj.storedList || [];
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
          } else {
            prevFocusableEl = _getPreviousElementInRow(linkEl, storedList);
          }
        }
        return prevFocusableEl;
      },
      [
        _getNavigationObjectContainingElement,
        _getPreviousElementInRow,
        _isInTopRow,
        getPreviousByLink,
      ],
    );

  const getTopNavigationParent: UseNavigationTypes["getTopNavigationParent"] =
    useCallback(() => {
      return _getNavigationArray()[0];
    }, [_getNavigationArray]);

  return {
    getTopNavigationParent,
    getLastComponentElement,
    getNextByButton,
    getNextByButtonTab,
    getNextByLink,
    getNextByLinkTab,
    getPreviousByButton,
    getPreviousByButtonTab,
    getPreviousByLink,
    getPreviousByLinkTab,
    registerNavigationItem: _registerNavLink,
    registerSubNavigation: _registerSubNav,
    _resetTopNavArray: _resetTopNavArray,
    setIsListOpen: _setIsListOpen,
    setListItems: _setListItems,
  };
}
