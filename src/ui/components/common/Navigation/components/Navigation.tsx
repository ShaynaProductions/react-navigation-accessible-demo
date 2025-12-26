"use client";

import { NavigationProvider } from "../providers";
import {
  NavigationListProps,
  NavigationProps,
  NavigationWrapperProps,
} from "./NavigationTypes";
import NavigationList from "./NavigationList";
import { NavigationWrapper } from "./NavigationWrapper";
import { returnStoredParentEl } from "./componentFunctions";

export default function Navigation({
  children,
  cx,
  isOpen = true,
  label,
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
  };

  const navigationWrapperProps: Omit<NavigationWrapperProps, "children"> = {
    cx,
    isOpen,
    label,
    parentRef,
  };

  return (
    <NavigationProvider
      value={{
        storedList: [],
        storedParentEl: storedParentEl,
        isSubListOpen: isOpen,
      }}
    >
      <NavigationWrapper {...navigationWrapperProps}>
        <NavigationList {...navListProps}>{children}</NavigationList>
      </NavigationWrapper>
    </NavigationProvider>
  );
}
