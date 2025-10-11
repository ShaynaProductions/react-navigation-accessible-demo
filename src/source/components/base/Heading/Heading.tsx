import React, { JSX } from "react";
import classNames from "classnames";
import { Heading as RacHeading } from "react-aria-components";
import { HeadingProps } from "./HeadingTypes";

export default function Heading({
  children,
  cx,
  headingLevel = 2,
  isHidden,
  testId,
  variant,
  ...rest
}: HeadingProps): JSX.Element {
  const currentHeadingLevel = headingLevel >= 1 && headingLevel <= 6 ? headingLevel : 6;
  const currentVariant = variant || `h${currentHeadingLevel}`;


    const headingProps = {
        ...rest,
        className: classNames({ srOnly: !!isHidden }, currentVariant, cx),
        "data-testid": testId,
        level: currentHeadingLevel,
    };

    return <RacHeading {...headingProps}>{children}</RacHeading>;
}
