import { JSX } from "react";

import { ListItemProps } from "./ListTypes";

export function ListItem({
  children,
  cx,
  testId,
  ...rest
}: ListItemProps): JSX.Element {
    
    const listItemProps = {
        ...rest,
        className: cx,
        "data-testid": testId,
    };
    return (
        <>
            <li {...listItemProps}>{children}</li>
        </>
    );
}
