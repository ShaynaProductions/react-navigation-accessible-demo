"use client";
import {Box, Button, Heading, Navigation, NavigationLinkProps, Text, transformNavigation,} from "@/ui/components";

export function ComplexSubNavigationLinkView(navObject: { navigation: NavigationLinkProps[]; }) {
    const navigation = transformNavigation(navObject.navigation);

    return (
        <>
            <Heading headingLevel={3}>Complex SubNavigation With End Links</Heading>
            <Text>An example of multiple nested subnavigation components. Focusable Front and End buttons help define
                keyboard traps.</Text>
            <Text><strong>Note: </strong>This example now implements keyboard handling
                between sublists. Use the down and up arrow keys to move between a button and its controled list. Use the up arrow key to move up through collapsed or expanded lists.</Text>
            <Box cx="example complex">
                <Button id="front">Focusable Front</Button>
                <Navigation
                    id="complex-navigation"
                    label="Complex Sub Navigation Demo"
                    orientation={"horizontal"}
                >
                    {navigation}
                </Navigation>
                <Button id="end">Focusable End</Button>
            </Box>
        </>
    );
}
