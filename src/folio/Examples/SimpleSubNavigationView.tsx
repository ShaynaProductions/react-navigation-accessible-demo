"use client";
import {useRef, useState} from "react";
import {Box, Button, Heading, Navigation, NavigationLinkProps, Text, transformNavigation,} from "@/ui/components";
import {ParentElementType} from "@/ui/components/common/Navigation/NavigationTypes";


export function SimpleSubNavigationView(navObject: { navigation: NavigationLinkProps[]; }) {
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
            <Text><strong>Note: </strong>This example will only implement keyboard handling
                within each sublist. Use the tab key to move into and out of sub navigation.</Text>
            <Box cx="example simple mobile">
                <Button{...buttonProps}>Menu</Button>
                <Navigation
                    id="simple-sub-navigation"
                    label="Simple Sub Navigation Demo"
                    parentRef={buttonRef}

                >
                    {navigation}
                </Navigation>
                <Button id="end">Focusable End</Button>
            </Box>
        </>
    );
}
