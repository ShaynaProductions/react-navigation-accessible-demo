import {BaseProps} from "@/ui/types";
import {LinkProps, ListProps} from "@/ui/components";

export interface NavigationProps extends Omit<BaseProps, "id"> {
    children: React.ReactNode;
    id: string;
    label: string;
    isOpen?: boolean;
    orientation?: "horizontal" | "vertical";
}

export interface NavigationLinkProps extends BaseProps, Omit<LinkProps,"children"> {
    href: string;
    id: string;
    label: string;
    menu?: NavigationLinkProps[];
}

export interface NavigationListProps extends Omit<BaseProps, "id">, ListProps {
    id: string;
    isOpen: boolean;
}

export interface SubNavigationProps extends Omit<NavigationLinkProps, "href" | "id">{
    children: React.ReactNode;
    id: string;
}