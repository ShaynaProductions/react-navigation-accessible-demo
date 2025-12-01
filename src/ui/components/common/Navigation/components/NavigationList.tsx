"use client";
import classNames from "classnames";

import {List, ListProps} from "@/ui/components";
import {NavigationListProps} from "../NavigationTypes";

export default function NavigationList({
    children,
    cx,
    id,
    isOpen,
    ...rest
}: NavigationListProps) {
    const listProps: ListProps = {
        id,
        cx: classNames({srOnly: !isOpen}, cx),
        ...rest,
    };

    return (
        <List key={`list-${id}`} {...listProps}>
            {children}
        </List>
    );
}