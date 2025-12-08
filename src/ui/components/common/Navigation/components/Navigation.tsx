"use client";

import {RefObject} from "react";
import {NavigationProvider} from "../providers";
import {NavigationListProps, NavigationProps, NavigationWrapperProps, ParentElementType} from "../NavigationTypes";
import NavigationList from "./NavigationList";
import {NavigationWrapper} from "@/ui/components/common/Navigation/components/NavigationWrapper";

const returnStoredParentEl = (parentRef?: RefObject<ParentElementType | null>) => {
    return parentRef?.current || null
}

export default function Navigation({
    children,
    isOpen = true,
    orientation = "vertical",
    parentRef,
    testId,
    ...rest
}: NavigationProps) {

    const storedParentEl = returnStoredParentEl(parentRef);

    const navListProps: NavigationListProps = {
        isOpen: isOpen,
        orientation: orientation,
        parentRef: parentRef,
        testId: testId,
        ...rest,
    }

    const navigationWrapperProps: Omit<NavigationWrapperProps, "children"> = {
        parentRef: parentRef,
        ...rest,
    }

    return (
        <NavigationProvider value={{
            storedList: [],
            storedParentEl: storedParentEl,
        }}>
            <NavigationWrapper {...navigationWrapperProps}>
                <NavigationList {...navListProps}>{children}</NavigationList>
            </NavigationWrapper>
        </NavigationProvider>
    );
}