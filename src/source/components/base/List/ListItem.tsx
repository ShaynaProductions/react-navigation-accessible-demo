import { JSX } from "react";

import { ListItemProps } from "./ListTypes";

export function ListItem({
  children,
  cx,
  role,
  testId,
  ...rest
}: ListItemProps): JSX.Element {
    
    const listItemProps = {
        ...rest,
        className: cx,
        "data-testid": testId,
        role: role || "listitem",
    };
    return (
        <>
            <li {...listItemProps}>{children}</li>
        </>
    );
}
