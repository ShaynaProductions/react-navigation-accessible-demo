"use client";
import {Heading, Link, Text} from "@/ui/components";

export function SimpleLinksButtons() {

    return (<>
        <Heading headingLevel={3}><Link href="/examples/links-buttons">Simple Links with Buttons</Link></Heading>
        <Text>This example adds buttons outside of the simple link component </Text>
    </>);
}