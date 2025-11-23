import { BaseProps } from "@/ui/types";
import { IconType } from "react-icons";

export interface IconProps extends BaseProps {
  /**
   * react-icon to pass through and display.
   */
  IconComponent: IconType;

  /**
   *  default: undefined.
   *  Set to true when hiding from a screen reader
   *  If true, may not include a label.
   *
   */
  isSilent?: boolean;
  /**
   * For any item not identified as silent, a label is required.
   * an error will occur when neither a label or isSilent is passed.
   */
  label?: string;
}
