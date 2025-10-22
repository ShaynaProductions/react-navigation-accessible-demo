import { returnTrueElementOrUndefined } from "@/source/utilities";
import { IconProps } from "./IconTypes";

export default function Icon({
  cx,
  IconComponent,
  isSilent,
  label,
  testId,
}: IconProps) {
  let proceed = true;
  if (
    process.env.NODE_ENV === "test" ||
    process.env.NEXT_PUBLIC_ENV === "local"
  ) {
    if (!isSilent && !label) {
      console.error(
        "Dev Error: Label must be provided when isSilent is not set.",
      );
      proceed = false;
    }

    if (isSilent && label) {
      console.error(
        "Dev Error: Label may not be defined when isSilent is set to true.",
      );
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
