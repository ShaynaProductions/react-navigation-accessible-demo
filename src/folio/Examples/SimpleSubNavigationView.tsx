"use client";
import {Box, Button, Heading, Navigation, NavigationLinkProps, Text, transformNavigation,} from "@/ui/components";

export default function SimpleSubNavigationView(navObject: { navigation: NavigationLinkProps[]; }) {
    const navigation = transformNavigation(navObject.navigation);

    return (
        <>
            <Heading headingLevel={3}>Simple SubNavigation</Heading>
            <Text>An example of a single navigation component with nested subnavigation. Focusable Front and End buttons
                help define
                keyboard traps.</Text>
            <Text><strong>Note: </strong>This example will only implement keyboard handling
                within each sublist. Use the tab key to move into and out of sub navigation.</Text>
            <Box cx="example simple">
                <Button id="front">Focusable Front</Button>
                <Navigation
                    id="simple-sub-navigation"
                    label="Simple Sub Navigation Demo"
                >
                    {navigation}
                </Navigation>
                <Button id="end">Focusable End</Button>
            </Box>
        </>
    );
}
