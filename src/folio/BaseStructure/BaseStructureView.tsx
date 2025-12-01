"use client";

import {Heading, Link, Navigation, Text, transformNavigation} from "@/ui/components";
import "./baseStructure.css";

export function BaseStructureView(navObj) {
    const navigation = transformNavigation(navObj.navigation)
    return (
        <>
            <Heading headingLevel={2}>Prototype Example</Heading>
            <Text>This example renders a structurally semantic component along with the basic aria requirements. You can
                read the accompanying article <Link href="">Creating the First Layer - Implementing Basic Structure</Link> on Dev.to</Text>
            
            <Navigation
                id="prototype"
                label="Basic Structure"
                orientation={"horizontal"}>
                {navigation}
            </Navigation>
        </>
    );
}
