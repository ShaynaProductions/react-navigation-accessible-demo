import React from "react";
import {Keys} from "@/ui/utilities";
import {FocusableElementType} from "../../NavigationTypes";

export const _handleKeyDown = (
    e: React.KeyboardEvent,
    focusableEl: FocusableElementType,
    setFirstFocus: VoidFunction,
    setLastFocus: VoidFunction,
    setNextFocus: (focusableEl: FocusableElementType) => void,
    setPreviousFocus: (focusableEl: FocusableElementType) => void,) => {
    switch (e.key) {
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
}