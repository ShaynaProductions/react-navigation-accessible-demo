"use client";
import { Heading, Link, Text } from "@/ui/components";

export function StyledMobile() {
  return (
    <>
      <Heading headingLevel={3}>
        <Link href="/examples/mobile-nav">Styled Mobile Navigation</Link>
      </Heading>
      <Text>An example of styling the navigation component for mobile.</Text>
    </>
  );
}
