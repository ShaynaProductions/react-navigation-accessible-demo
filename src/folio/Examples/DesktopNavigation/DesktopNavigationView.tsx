"use client";

import {
  Heading,
  Navigation,
  NavigationLinkProps,
  transformNavigation,
} from "@/ui/components";

export function DesktopNavigationView(navObject: {
  navigation: NavigationLinkProps[];
}) {
  const navigation = transformNavigation(navObject.navigation);

  return (
    <>
      <Heading headingLevel={2}>Styled Desktop Navigation</Heading>
      <Navigation
        id="desktop"
        cx="desktop"
        label="main menu"
        orientation="horizontal"
      >
        {navigation}
      </Navigation>
    </>
  );
}
