import {JSX} from "react";

import {ListProps} from "./ListTypes";


export default function List({
    children,
    cx,
    isOrdered = false,
    orientation = "vertical",
    testId,
    ...rest
}: ListProps): JSX.Element {

    const listProps = {
        ...rest,
        "data-orientation": orientation,
        "data-testid": testId,
        className: cx,

    };

    return !isOrdered ? (
        <ul {...listProps}>{children}</ul>
    ) : (
        <ol {...listProps}>{children}</ol>
    );
}