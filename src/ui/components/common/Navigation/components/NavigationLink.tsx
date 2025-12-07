"use client";

import React, {KeyboardEvent, useCallback, useEffect, useRef} from "react";
import {LinkProps} from "next/link";
import {usePathname} from "@/hooks";
import {Link, ListItem, ListItemProps} from "@/ui/components";
import {usePrevious} from "@/ui/hooks";
import {Keys, returnTrueElementOrUndefined} from "@/ui/utilities";
import {useNavigation, useNavigationList} from "../hooks";
import {_handleKeyDown} from "../utilities";
import {FocusableElementType, NavigationLinkProps} from '../NavigationTypes';

export function NavigationLink({
    cx,
    href,
    id,
    label,
    ...rest
}: NavigationLinkProps) {
    const {
        currentListItems,
        parentEl,
        registerListItem,
        setFirstFocus,
        setLastFocus,
        setNextFocus,
        setPreviousFocus
    } = useNavigationList();
    const {registerNavigationItem} = useNavigation();
    const currentPath = usePathname();

    const linkRef = useRef<FocusableElementType | null>(null);
    const prevLinkRef = usePrevious(linkRef);

    useEffect(() => {
        if (linkRef !== prevLinkRef) {
            registerListItem(linkRef.current as HTMLAnchorElement);
        }
    }, [linkRef, prevLinkRef, registerListItem]);

    useEffect(() => {
        registerNavigationItem(currentListItems, parentEl);
    }, [currentListItems, parentEl, registerNavigationItem])

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
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

        _handleKeyDown(e, linkEl, setFirstFocus, setLastFocus, setNextFocus, setPreviousFocus);
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