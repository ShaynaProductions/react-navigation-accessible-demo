/* istanbul ignore file */
import React from 'react';

export type Orientation = "horizontal" | "vertical";
/* istanbul ignore next */
const emptySymbol = Symbol("EmptyObject type");
export type EmptyObject = { [emptySymbol]?: never };


export interface BaseProps {
    /**
     *  classnames to pass
     */
    cx?: string;

    /**
     * The element's unique identifier. See <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/id">MDN</a>
     */
    id?: string;

    /**
     * The inline style for the element. A function may be provided to compute the style based on component state.
     */
    style?: React.CSSProperties;

    /**
     * Id used for testing purposes only.
     */
    testId?: string;
}
