import {JSX} from "react";

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
    
    const listProps = {
        ...rest,
        "data-orientation": orientation,
        "data-testid": testId,
        className: cx,
        role: role || "list",
    };

    return (
        ordered
            ?
            (<ul {...listProps}>{children}</ul>)
            : (<ol {...listProps}>{children}</ol>)
    )
}