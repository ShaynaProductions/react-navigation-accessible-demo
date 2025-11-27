"use client";

import {Heading, Link, List, ListItem, Text,} from "@/ui/components";
import {ExampleOne} from "./sections";
import "./home.css";

export function HomeView() {

    return (
        <>
            <Text>
                This repository is provided as an example of an accessible React navigation component accompanying a set
                of articles featured in a series of articles through{" "}
                <Link href="https://dev.to/shaynaproductions/" openInNewTab={true}>Base Components</Link>
            </Text>
            <Heading headingLevel={2}>Article Examples</Heading>
            <List>
                <ListItem><ExampleOne/></ListItem>
            </List>
        </>
    );
}
