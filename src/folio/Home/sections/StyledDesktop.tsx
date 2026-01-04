"use client";
import { Heading, Link, Text } from "@/ui/components";

export function StyledDesktop() {
  return (
    <>
      <Heading headingLevel={3}>
        <Link href="/examples/desktop-nav">Styled Desktop</Link>
      </Heading>
      <Text>An example of styling the navigation component for desktop.</Text>
    </>
  );
}
