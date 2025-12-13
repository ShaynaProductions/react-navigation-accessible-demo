import React from "react";
import {LinkProps, ListProps} from "@/ui/components";
import {BaseProps, Orientation} from "@/ui/types";

export type FocusableElementType = HTMLAnchorElement | HTMLButtonElement;
export type ParentElementType = HTMLButtonElement | null;

export interface NavigationProps extends Omit<BaseProps, "id"> {
    children: React.ReactNode;
    id: string;
    label: string;
    isOpen?: boolean;
    orientation?: Orientation;
    parentRef?: React.RefObject<ParentElementType>;
}

export interface NavigationLinkProps extends BaseProps, Omit<LinkProps, "children"> {
    href: string;
    id: string;
    label: string;
    menu?: NavigationLinkProps[];
}

export interface NavigationListProps extends Omit<BaseProps, "id">, ListProps {
    id: string;
    isOpen: boolean;
    parentRef?: React.RefObject<ParentElementType>;
}

export interface SubNavigationProps extends Omit<NavigationLinkProps, "href" | "id"> {
    children: React.ReactNode;
    id: string;
}

export interface NavigationWrapperProps extends Omit<BaseProps, "testid"> {
    children: React.ReactNode;
    isOpen: boolean;
    label: string;
    parentRef?: React.RefObject<ParentElementType>;
}