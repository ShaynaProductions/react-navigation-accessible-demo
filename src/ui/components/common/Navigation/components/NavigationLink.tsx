"use client";

import React, {useCallback, useEffect, useRef} from "react";
import {LinkProps} from "next/link";
import {Link, ListItem, ListItemProps} from "@/ui/components";
import {usePathname, usePrevious} from "@/ui/hooks";
import {Keys, returnTrueElementOrUndefined} from "@/ui/utilities";
import {FocusableElementType, NavigationLinkProps} from '../NavigationTypes';
import {useNavigationList} from "../hooks";


export function NavigationLink({
    cx,
    href,
    id,
    label,
    ...rest
}: NavigationLinkProps) {
    const {registerListItem, setFirstFocus, setLastFocus, setNextFocus, setPreviousFocus} = useNavigationList();
    const currentPath = usePathname();

    const linkRef = useRef<FocusableElementType | null>(null);
    const prevLinkRef = usePrevious(linkRef);

    useEffect(() => {
        if (linkRef.current && linkRef !== prevLinkRef) {
            registerListItem(linkRef.current);
        }
    }, [linkRef, prevLinkRef, registerListItem]);


    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        const linkEl = linkRef.current as FocusableElementType;

        switch (e.key) {
            case Keys.HOME:
            case Keys.END:
            case Keys.LEFT:
            case Keys.RIGHT:
                e.preventDefault();
                e.stopPropagation();
                break;
        }
        switch (e.key) {
            case Keys.HOME:
                setFirstFocus();
                break;
            case Keys.END:
                setLastFocus();
                break;
            case Keys.LEFT:
                setPreviousFocus(linkEl);
                break;
            case Keys.RIGHT:
                setNextFocus(linkEl);
                break;
        }

    }, [setFirstFocus, setLastFocus, setNextFocus, setPreviousFocus]);

    const listItemProps: Omit<ListItemProps, "children"> = {
        cx: cx,
        id: id,
    };

    const linkProps: Omit<LinkProps, "onMouseEnter" | "onMouseLeave"> = {
        "aria-current": returnTrueElementOrUndefined(currentPath === href),
        href: href,
        onKeyDown: handleKeyDown,
        ref: linkRef,
        ...rest,
    };

    return (<>
        <ListItem key={id}{...listItemProps}>
            <Link {...linkProps}>{label}</Link>
        </ListItem>
    </>)
}