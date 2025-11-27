import { returnTrueElementOrUndefined } from "@/ui/utilities";
import { IconProps } from "./IconTypes";

export default function Icon({
  cx,
  IconComponent,
  isSilent,
  label,
  testId,
}: IconProps) {
  let proceed = true;
    /* istanbul ignore else */
  if (
      /* istanbul ignore next */
    process.env.NODE_ENV === "test" ||
    process.env.NODE_ENV === "development"
  ) {
    if (!isSilent && !label) {
      console.error("Dev Error - WCAG 1.1.1: Label must be provided when isSilent is not set.");
      proceed = false;
    }

    if (isSilent && label) {
      console.error("Dev Error: WCAG 1.1.1 Label may not be defined when isSilent is set to true.");
      proceed = false;
    }
  }
  if (proceed) {
    const iconProps = {
      "aria-hidden": returnTrueElementOrUndefined(!!isSilent),
      "aria-label": label,
      className: cx,
      "data-testid": testId,
      role: "img",
    };

    return (
      <>
        <IconComponent {...iconProps} />
      </>
    );
  }
}
