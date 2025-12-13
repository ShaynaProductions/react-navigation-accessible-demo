"use client"

import {useEffect} from "react";
import {NavigationWrapperProps, ParentElementType} from "../NavigationTypes";
import {useNavigation} from "../hooks";

interface ResetArrayProps {
    resetArray: (
        parentEl: ParentElementType,
        storedParentEl: ParentElementType,
        _resetTopNavArray: (parentEl: ParentElementType) => void) => void;
}

const resetArray: ResetArrayProps["resetArray"] = (
    parentEl, storedParentEl, _resetTopNavArray) => {
    /* istanbul ignore else */
    if (storedParentEl === null && !!parentEl && parentEl !== storedParentEl) {
        _resetTopNavArray(parentEl);
    }
}

export function NavigationWrapper({
    children,
    cx,
    isOpen,
    label,
    parentRef,
    ...rest
}: NavigationWrapperProps) {

    const {getNavigationParent, registerSubNavigation, _resetTopNavArray} = useNavigation();

    useEffect(() => {
        const storedParentEl: ParentElementType = getNavigationParent().storedParentEl as ParentElementType;
        const parentEl = parentRef?.current as ParentElementType;
        /* istanbul ignore else */
        if (storedParentEl !== parentEl) {
            resetArray(parentEl, storedParentEl, _resetTopNavArray,);
        }
        registerSubNavigation(isOpen, parentEl);
    }, [getNavigationParent, parentRef, _resetTopNavArray, registerSubNavigation, isOpen])

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