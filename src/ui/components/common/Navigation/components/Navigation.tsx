"use client";

import {useEffect, useState} from "react";
import {NavigationProvider} from "../providers";
import {NavigationListProps, NavigationProps, ParentElementType} from "../NavigationTypes";
import NavigationList from "./NavigationList";

export default function Navigation({
    children,
    label,
    isOpen = true,
    orientation = "vertical",
    parentRef,
    ...rest
}: NavigationProps) {
    const [parentEl, setParentEl] = useState<ParentElementType>(null);

    useEffect(() => {
            if (parentRef) {
                setParentEl(parentRef.current);
            }
        },
        [parentRef, setParentEl]
    );

    const navListProps: NavigationListProps = {
        isOpen: isOpen,
        orientation: orientation,
        parentRef: parentRef,
        ...rest,
    }

    return (
        <NavigationProvider value={{
            storedList: [],
            storedParentEl: parentEl,
        }}>
            <nav aria-label={label}>
                <NavigationList {...navListProps}>{children}</NavigationList>
            </nav>
        </NavigationProvider>
    );
}