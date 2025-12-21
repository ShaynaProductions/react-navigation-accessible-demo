"use client";
import {
  Box,
  Button,
  Heading,
  Navigation,
  NavigationLinkProps,
  Text,
  transformNavigation,
} from "@/ui/components";

export function ComplexSubNavigationView(navObject: {
  navigation: NavigationLinkProps[];
}) {
  const navigation = transformNavigation(navObject.navigation);

  return (
    <>
      <Heading headingLevel={3}>Complex SubNavigation</Heading>
      <Text>
        An example of multiple nested subnavigation components. Focusable Front
        and End buttons help define keyboard traps.
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
      <Box cx="example complex">
        <Button id="front">Focusable Front</Button>
        <Navigation
          id="complex-navigation"
          label="Complex Sub Navigation Demo"
          orientation={"horizontal"}
        >
          {navigation}
        </Navigation>
        <Button id="end">Focusable End</Button>
      </Box>
    </>
  );
}
