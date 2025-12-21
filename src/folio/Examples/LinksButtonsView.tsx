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

export function LinksButtonsView(navObject: {
  navigation: NavigationLinkProps[];
}) {
  const navigation = transformNavigation(navObject.navigation);

  return (
    <>
      <Heading headingLevel={3}>Simple Link Structure</Heading>
      <Text>
        Demonstrates a simple subnavigation consisting entirely of links with
        outside buttons to check for keyboard traps.
      </Text>
      <Text>The example is fully functional using arrow or tab keys.</Text>
      <Box cx="example simple">
        <Button id="front">Focusable Front</Button>
        <Navigation id="simple-links-demo" label="Simple Links Demo">
          {navigation}
        </Navigation>
        <Button id="end">Focusable End</Button>
      </Box>
    </>
  );
}
