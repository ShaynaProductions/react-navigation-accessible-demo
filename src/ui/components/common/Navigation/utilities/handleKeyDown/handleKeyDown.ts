import React from "react";
import { Keys } from "@/ui/utilities";
import { FocusableElementType } from "../../components/NavigationTypes";

export const _handleKeyDown = (
  e: React.KeyboardEvent,
  focusableEl: FocusableElementType,
  closeComponentWithFocus,
  setFirstFocus: VoidFunction,
  setLastFocus: VoidFunction,
  setNextFocus: (focusableEl: FocusableElementType) => void,
  setPreviousFocus: (focusableEl: FocusableElementType) => void,
  setSpecificFocus,
) => {
  switch (e.key) {
    case Keys.ESC:
      const closedFocus = closeComponentWithFocus(focusableEl);
      setSpecificFocus(closedFocus);
      break;
    case Keys.HOME:
      setFirstFocus();
      break;
    case Keys.END:
      setLastFocus();
      break;
    case Keys.LEFT:
      setPreviousFocus(focusableEl);
      break;
    case Keys.RIGHT:
      setNextFocus(focusableEl);
      break;
  }
};
