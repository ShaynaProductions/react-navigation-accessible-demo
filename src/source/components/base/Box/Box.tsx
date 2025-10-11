import React, { JSX } from "react";
import classNames from "classnames";
import { BoxProps } from "./BoxTypes";

export default function Box({
  children,
  cx,
  inline,
  isHidden,
  testId,
  ...rest
}: BoxProps): JSX.Element {

  const boxComponent = !!inline ? "span" : "div";

  const componentProps = {
      ...rest,
      className: classNames({ srOnly: isHidden }, cx),
      "data-testid": testId,
  }
    const Component = ({...componentProps}: React.HTMLAttributes<HTMLDivElement | HTMLSpanElement>) =>
        React.createElement(boxComponent, componentProps, children);

    return (
    <Component
      {...componentProps}
    >
      {children}
    </Component>
  );
}
