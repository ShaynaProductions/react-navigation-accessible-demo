import React, {HTMLAttributes, JSX} from "react";
import {type LinkProps as NextLinkProps} from "next/link";
import {Url} from "next/dist/shared/lib/router/router";
import {BaseProps} from "@/ui/types";

export type LinkTargets = "_self" | "_blank" | "_parent" | "_top";

export interface UseLinkProps {
    GetIsTargetSpecificTypes: (linkTarget: string) => boolean;
    GetLinkTargetTypes: (openInNewTab?: boolean, target?: string) => string;
    GetNewTabTypes: (suppressNewIcon?: boolean, label?: string) => JSX.Element;
    GetSafeHrefTypes: (url?: string) => string | void;
}

export interface LinkProps extends BaseProps, NextLinkProps, Omit<HTMLAttributes<HTMLAnchorElement>, "href"> {
    /**
     * The children of the component.
     */
    children: React.ReactNode;
    /**
     *  URL for link.  May be (native) HTML or router (client)
     */
    href: Url;
    /**
     * default (undefined). When true sets data-focused
     */
    isFocused?: boolean;

    /**
     * default (undefined). When true sets data-hovered
     */
    isHovered?: boolean;
    /**
     *
     * @param e: MouseEvent => void
     */
    onMouseEnter?: (e: React.MouseEvent<Element, MouseEvent>) => void;
    /**
     *
     * @param e: MouseEvent => void
     */
    onMouseLeave?: (e:  React.MouseEvent<Element, MouseEvent>) => void;
    /**
     *
     * @param e: KeyboardEvent => void
     */
    onKeyDown?: (e: React.KeyboardEvent) => void;
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