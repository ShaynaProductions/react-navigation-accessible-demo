"use client"

import {useEffect} from "react";
import {NavigationWrapperProps, ParentElementType} from "../NavigationTypes";
import {useNavigation} from "../hooks";

interface ResetArrayProps {
    resetArray: (
        parentEl: ParentElementType,
        storedParentEl: ParentElementType,
        resetParentNav: (parentEl: ParentElementType) => void) => void;
}

const resetArray: ResetArrayProps["resetArray"] = (
    parentEl, storedParentEl, resetParentNav) => {
    /* istanbul ignore else */
    if (storedParentEl === null && !!parentEl && parentEl !== storedParentEl) {
        resetParentNav(parentEl);
    }
}

export function NavigationWrapper({
    children,
    cx,
    label,
    parentRef,
    ...rest
}: NavigationWrapperProps) {

    const {getNavigationParent, resetParentNav} = useNavigation();

    useEffect(() => {
        const storedParentEl: ParentElementType = getNavigationParent().storedParentEl as ParentElementType;
        const parentEl = parentRef?.current as ParentElementType;
        /* istanbul ignore else */
        if (storedParentEl !== parentEl) {
            resetArray(parentEl, storedParentEl, resetParentNav,);
        }
    }, [getNavigationParent, parentRef, resetParentNav])

    return (
        <>
            <nav
                aria-label={label}
                className={cx}
                {...rest}
            >
                {children}
            </nav>
        </>
    );

}