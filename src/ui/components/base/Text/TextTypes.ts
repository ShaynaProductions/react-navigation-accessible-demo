import {TextProps as RacTextProps} from "react-aria-components";
import {BaseProps} from "@/ui/types";

export interface TextProps extends BaseProps, RacTextProps {
    /**
     * default false - displays inline if true.
     */
    isInline?: boolean;
    /**
     * Hidden visually only, available to screen readers
     */
    isHidden?: boolean;
}
