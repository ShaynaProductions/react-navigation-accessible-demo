import React from "react";
import {LinkProps as NextLinkProps} from "next/link";
import {LinkProps as RacLinkProps} from "react-aria-components";
import {BaseProps} from "@/source/types";

export type LinkTargets = "_self" | "_blank" | "_parent" | "_top";

export type LinkFocusHandler = React.FocusEventHandler<HTMLAnchorElement>;
export type LinkMouseHandler = React.MouseEventHandler<HTMLAnchorElement>;

interface CommonLinkProps {
    /**
     *  URL for link.  May be (native) HTML or router (client)
     */
    href: string;

    /**
     * default (false). When true sets aria- and data-disabled
     */
    isDisabled?: boolean;

    /**
     * default (undefined). When true sets data-focused
     */
    isFocused?: boolean;

    /**
     * default (undefined). When true sets data-hovered
     */
    isHovered?: boolean;

    /**
     *  default: (undefined). When true sends link to a new tab.
     */
    openInNewTab?: boolean;

    /**
     * ref: RefObject<HTMLAnchorElement | null>
     */
    ref?: React.RefObject<HTMLAnchorElement | null>;

    /**
     * Hide visual icon in favor of hidden text - defaults to false.
     */
    suppressNewIcon?: boolean;

    /* Target to send link to
     * "_self" | "_blank" | "_parent" | "_top" | {namedTarget}
     * */
    target?: string | LinkTargets;
}

export interface InternalLinkProps
    extends BaseProps,
        CommonLinkProps,
        Omit<NextLinkProps, "href"> {
    /**
     * The children of the component.
     */
    children: React.ReactNode;
    

}

export interface ExternalLinkProps
    extends BaseProps,
        CommonLinkProps,
        Omit<RacLinkProps, "href" | "onFocus" | "style" | "target"> {
    children: React.ReactNode;

}
