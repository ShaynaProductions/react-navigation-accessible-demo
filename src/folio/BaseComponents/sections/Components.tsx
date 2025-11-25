"use client";
import {JSX} from "react";
import {Button, Heading, Link, List, ListItem, PressEvent, Text} from "@/ui/components";

interface ComponentsProps {
    cx?: string,
    headingLevel?: number,
    pressEvent: PressEvent,
}

export function Components({cx, headingLevel, pressEvent}: ComponentsProps): JSX.Element {

    return (
        <List cx={cx} orientation="horizontal">
            <ListItem cx="text"><Heading headingLevel={headingLevel}>Text Component</Heading><Text>A Text component
                encapsulates content within either a &lt;p /&gt; or &lt;span /&gt; tag. Certain accessibility
                features such as hiding the text visually, while still allowing it to be in the DOM for screen
                readers adds to the tags basic functionality.</Text></ListItem>

            <ListItem cx="heading"><Heading headingLevel={headingLevel}>Heading Component</Heading><Text>
                A Heading component allows for display of &lt;H1 /&gt - &lt;H6 /&; tags in a uniform manner. As with the
                Text component, additional modifications are added to hide headings from the screen while still exposing them to screen readers.
            </Text></ListItem>


            <ListItem cx="link"><Heading headingLevel={headingLevel}>Link Component</Heading>
                <Text>A link component renders the &lt;a /&gt; element, adding consistent base styling and exposing
                    all html attributes.</Text>
                <Text>The component used in this demonstration implements a facade of the <Link
                    href="https://nextjs.org/docs/app/api-reference/components/link"
                    openInNewTab={true}>Next.js/Link</Link>, adding a variety of
                    accessibility and security features.
                </Text>
                <Text>
                    Whether creating something new or evaluating a third party link component, make sure it conforms
                    to the techniques listed by Deque&#39;s <Link
                    href="https://dequeuniversity.com/checklists/web/links" openInNewTab={true}> link
                    checklist </Link> which includes <abbr
                    title="Web Content Accessibility Guidelines">WCAG</abbr> references.</Text>

            </ListItem>

            <ListItem cx="button"><Heading headingLevel={headingLevel}>Button Component </Heading>
                <Text>Button components should render the HTML &lt;button /&gt; element. A button, when triggered by
                    a user, causes something to happen on a page, which then
                    either stays on the same page or, in the
                    case of a submit button, can send the page somewhere else. Buttons should not be used to send a
                    link to another page, no matter how tempting.</Text>

                <Text>All buttons in these examples use the button from the <Link
                    href="https://react-spectrum.adobe.com/react-aria/Button.html">React Aria Component
                    Library</Link>, an unstyled component library offered by Adobe.
                </Text>
                <Text>A synopsis of button requirements to achieve accessibility is detailed in this accompanying
                    article.</Text>
                <Button onPress={pressEvent}>I am a button with a press event</Button>

                <List>
                    <ListItem>
                        <Text><Link
                            href="https://jessijokes.medium.com/one-button-to-rule-them-all-465e294cba82"
                            openInNewTab={true}>One Button to Rule Them All</Link></Text>
                    </ListItem>
                    <ListItem>
                        <Text><Link
                            href="https://www.magentaa11y.com/#/web-criteria/component/button"
                            openInNewTab={true}>How to test a button</Link></Text>
                    </ListItem>
                </List>
            </ListItem>
            <ListItem cx="list"><Heading headingLevel={headingLevel}>List and ListItem Components</Heading>
                <Text>
                    List and ListItem Components wrap around their html counterparts, to render consistently and
                    allow minimal styling for vertical or horizontal display. </Text>
            </ListItem>
        </List>)

};