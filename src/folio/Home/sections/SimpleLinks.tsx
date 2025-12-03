"use client";
import {Heading, Link, Text} from "@/ui/components";

export function SimpleLinks() {

    return (<>
        <Heading headingLevel={3}><Link href="/examples/simple-links">Simple Links</Link></Heading>
        <Text>Simple Links are just that, a single navigation list consisting only of links.</Text>
    </>);
}