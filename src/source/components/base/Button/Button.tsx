"use client";
import {JSX} from "react";
import {Button as RacButton} from "react-aria-components";

import {ButtonProps} from "./ButtonTypes";

export default function Button({
       children,
       cx,
       isDisabled,
       onPress,
       testId,
       ...rest
   }: ButtonProps): JSX.Element {

    const buttonProps = {
        ...rest,
        "aria-disabled": isDisabled,
        className: cx,
        "data-testid": testId,
        onPress: !isDisabled ? onPress : undefined,
    };

    return <RacButton {...buttonProps}>{children}</RacButton>;
}
