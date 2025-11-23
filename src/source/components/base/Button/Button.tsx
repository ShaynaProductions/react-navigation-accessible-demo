"use client";
import {JSX} from "react";
import {Button as RacButton} from "react-aria-components";

import {returnTrueElementOrUndefined} from "@/source/utilities";
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
        "aria-disabled": returnTrueElementOrUndefined(!!isDisabled),
        className: cx,
        "data-testid": testId,
        onPress: isDisabled ? undefined : onPress,
    };

    return <RacButton {...buttonProps}>{children}</RacButton>;
}
