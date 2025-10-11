"use client";

import {Heading, Link, List, ListItem, Text,} from "@/source/components";

export default function HomeView() {

    return (
        <>
            <Text>
                This repository is provided as an example of an accessible React navigation component.
            </Text>
            <Heading headingLevel={2}>Examples</Heading>
            <List>
                <ListItem>
                    Story 1 - <Link href="/examples/story-1">Accessible Base Components </Link>
                </ListItem>
            </List>
        </>
    );
}
