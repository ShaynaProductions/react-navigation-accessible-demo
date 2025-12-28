import { RefObject } from "react";
import { ParentElementType } from "@/ui/components";

export const setSubListWidth = (
  refObject: RefObject<ParentElementType>,
  setListWidth,
) => {
  setListWidth(refObject.current?.offsetWidth);
};


export const returnStoredParentEl = (
  parentRef?: RefObject<ParentElementType | null>,
) => {
  return parentRef?.current || null;
};
