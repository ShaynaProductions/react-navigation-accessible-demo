"use client";

import {useState} from "react";
import {Button, ButtonProps, Icon, IconProps, ListItem} from "@/ui/components";
import {ChevronRightIcon} from "@/ui/svg";
import NavigationList from "./NavigationList";
import {NavigationListProps, SubNavigationProps} from "../NavigationTypes";

export function SubNavigation({
    children,
    cx,
    id,
    label,
    testId,
}: SubNavigationProps) {
    const [isSubListOpen, setIsSubListOpen] = useState<boolean>(false);

    const handlePress = () => {
        setIsSubListOpen(!isSubListOpen);
    }

    const buttonProps: ButtonProps = {
        "aria-controls": id,
        "aria-expanded": isSubListOpen,
        "aria-label": `${label} navigation`,
        onPress: handlePress,
        testId: testId,
    };

    const iconProps: IconProps = {

        IconComponent: ChevronRightIcon,
        isSilent: true,
    }

    const navigationListProps:NavigationListProps = {
        id: id,
        isOpen: isSubListOpen,
        testId: testId && `${testId}-list`,
    };
    return (
        <ListItem key={id} cx={cx}>
            <Button {...buttonProps}>
                {label}
                <Icon {...iconProps} />
            </Button>
            <NavigationList key={`list-${id}`} {...navigationListProps}>
                {children}
            </NavigationList>
        </ListItem>
    )
}