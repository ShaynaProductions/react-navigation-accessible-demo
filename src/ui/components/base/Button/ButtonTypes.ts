import React from "react";
import {ButtonProps as RACButtonProps, PressEvent as RACPressEvent} from "react-aria-components";
import {BaseProps} from "@/ui/types";

export type PressEvent =  ((e: RACPressEvent) => void) | undefined;

export interface ButtonProps extends BaseProps, Omit<RACButtonProps, "style"> {
    isPressed?: boolean;
    ref?: React.RefObject<HTMLButtonElement | null>;
}
