"use client";
import React, {FocusEventHandler, JSX, MouseEventHandler, useEffect, useRef, useState} from "react";
import {default as NextLink} from "next/link";

import {useMergedRef} from "@/ui/hooks/";
import {safeEventHandlerCall} from "@/ui/utilities";

import {LinkProps} from "./LinkTypes";
import useLink from "./useLink";

export function Link({
    children,
    cx,
    href,
    isFocused,
    isHovered,
    onFocus,
    onBlur,
    onMouseEnter,
    onMouseLeave,
    openInNewTab,
    ref,
    suppressNewIcon,
    target,
    testId,
    ...rest
}: LinkProps): JSX.Element {
    const {getLinkTarget, getIsTargetSpecific, getNewTab, getSafeHref} = useLink();
    const currentRef = useRef<HTMLAnchorElement>(null);
    const combinedRef = useMergedRef(currentRef, ref);

    const [isLinkFocused, setIsLinkFocused] = useState<boolean>(isFocused || false);
    const [isLinkHovered, setIsLinkHovered] = useState<boolean>(isHovered || false);

    const safeHref = getSafeHref(href);
    const linkTarget = getLinkTarget(openInNewTab, target);
    const isTargetSpecific = getIsTargetSpecific(linkTarget);
    const willOpenInNewTab = openInNewTab || isTargetSpecific;
    const newTab = getNewTab(!!suppressNewIcon || !!target);

    useEffect(() => {
        if (isLinkFocused) {
            currentRef.current?.setAttribute("data-focused", "true");
        } else {
            currentRef.current?.removeAttribute("data-focused");
        }
        if (isLinkHovered) {
            currentRef.current?.setAttribute("data-hovered", "true");
        } else {
            currentRef.current?.removeAttribute("data-hovered");
        }
    }, [currentRef, isLinkFocused, isLinkHovered]);

    const handleFocus = (
        e: FocusEvent | FocusEventHandler<HTMLAnchorElement>,
    ) => {
        setIsLinkFocused(true);
        safeEventHandlerCall(onFocus, {
            e: e as FocusEventHandler<HTMLAnchorElement>,
        });
    };

    const handleBlur = (e: FocusEvent | FocusEventHandler<HTMLAnchorElement>) => {
        setIsLinkFocused(false);
        safeEventHandlerCall(onBlur, {
            e: e as FocusEventHandler<HTMLAnchorElement>,
        });
    };

    const handleMouseEnter = (e: React.MouseEvent) => {
        setIsLinkHovered(true);
        safeEventHandlerCall(onMouseEnter, {e: e as React.MouseEvent});
    };

    const handleMouseLeave = (e: React.MouseEvent) => {
        setIsLinkHovered(false);
        safeEventHandlerCall(onMouseLeave, {e: e as React.MouseEvent<Element, MouseEvent>});
    };

    const linkProps = {
        ...rest,
        className: cx,
        "data-testid": testId,
        href: safeHref || "",
        onFocus: handleFocus as unknown as FocusEventHandler<HTMLAnchorElement>,
        onBlur: handleBlur as unknown as FocusEventHandler<HTMLAnchorElement>,
        onMouseEnter: handleMouseEnter as unknown as MouseEventHandler<HTMLAnchorElement>,
        onMouseLeave: handleMouseLeave as unknown as MouseEventHandler<HTMLAnchorElement>,
        ref: combinedRef,
        target: linkTarget,
    };

    return (
        <NextLink {...linkProps}>
            {children}
            {willOpenInNewTab && newTab}
        </NextLink>
    );
}   