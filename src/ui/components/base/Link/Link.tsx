"use client";
import {JSX} from "react";
import {default as NextLink} from "next/link";

import {LinkProps} from "./LinkTypes";
import useLink from "./useLink";

export function Link({
    children,
    cx,
    href,
    openInNewTab,
    ref,
    suppressNewIcon,
    target,
    testId,
    ...rest
}: LinkProps): JSX.Element {
    const {getLinkTarget, getIsTargetSpecific, getNewTab, getSafeHref} = useLink();

    const safeHref = getSafeHref(href);

    const linkTarget = getLinkTarget(openInNewTab, target);
    const isTargetSpecific = getIsTargetSpecific(linkTarget);

    const willOpenInNewTab = openInNewTab || isTargetSpecific;
    const newTab = getNewTab(!!suppressNewIcon || !!target);

    const linkProps = {
        ...rest,
        className: cx,
        "data-testid": testId,
        href: safeHref || "",
        ref: ref,
        target: linkTarget,
    };

    return (
        <NextLink {...linkProps}>
            {children}
            {willOpenInNewTab && newTab}
        </NextLink>
    );
}   