"use client";
import {JSX} from "react";
import {Button as RACButton} from "react-aria-components";

import {returnTrueElementOrUndefined} from "@/ui/utilities";
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
        "aria-disabled": returnTrueElementOrUndefined(!!isDisabled),
        className: cx,
        "data-testid": testId,
        onPress: isDisabled ? undefined : onPress,
        ...rest,
    };

    return <RACButton {...buttonProps}>{children}</RACButton>;
}
