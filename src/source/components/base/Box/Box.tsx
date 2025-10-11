import React, {JSX} from "react";
import classNames from "classnames";
import {BoxProps} from "./BoxTypes";

export default function Box({
    children,
    cx,
    inline,
    isHidden,
    testId,
    ...rest
}: BoxProps): JSX.Element {

     const componentProps = {
        ...rest,
        className: classNames({srOnly: isHidden}, cx),
        "data-testid": testId,
    }


    return (
        inline
            ? (
               <><span{...componentProps}>{children}</span></>
            )
            : (
                <><div {...componentProps}>{children}</div></>
            )
    );
}
