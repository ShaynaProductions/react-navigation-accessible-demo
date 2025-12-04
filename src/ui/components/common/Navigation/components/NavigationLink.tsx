"use client";

import {Link, ListItem} from "@/ui/components";
import {usePathname} from "@/ui/hooks";
import {returnTrueElementOrUndefined} from "@/ui/utilities";
import {NavigationLinkProps} from '../NavigationTypes';
import {LinkProps} from "next/link";

export function NavigationLink({
    cx,
    href,
    id,
    label,
    ...rest
}: NavigationLinkProps) {
    const currentPath   = usePathname();

    const listItemProps = {
        cx: cx,
        id: id,
    };

    const linkProps: Omit<LinkProps, "onMouseEnter" | "onMouseLeave"> = {
        "aria-current": returnTrueElementOrUndefined(currentPath === href),
        href: href,
        ...rest,
    };

    return (<>
        <ListItem key={id}{...listItemProps}>
            <Link {...linkProps}>{label}</Link>
        </ListItem>
    </>)
}