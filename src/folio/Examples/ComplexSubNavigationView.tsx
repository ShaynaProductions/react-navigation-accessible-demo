"use client";
import {Box, Button, Heading, Navigation, NavigationLinkProps, Text, transformNavigation,} from "@/ui/components";

export default function ComplexSubNavigationView(navObject: { navigation: NavigationLinkProps[]; }) {
    const navigation = transformNavigation(navObject.navigation);

    return (
        <>
            <Heading headingLevel={3}>Complex SubNavigation</Heading>
            <Text>An example of multiple nested subnavigation components. Focusable Front and End buttons help define
                keyboard traps.</Text>
            <Text><strong>Note: </strong>This example will only implement keyboard handling
                within each Sublist. Use the tab key to move between.</Text>
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
