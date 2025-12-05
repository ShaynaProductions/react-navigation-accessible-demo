"use client";

import {Box, Heading, Link, List, ListItem, Text,} from "@/ui/components";
import {ComplexSubNav, ComplexSubNavWithLinks, SimpleLinks, SimpleLinksButtons, SimpleSubNav} from "./sections";

export function HomeView() {

    return (
        <Box id="home-view">
            <Box cx="intro">
                <Heading headingLevel={2}>Introduction</Heading>
                <Text>
                    This code base is provided as a progressive example of an accessible React navigation component.
                    It is accompanied by a <Link href="https://dev.to/shaynaproductions/" openInNewTab={true}>set of
                    articles hosted on Dev.to</Link>.
                </Text>
                <Text>The examples below represent the progression of the code as completed in the accompanying
                    article: <Link href="" openInNewTab={true}>Second Layer - Keyboard handling through a single list</Link>. The
                    source code is provided through a series of releases, each release fully typed and tested.
                </Text>
                <Text> Examples are provided which work up to the specific release constraints. This release begins
                    the process of implementing keyboard functionality with a focus on navigations between items sharing
                    a
                    lists. Navigation between lists will be covered in the next article. </Text>
            </Box>
            <Box cx="examples">
                <Heading headingLevel={2}> Examples</Heading>
                <List orientation="horizontal">
                    <ListItem><SimpleLinks/></ListItem>
                    <ListItem><SimpleLinksButtons/></ListItem>
                    <ListItem><SimpleSubNav/></ListItem>
                    <ListItem><ComplexSubNavWithLinks/></ListItem>
                    <ListItem><ComplexSubNav/></ListItem>
                </List>
            </Box>
            <Box cx="prev-releases">
                <Heading headingLevel={2}>Previous Releases</Heading>
                <Text>Explore previous versions along with their accompanying articles.</Text>
                <List>
                    <ListItem><strong>Accessible Base Components</strong>
                        <dl>
                            <dt>Article</dt>
                            <dd><Link openInNewTab={true}
                                      href="https://dev.to/shaynaproductions/base-components-are-key-to-accessibility-2bd8">Base
                                Components are key to accessibility</Link><br/></dd>
                            <dt>Page</dt>
                            <dd><Link href="/examples/base-components">Examples of Accessible Base Components</Link>
                            </dd>
                            <dt>Release</dt>
                            <dd><Link openInNewTab={true}
                                      href="https://github.com/ShaynaProductions/react-navigation-accessible-demo/releases/tag/v0.1.1">Accessible
                                Base Components</Link></dd>
                        </dl>
                    </ListItem>
                    <ListItem><strong>Implementing a Base Structure</strong>
                        <dl>
                            <dt>Article</dt>
                            <dd><Link openInNewTab={true}
                                href="https://dev.to/shaynaproductions/first-layer-implementing-a-base-structure-492o">First
                                Layer - Implementing a Base Structure</Link></dd>
                            <dt>Release</dt>
                            <dd><Link  openInNewTab={true}
                                href="https://github.com/ShaynaProductions/react-navigation-accessible-demo/releases/tag/v0.2.2">Implementing
                                a Base Structure</Link></dd>
                        </dl>
                    </ListItem>
                    <ListItem><strong>Single List Keyboard Implementation</strong> - (current version)<br/>
                        <dl>
                            <dt>Article</dt>
                            <dd><Link href="https://dev.to/shaynaproductions/second-layer-keyboard-handling-through-a-single-list-1ded">Second Layer - Keyboard handling through a single list
                            </Link></dd>
                            <dt>Release:</dt>
                            <dd><Link
                                href="https://github.com/ShaynaProductions/react-navigation-accessible-demo/releases/tag/v0.3.0">Implementing
                                Single List Keyboard Handling</Link></dd>
                        </dl>
                    </ListItem>
                </List>
            </Box>
        </Box>
    );
}
