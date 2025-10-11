import React from "react";
import {BaseProps} from "@/source/types";

export interface BoxProps extends BaseProps {
    /**
     * The children of the component.
     */
    children?: React.ReactNode;

    /**
     * Expose contents to a screen reader while hiding it visually
     */
    isHidden?: boolean;

    /**
     * component type div (default) or span when true
     */
    inline?: boolean;

    /**
     * For complex components only. See <a href="https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles">MDN</a>
     */
    "aria-role"?: React.AriaRole;

    /**
     * When certain roles may not be passed through aria (like alert)
     */
    role?: string;
}
