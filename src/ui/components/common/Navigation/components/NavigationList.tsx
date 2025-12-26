"use client";

import { useRef } from "react";
import classNames from "classnames";
import { List, ListProps } from "@/ui/components";
import {
  NavigationListContextStoredValueProps,
  NavigationListProvider,
} from "../providers";
import { NavigationListProps, ParentElementType } from "./NavigationTypes";

export default function NavigationList({
  children,
  cx,
  id,
  isOpen,
  parentRef,
  ...rest
}: NavigationListProps) {
  const emptyRef = useRef<ParentElementType>(null);
  const listContext: NavigationListContextStoredValueProps = {
    parentRef: parentRef || emptyRef,
  };

  const listProps: ListProps = {
    ...rest,
    id,
    cx: classNames({ srOnly: !isOpen }, cx),
  };

  return (
    <NavigationListProvider value={listContext}>
      <List key={`list-${id}`} {...listProps}>
        {children}
      </List>
    </NavigationListProvider>
  );
}
