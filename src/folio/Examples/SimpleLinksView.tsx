"use client";
import {Box, Heading, Navigation, Text, transformNavigation,} from "@/ui/components";

export function SimpleLinksView(navObject) {
    const navigation = transformNavigation(navObject.navigation);

    return (
        <>
            <Heading headingLevel={3}>Simple Link Structure</Heading>
            <Text>One level of links</Text>
            <Box cx="example simple">
                <Navigation id="simple-links-demo" label="Simple Links Demo">
                    {navigation}
                </Navigation>
            </Box>
        </>
    );
}
