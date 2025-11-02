"use client";
import {JSX} from "react";
import Link from "next/link";

import {returnTrueElementOrUndefined} from "@/source/utilities";

import {LinkProps} from "./LinkTypes";
import useLink from "./useLink";

export function InternalLink({
    children,
    cx,
    href,
    isDisabled,
    openInNewTab,
    ref,
    suppressNewIcon,
    target,
    testId,
    ...rest
}: LinkProps): JSX.Element {
    const {getLinkTarget, getIsTargetSpecific, getNewTab, getSafeHref} = useLink();

    const safeHref = getSafeHref(!!isDisabled, href);

    const linkTarget = getLinkTarget(openInNewTab, target);
    const isTargetSpecific = getIsTargetSpecific(linkTarget);

    const willOpenInNewTab = openInNewTab || isTargetSpecific;
    const newTab = getNewTab(!!suppressNewIcon || !!target);

    const linkProps = {
        ...rest,
        "aria-disabled": returnTrueElementOrUndefined(!!isDisabled),
        className: cx,
        "data-testid": testId,
        href: safeHref || "",
        ref: ref,
        target: linkTarget,
    };

    return (
        <Link {...linkProps}>
            {children}
            {willOpenInNewTab && newTab}
        </Link>
    );
}   