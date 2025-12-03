"use client";
import {Heading, Link, Text} from "@/ui/components";

export function ComplexSubNavWithLinks() {

    return (<>
        <Heading headingLevel={3}><Link href="/examples/complex-subnav-links">Complex SubNavigation with Links</Link></Heading>
        <Text>An example of a complex navigation object with the top row beginning and ending with links.</Text>
    </>);
}