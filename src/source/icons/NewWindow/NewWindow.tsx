import { CSSProperties } from "react";
import { AiOutlineExport } from "react-icons/ai";
import classNames from "classnames";
import { SvgProps } from "@/source/types";
import {returnTrueElementOrUndefined} from "@/source/utilities";

export const NewWindowIcon = ({
      cx,
      label,
      size,
      testId,
  }: Partial<SvgProps>) => {
    const svgProps = {
        "aria-hidden": returnTrueElementOrUndefined(!label),
        "aria-label": returnTrueElementOrUndefined(!!label, label),
        className: classNames("icon", cx),
        "data-testid": testId,
        role: "img",
        style: { "--component-item-size": size } as CSSProperties,
    };
    return (
        <>
            <AiOutlineExport {...svgProps} />
        </>
    );
};
