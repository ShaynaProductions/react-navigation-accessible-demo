import {HeadingProps as RacHeadingProps} from "react-aria-components";
import {BaseProps} from "@/source/types";
import React from "react";

export type HeadingVariant = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";

export interface HeadingProps extends BaseProps, RacHeadingProps {
    /**
     * Children of the heading
     */
    children?: React.ReactNode;

    /**
     *  1 - 6. Anything higher than 6 gets set to 6
     *  default: 2
     */
    headingLevel?: number;

    /**
     * default: false. When true, is accessible only by AT
     */
    isHidden?: boolean;

    /**
     * How a heading is styled regardless of structure  "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
     */
    variant?: HeadingVariant;
}
