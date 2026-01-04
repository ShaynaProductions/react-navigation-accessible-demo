"use client";

import { NavigationProvider } from "../providers";
import {
  NavigationListProps,
  NavigationProps,
  NavigationWrapperProps,
} from "./NavigationTypes";
import NavigationList from "./NavigationList";
import { NavigationWrapper } from "./NavigationWrapper";
import { returnControllingEl } from "./componentFunctions";

export default function Navigation({
  children,
  cx,
  isOpen = true,
  label,
  orientation = "horizontal",
  parentRef,
  shouldPassthrough = false,
  testId,
  ...rest
}: NavigationProps) {
  const controllingEl = returnControllingEl(parentRef);

  const navigationListProps: NavigationListProps = {
    isOpen: isOpen,
    orientation: orientation,
    testId: testId,
    ...rest,
  };

  const navigationWrapperProps: Omit<NavigationWrapperProps, "children"> = {
    cx,
    isOpen,
    label,
    parentRef,
    shouldPassthrough,
  };

  return (
    <NavigationProvider
      value={{
        controllingEl: controllingEl,
        isSubListOpen: isOpen,
        orientation: orientation,
        storedParentEl: null,
      }}
    >
      <NavigationWrapper {...navigationWrapperProps}>
        <NavigationList {...navigationListProps}>{children}</NavigationList>
      </NavigationWrapper>
    </NavigationProvider>
  );
}
