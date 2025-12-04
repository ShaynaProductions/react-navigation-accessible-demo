"use client";

import {Heading, Link, List, ListItem, Text,} from "@/ui/components";
import {ComplexSubNav, ComplexSubNavWithLinks, SimpleLinks, SimpleLinksButtons, SimpleSubNav} from "./sections";

export function HomeView() {

    return (
        <>
            <Text>
                This repository is provided as a progressive example of an accessible React navigation component
                accompanying a set
                of articles featured in a series of articles through{" "}
                <Link href="https://dev.to/shaynaproductions/" openInNewTab={true}>Dev.to</Link>
            </Text>
            <Text>The examples below represent the progression of the code as completed in the accompanying article.
                Earlier repository releases along with their articles are covered at the bottom of this page.
                Information pertaining to base components may be found at the page demonstrating <Link
                    href="/examples/base-components">Base Components</Link>.
            </Text>
            <Text> This release implements simple keyboard functionality using the base keys: Home, end, arrow-right and
                arrow-left.
                The explaining article is <Link href="" openInNewTab={true}>Adding a Second Layer - Implementing Simple
                    Keyboard Handling</Link></Text>

            <Heading headingLevel={2}> Examples</Heading>
            <List>
                <ListItem><SimpleLinks/></ListItem>
                <ListItem><SimpleLinksButtons/></ListItem>
                <ListItem><SimpleSubNav/></ListItem>
                <ListItem><ComplexSubNavWithLinks/></ListItem>
                <ListItem><ComplexSubNav/></ListItem>
            </List>

            <Heading headingLevel={2}>Repository Versions</Heading>
            <Text>Explore previous versions along with their accompanying articles.</Text>
            <List>
                <ListItem><strong>Base Components</strong> - <br/>
                    Article: <Link
                        href="https://dev.to/shaynaproductions/base-components-are-key-to-accessibility-2bd8">Base
                        Components are key to accessibility</Link><br/>
                    Release: <Link
                        href="https://github.com/ShaynaProductions/react-navigation-accessible-demo/tree/v0.1.1">Accessible
                        Base Components</Link></ListItem>
                <ListItem><strong>Base Structure</strong> - <br/>
                    Article: <Link
                        href="https://dev.to/shaynaproductions/first-layer-implementing-a-base-structure-492o">First
                        Layer - Implementing a Base Structure</Link><br/>
                    Release: <Link
                        href="https://github.com/ShaynaProductions/react-navigation-accessible-demo/tree/v0.2.2">Implementing
                        a Base Structure</Link></ListItem>
                <ListItem><strong>Simple Keyboard Implementation</strong> - (current version)<br/>
                    Article: <Link href="">Second Layer - Simple Keyboard Handling</Link><br/>
                    Release: <Link
                        href="https://github.com/ShaynaProductions/react-navigation-accessible-demo/releases/tag/v0.3.0">Implementing
                        Simple Keyboard Handling</Link></ListItem>
            </List>
        </>
    );
}
