"use client";
import {Heading, Link, Text} from "@/ui/components";

export function SimpleSubNav() {

    return (<>
        <Heading headingLevel={3}><Link href="/examples/simple-subnav">Simple Subnavigation</Link></Heading>
        <Text>This example demonstrates both a mobile setup with a button expanding and collapsing the menu, which
            consists of a single top list with a sub navigation embedded.</Text>
    </>);
}