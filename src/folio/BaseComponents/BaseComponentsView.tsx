"use client";

import {useState} from "react";
import { Heading, Text} from "@/ui/components";

import {Components, Introduction} from "./sections";
import "./baseComponentsView.css";

export function BaseComponentsView() {
    const [numTimes, setNumTimes] = useState(0);

    const pressEvent = () => {
        setNumTimes(numTimes + 1);
    };

    const pressedText = `Button has been pressed ${numTimes} times`;
    return (
        <>
            <Heading headingLevel={2}>Story - Accessible Base Components</Heading>
            <Text aria-live="polite" aria-atomic="true" cx="counter"><strong>{numTimes > 0 && pressedText}</strong></Text>
            <Introduction />

            <Heading headingLevel={2}>Base Components Required for Navigation Component:</Heading>
            <Components headingLevel={3} pressEvent={pressEvent} />
        </>
    );
}
