import React from "react";
import {ButtonProps as RacButtonProps} from "react-aria-components";
import {BaseProps} from "@/source/types";

export interface ButtonProps extends BaseProps, Omit<RacButtonProps, "style"> {
    isPressed?: boolean;
    ref?: React.RefObject<HTMLButtonElement | null>;
}
