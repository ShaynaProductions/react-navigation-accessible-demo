"use client";
import {useRef, useState} from "react";
import {Box, Button, Heading, Navigation, NavigationLinkProps, ParentElementType, Text, transformNavigation,} from "@/ui/components";



export function SimpleSubNavigationView(
    navObject: { navigation: NavigationLinkProps[]; },
    testId?: string) {
    const [open, setOpen] = useState(false);
    const navigation = transformNavigation(navObject.navigation);

    const buttonRef = useRef<ParentElementType>(null);

    const handlePress = () => {
        setOpen(!open);
    }

    const buttonProps = {
        ref: buttonRef,
        "aria-expanded": open,
        "aria-controls": "simple-sub-navigation",
        onPress: handlePress,
        id: "mobile"
    }

    return (
        <>
            <Heading headingLevel={3}>Single SubNavigation</Heading>
            <Text>An example of a single navigation component with nested subnavigation. Focusable buttons surround the
                component and help identify keyboard traps. This example emulates a mobile menu and passes the reference into the navigation compnent.</Text>
            <Text><strong>Note: </strong>This example now implements keyboard handling
               between sublists. Use the down and up arrow keys to move between a button and its controled list. Use the up arrow key to move up through collapsed or expanded lists.</Text>
            <Box cx="example simple mobile" testId={testId}>
                <Button{...buttonProps}>Menu</Button>
                <Navigation
                    id="simple-sub-navigation"
                    isOpen={open}
                    label="Simple Sub Navigation Demo"
                    parentRef={buttonRef}
                    testId={testId}
                >
                    {navigation}
                </Navigation>
                <Button id="end">Focusable End</Button>
            </Box>
        </>
    );
}
