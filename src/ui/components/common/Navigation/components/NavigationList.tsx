"use client";
import classNames from "classnames";

import {List, ListProps} from "@/ui/components";
import {NavigationListContextStoredValueProps, NavigationListProvider} from "../providers/NavigationListProvider";
import {NavigationListProps, ParentElementType} from "../NavigationTypes";
import {useRef} from "react";

export default function NavigationList({
    children,
    cx,
    id,
    isOpen,
    parentRef,

    ...rest
}: NavigationListProps) {
    const emptyRef = useRef<ParentElementType>(null);
    const listContext: NavigationListContextStoredValueProps = {
        parentRef: parentRef || emptyRef,
    };

    const listProps: ListProps = {
        id,
        cx: classNames({srOnly: !isOpen}, cx),
        ...rest,
    };

    return (
        <NavigationListProvider value={listContext}>
            <List key={`list-${id}`} {...listProps}>
                {children}
            </List>
        </NavigationListProvider>
    );
}