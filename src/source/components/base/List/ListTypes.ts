import React from "react";
import { BaseProps, Orientation } from "@/source/types";

export type ListItemRoles = "listitem" | "menuitem" | "treeitem";
export type ListRoles = "list" | "menu" | "tree";

/**
 * Used for both Ordered and unordered lists
 */
export interface ListProps extends BaseProps {
  /**
   * The children of the component.
   */
  children?: React.ReactNode;

  /**
   * default (false) when true, produces an <ol> instead of a <ul>
   */
  ordered?: boolean;

  /**
   * horizontal | vertical
   */
  orientation?: Orientation;
  /**
   *  Ref<HTMLUListElement|HTMLOListElement | null>
   */
  ref?: never;

  /**
   *     "list" (default) | "menu" | "tree"
   */
  role?: ListRoles;
}

export interface ListItemProps extends BaseProps {
  /**
   * The children of the component.
   */
  children: React.ReactNode;

  /**
   * Unique key for each item
   */
  key?: string;

  /**
   * RefObject<HTMLLIElement | null>
   */
  ref?: React.RefObject<HTMLLIElement | null>;

  /**
   * "listItem" (default)  | "menuitem" | "treeitem"
   */
  role?: ListItemRoles;
}
