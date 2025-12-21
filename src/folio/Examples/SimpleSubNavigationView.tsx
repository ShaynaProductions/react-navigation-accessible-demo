"use client";
import { useRef, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Navigation,
  NavigationLinkProps,
  ParentElementType,
  Text,
  transformNavigation,
} from "@/ui/components";

export function SimpleSubNavigationView(
  navObject: { navigation: NavigationLinkProps[] },
  testId?: string,
) {
  const [open, setOpen] = useState(false);
  const navigation = transformNavigation(navObject.navigation);

  const buttonRef = useRef<ParentElementType>(null);

  const handlePress = () => {
    setOpen(!open);
  };

  const buttonProps = {
    ref: buttonRef,
    "aria-expanded": open,
    "aria-controls": "simple-sub-navigation",
    onPress: handlePress,
    id: "mobile",
  };

  return (
    <>
      <Heading headingLevel={3}>Single SubNavigation</Heading>
      <Text>
        An example of a single navigation component with nested subnavigation.
        Focusable buttons surround the component and help identify keyboard
        traps. This example emulates a mobile menu and passes the reference into
        the navigation compnent.
      </Text>
      <Text>
        <strong>Note: </strong>This example implements keyboard handling between
        sublists using the tab keys to move in, out and through the navigation
        items. Tab and arrow-down follow many of the same requirements, as does
        Shift-Tab follow the arrow-up functionality. Use the tab key at the end
        to move out of the component and then shift-key to move back in. Use the
        Tab key to move into the component at the beginning and then Shift-Tab
        to move back out.
      </Text>
      <Box cx="example simple mobile" testId={testId}>
        <Button {...buttonProps}>Menu</Button>
        <Navigation
          id="simple-sub-navigation"
          isOpen={open}
          label="Simple Sub Navigation Demo"
          parentRef={buttonRef}
          testId={testId}
        >
          {navigation}
        </Navigation>
        <Button id="end">Focusable End</Button>
      </Box>
    </>
  );
}
