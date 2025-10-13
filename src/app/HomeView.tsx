"use client";

import {ExternalLink, Heading, Link, List, ListItem, Text,} from "@/source/components";

export default function HomeView() {

    return (
        <>
            <Text>
                This repository is provided as an example of an accessible React navigation component.
            </Text>
            <Heading headingLevel={2}>Examples</Heading>
            <List>
                <ListItem>
                    <Text>Story 1 - <Link href="/examples/story-1">Accessible Base Components </Link></Text>
                    <Text>Discusses the creation and enhancement of specific base components to be used in navigation.</Text>
                    <Text>Associated with the article: <ExternalLink href="https://dev.to/shaynaproductions/base-components-are-key-to-accessibility-2bd8" openInNewTab={true}>Base Components are key to accessibility</ExternalLink></Text>
                </ListItem>
            </List>
        </>
    );
}
