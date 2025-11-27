"use client";
import {JSX} from "react";
import {Heading, Link, List, ListItem, Text} from "@/ui/components";

export function Introduction(): JSX.Element {

    return (<>
        <Text><abbr title="Garbage In, Garbage Out">GIGO</abbr>:
            Since a React application is built by a series of parent/child components, it stands to reason that the only
            way to create an accessible application is to make sure your base components, those that wrap around structural and semantically valid HTML elements,
            are as accessible as they can be. All components created have been used in the creation of this page.</Text>
        <Text>This release holds the code for the article: <Link
            href="https://dev.to/shaynaproductions/base-components-are-key-to-accessibility-2bd8"
            openInNewTab={true}>Base Components are key to accessibility</Link></Text>

        <Heading headingLevel={3}>General Accessibility Resources</Heading>
        <List cx="general">
            <ListItem><Link href="https://www.w3.org/WAI/WCAG22/quickref/" openInNewTab={true}><abbr
                title="Web Content Accessibility Guidelines">WCAG</abbr> Quick
                Reference</Link>
                <Text>A customizable quick reference to the legally required guidelines in most countries.</Text>
            </ListItem>
            <ListItem><Link href="https://dequeuniversity.com/checklists/web/" openInNewTab={true}>Deque Web
                Accessibility Checklist</Link> <Text>A useful guide showing requirements for various
                components. PDF is easier to search.</Text></ListItem>
            <ListItem><Link href="https://accessibilityinsights.io/docs/web/overview/" openInNewTab={true}>Accessibility
                Insights for Web</Link>
                <Text>An extension for Chrome and Edge to help developers find and fix accessibility
                    issues.</Text></ListItem>
        </List></>)

}