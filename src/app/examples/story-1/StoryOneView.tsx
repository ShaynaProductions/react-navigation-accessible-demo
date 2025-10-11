"use client";
import {ExternalLink, Heading, List, ListItem, Text,} from "@/source/components";
import "./storyOneView.css";

export default function StoryOneView() {
    return (
        <>
            <Heading headingLevel={3}>Story - Accessible Base Components</Heading>
            <Text>Any web site or application can only be as accessible as its base components. Below are links to sites with the requirements as well as explanations as to what
                makes each accessible.</Text>
            <Heading headingLevel={4}>General Accessibility Resources</Heading>
            <List cx="general">
                <ListItem><ExternalLink href="https://www.w3.org/WAI/WCAG22/quickref/" openInNewTab={true}><abbr title="Web Content Accessibility Guidelines">WCAG</abbr> Quick
                    Reference</ExternalLink>
                    <Text>A customizable quick reference to the legally required guidelines in most countries.</Text>
                </ListItem>
                <ListItem><ExternalLink href="https://accessibilityinsights.io/docs/web/overview/" openInNewTab={true}>Accessibility Insights for Web</ExternalLink>
                    <Text>An extension for Chrome and Edge to help developers find and fix accessibility issues.</Text></ListItem>
            </List>


            <Heading headingLevel={4}>Base Components Required for Navigation Component:</Heading>
            <List orientation="horizontal">
                <ListItem cx="link"><Heading headingLevel={4}>A Link Component</Heading>
                    <Text>A link component renders the &lt;a /&gt; element, adding consistent base styling and exposing all html attributes.</Text>
                    <Text>The component used in this demonstration implements a facade of the <ExternalLink href="https://nextjs.org/docs/app/api-reference/components/link"
                                                                                                            openInNewTab={true}>Next.js/Link</ExternalLink>, adding a variety of
                        accessibility and security features.
                    </Text>
                    <Text>
                        Whether creating something new or evaluating a third party link component, make sure it conforms to the techniques listed by Deque&#39;s <ExternalLink
                        href="https://dequeuniversity.com/checklists/web/links" openInNewTab={true}> link
                        checklist </ExternalLink> which includes <abbr title="Web Content Accessibility Guidelines">WCAG</abbr> references.</Text>

                </ListItem>
                <ListItem cx="button"><Heading headingLevel={4}>A Button Component </Heading>
                    <Text>Button components should render the HTML &lt;button /&gt; element. A button, when triggered by a user, causes something to happen on a page, which then
                        either stays on the same page or, in the
                        case of a submit button, can send the page somewhere else. Buttons should not be used to send a link to another page, no matter how tempting.</Text>

                    <Text>All buttons in these examples use the button from the <ExternalLink href="https://react-spectrum.adobe.com/react-aria/Button.html">React Aria Component
                        Library</ExternalLink>, an unstyled component library offered by Adobe.
                    </Text>

                    <List>
                        <ListItem>
                            <Text><ExternalLink href="https://jessijokes.medium.com/one-button-to-rule-them-all-465e294cba82" openInNewTab={true}>One Button to Rule Them
                                All</ExternalLink></Text>
                        </ListItem>
                        <ListItem><Text><ExternalLink openInNewTab={true} href="https://www.magentaa11y.com/#/web-criteria/component/button">How to test a
                            button</ExternalLink> </Text>
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem cx="list"><Heading headingLevel={4}>List and ListItem components</Heading>
                    <Text>
                        The List and List item components are components I wrote to render their HTML elements, consistently, allowing some minimal styling to allow for horizontal
                        or vertical display.
                    </Text>
                </ListItem>
            </List>

        </>
    );
}
