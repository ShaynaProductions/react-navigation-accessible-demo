"use client";
import { JSX } from "react";
import { Heading, Link, List, ListItem, Text } from "@/source/components";

export const Header = (): JSX.Element => {
    return (
        <header>
            <Heading headingLevel={1} variant="h2">Accessible Navigation Demo</Heading>
            <Text>
                A demonstration of an accessible navigation component for React
            </Text>
            <List orientation="horizontal">
                <ListItem>
                    <Link href="/public">Home</Link>
                </ListItem>
            </List>
        </header>
    );
};
