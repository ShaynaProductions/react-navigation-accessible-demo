"use client";

import {Heading, Link, Navigation, NavigationLinkProps, Text, transformNavigation} from "@/ui/components";

export function BaseStructureView(navObj: { navigation: NavigationLinkProps[]; }) {
    const navigation = transformNavigation(navObj.navigation)
    return (
        <>
            <Heading headingLevel={2}>Base Structure Example</Heading>
            <Text>This example renders a structurally semantic component along with the basic aria requirements. You can
                read the accompanying article <Link
                    href="https://dev.to/shaynaproductions/first-layer-implementing-a-base-structure-492o"
                    openInNewTab={true}>Creating the First Layer - Implementing Basic Structure</Link> on Dev.to</Text>

            <Navigation
                id="prototype"
                label="Basic Structure"
                orientation={"horizontal"}>
                {navigation}
            </Navigation>
        </>
    );
}