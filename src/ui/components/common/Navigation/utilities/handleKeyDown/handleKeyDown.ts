import React from "react";
import { Keys } from "@/ui/utilities";
import { FocusableElementType } from "../../components/NavigationTypes";
import { UseNavigationListReturnProps } from "@/ui/components/common/Navigation/hooks/useNavigationList/useNavigationListTypes";
import { UseNavigationReturnTypes } from "@/ui/components/common/Navigation/hooks/useNavigation/useNavigationTypes";

export const _handleKeyDown = (
  e: React.KeyboardEvent,
  focusableEl: FocusableElementType,
  closeComponentWithFocus: UseNavigationReturnTypes["closeComponentWithFocus"],
  isLayoutVertical: UseNavigationReturnTypes["isLayoutVertical"],
  setFirstFocus: UseNavigationListReturnProps["setFirstFocus"],
  setLastFocus: UseNavigationListReturnProps["setLastFocus"],
  setNextFocus: UseNavigationListReturnProps["setNextFocus"],
  setPreviousFocus: UseNavigationListReturnProps["setPreviousFocus"],
  setSpecificFocus: UseNavigationListReturnProps["setSpecificFocus"],
) => {
  switch (e.key) {
    case Keys.ESC:
      const closedFocus = closeComponentWithFocus(focusableEl);
      setSpecificFocus(closedFocus as FocusableElementType, isLayoutVertical());
      break;
    case Keys.HOME:
      setFirstFocus(isLayoutVertical());
      break;
    case Keys.END:
      setLastFocus(isLayoutVertical());
      break;
    case Keys.LEFT:
      setPreviousFocus(focusableEl, isLayoutVertical());
      break;
    case Keys.RIGHT:
      setNextFocus(focusableEl, isLayoutVertical());
      break;
  }
};
