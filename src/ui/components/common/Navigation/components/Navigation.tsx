"use client";
import {NavigationListProps, NavigationProps} from "../NavigationTypes";
import NavigationList from "./NavigationList";

export default function Navigation({
    children,
    label,
    isOpen = true,
    orientation = "vertical",
    ...rest
}: NavigationProps) {
    const navListProps:NavigationListProps = {
        isOpen: isOpen,
        orientation: orientation,
        ...rest,
    }

    return (
        <>
            <nav aria-label={label}>
                <NavigationList {...navListProps}>{children}</NavigationList>
            </nav>
        </>
    );
}