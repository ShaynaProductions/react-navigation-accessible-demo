"use client";
import {ExternalLink, Heading, List, ListItem, Text,} from "@/source/components";
import "./storyOneView.css";

export default function StoryOneView() {
    return (
        <>
            <Heading headingLevel={3}>Story - Accessible Base Components</Heading>
            <Text><abbr title="Garbage In, Garbage Out">GIGO</abbr>: Since a React application is built by a series of
                parent/child components, it stands to reason
                that the only way to create an accessible application is to make sure your base components, those that
                wrap around structural and semantically valid HTML elements, are as accessible as they can be. </Text>
            <Text>This release holds the code for the article: <ExternalLink
                href="https://dev.to/shaynaproductions/base-components-are-key-to-accessibility-2bd8"
                openInNewTab={true}>Base Components are key to accessibility</ExternalLink></Text>

            <Heading headingLevel={4}>General Accessibility Resources</Heading>
            <List cx="general">
                <ListItem><ExternalLink href="https://www.w3.org/WAI/WCAG22/quickref/" openInNewTab={true}><abbr
                    title="Web Content Accessibility Guidelines">WCAG</abbr> Quick
                    Reference</ExternalLink>
                    <Text>A customizable quick reference to the legally required guidelines in most countries.</Text>
                </ListItem>
                <ListItem><ExternalLink href="https://dequeuniversity.com/checklists/web/" openInNewTab={true}>Deque Web
                    Accessibility Checklist</ExternalLink> <Text>A useful guide showing requirements for various
                    components. PDF is easier to search.</Text></ListItem>
                <ListItem><ExternalLink href="https://accessibilityinsights.io/docs/web/overview/" openInNewTab={true}>Accessibility
                    Insights for Web</ExternalLink>
                    <Text>An extension for Chrome and Edge to help developers find and fix accessibility issues.</Text></ListItem>
            </List>


            <Heading headingLevel={4}>Base Components Required for Navigation Component:</Heading>
            <List orientation="horizontal">
                <ListItem cx="link"><Heading headingLevel={4}>Link Component</Heading>
                    <Text>A link component renders the &lt;a /&gt; element, adding consistent base styling and exposing
                        all html attributes.</Text>
                    <Text>The component used in this demonstration implements a facade of the <ExternalLink
                        href="https://nextjs.org/docs/app/api-reference/components/link"
                        openInNewTab={true}>Next.js/Link</ExternalLink>, adding a variety of
                        accessibility and security features.
                    </Text>
                    <Text>
                        Whether creating something new or evaluating a third party link component, make sure it conforms
                        to the techniques listed by Deque&#39;s <ExternalLink
                        href="https://dequeuniversity.com/checklists/web/links" openInNewTab={true}> link
                        checklist </ExternalLink> which includes <abbr
                        title="Web Content Accessibility Guidelines">WCAG</abbr> references.</Text>

                </ListItem>
                <ListItem cx="text"><Heading headingLevel={4}>Text Component</Heading><Text>A Text component
                    encapsulates content within either a &lt;p /&gt; or &lt;span /&gt; tag. Certain accessibility
                    features such as hiding the text visually, while still allowing it to be in the DOM for screen
                    readers adds to the tags basic functionality.</Text></ListItem>
                <ListItem cx="button"><Heading headingLevel={4}>Button Component </Heading>
                    <Text>Button components should render the HTML &lt;button /&gt; element. A button, when triggered by
                        a user, causes something to happen on a page, which then
                        either stays on the same page or, in the
                        case of a submit button, can send the page somewhere else. Buttons should not be used to send a
                        link to another page, no matter how tempting.</Text>

                    <Text>All buttons in these examples use the button from the <ExternalLink
                        href="https://react-spectrum.adobe.com/react-aria/Button.html">React Aria Component
                        Library</ExternalLink>, an unstyled component library offered by Adobe.
                    </Text>
                    <Text>A synopsis of button requirements to achieve accessibility is detailed in this accompanying
                        article.</Text>

                    <List>
                        <ListItem>
                            <Text><ExternalLink
                                href="https://jessijokes.medium.com/one-button-to-rule-them-all-465e294cba82"
                                openInNewTab={true}>One Button to Rule Them All</ExternalLink></Text>
                        </ListItem>
                        <ListItem><Text>
                            <ExternalLink
                                href="https://www.magentaa11y.com/#/web-criteria/component/button"
                                openInNewTab={true}>How to test a button</ExternalLink></Text>
                        </ListItem>
                    </List>
                </ListItem>
                <ListItem cx="list"><Heading headingLevel={4}>List and ListItem Components</Heading>
                    <Text>
                        List and ListItem Components wrap around their html counterparts, to render consistently and
                        allow minimal styling for vertical or horizontal display. </Text>
                </ListItem>
            </List>

        </>
    );
}
