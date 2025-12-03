"use client";
import {Heading, Link, Text} from "@/ui/components";

export function ComplexSubNav() {

    return (<>
        <Heading headingLevel={3}><Link href="/examples/complex-subnav">Complex SubNavigation </Link></Heading>
        <Text>An example of a complex navigation object with every item in the top row holding at least one subnavigation list.</Text>
    </>);
}