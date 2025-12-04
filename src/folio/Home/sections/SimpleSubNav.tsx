"use client";
import {Heading, Link, Text} from "@/ui/components";

export function SimpleSubNav() {

    return (<>
        <Heading headingLevel={3}><Link href="/examples/simple-subnav">Simple Subnavigation</Link></Heading>
        <Text>This example demonstrates a single top list with a subnavigation embedded.</Text>
    </>);
}