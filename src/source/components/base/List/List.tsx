import {createElement, JSX} from "react";

import {ListProps} from "./ListTypes";

export default function List({
         children,
         cx,
         ordered = false,
         orientation = "vertical",
         role,
         testId,
         ...rest
}: ListProps): JSX.Element {
    const listComponent = ordered ? "ol" : "ul";

    const listProps = {
        ...rest,
        "data-orientation": orientation,
        "data-testid": testId,
        className: cx,
        role: role || "list",
    };
    const Component = ({...listProps}) =>
        createElement(listComponent, listProps, children);

    return <Component {...listProps} />;
}
