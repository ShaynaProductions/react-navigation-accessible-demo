import React, {JSX} from "react";
import classNames from "classnames";
import {Text as RacText} from "react-aria-components";

import {TextProps} from "./TextTypes";

export default function Text({
     children,
     cx,
     isInline,
     isHidden,
     testId,
     ...rest
 }: TextProps): JSX.Element {
    const textProps = {
        ...rest,
        className: classNames({srOnly: isHidden}, cx),
        "data-testid": testId,
        elementType: isInline ? "span" : "p",
    };

    return <RacText {...textProps}>{children}</RacText>;
}
