"use client";
import {
  Heading,
  MobileNavigation,
  Text,
  transformNavigation,
} from "@/ui/components";

export function MobileNavigationView(navObject) {
  const navigation = transformNavigation(navObject.navigation);

  return (
    <>
      <Heading headingLevel={3}>Mobile Menu Example</Heading>
      <Text>A simplified mobile menu example.</Text>
      <MobileNavigation id="mobile-nav" cx="mobile" label="Mobile Menu Demo">
        {navigation}
      </MobileNavigation>
    </>
  );
}
