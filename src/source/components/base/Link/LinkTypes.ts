import React, {JSX} from "react";
import {LinkProps as NextLinkProps} from "next/link";
import {BaseProps} from "@/source/types";

export type LinkTargets = "_self" | "_blank" | "_parent" | "_top";

export interface UseLinkProps {
    GetIsTargetSpecificTypes: (linkTarget: string) => boolean;
    GetLinkTargetTypes: (openInNewTab?: boolean, target?: string) => string;
    GetNewTabTypes: (suppressNewIcon?: boolean, label?: string) => JSX.Element;
    GetSafeHrefTypes:(isDisabled: boolean, url: string) => string | void;
}

interface LinkBaseProps extends BaseProps {
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

export interface LinkProps
    extends LinkBaseProps,
        Omit<NextLinkProps, "href"> {
    /**
     * The children of the component.
     */
    children: React.ReactNode;
}

