"use client"

import {useEffect} from "react";
import {NavigationWrapperProps, ParentElementType, ResetArrayProps} from "../NavigationTypes";
import {useNavigation} from "../hooks";



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

    const {getTopNavigationParent, registerSubNavigation, _resetTopNavArray} = useNavigation();

    useEffect(() => {
        const storedParentEl: ParentElementType = getTopNavigationParent().storedParentEl;
        const parentEl = parentRef?.current as ParentElementType;
        /* istanbul ignore else */
        if (storedParentEl !== parentEl) {
            resetArray(parentEl, storedParentEl, _resetTopNavArray,);
        }
        if(!!parentEl){
         registerSubNavigation(isOpen, parentEl);
        }
    }, [getTopNavigationParent, parentRef, _resetTopNavArray, registerSubNavigation, isOpen])

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