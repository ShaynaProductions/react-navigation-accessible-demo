"use client";

import {KeyboardEvent, useCallback, useEffect, useRef, useState} from "react";
import {Button, ButtonProps, Icon, IconProps, ListItem} from "@/ui/components";
import {usePrevious} from "@/ui/hooks";
import {ChevronRightIcon} from "@/ui/svg";
import {Keys} from "@/ui/utilities";

import {FocusableElementType, NavigationListProps, ParentElementType, SubNavigationProps} from "../NavigationTypes";
import {useNavigation, useNavigationList} from "../hooks";
import {_handleKeyDown} from "../utilities";
import NavigationList from "./NavigationList";

export function SubNavigation({
    children,
    cx,
    id,
    label,
    testId,
}: SubNavigationProps) {
    const {
        currentListItems,
        parentRef,
        registerListItem,
        setFirstFocus,
        setLastFocus,
        setNextFocus,
        setPreviousFocus
    } = useNavigationList();
    const {registerSubNavigation, setListItems} = useNavigation();

    const buttonRef = useRef<ParentElementType>(null);
    const prevButtonRef = usePrevious(buttonRef);
    const [isSubListOpen, setIsSubListOpen] = useState<boolean>(false);

    useEffect(() => {
        const buttonEl = buttonRef.current as FocusableElementType;
        registerListItem(buttonEl);
        registerSubNavigation(buttonEl);
    }, [buttonRef, prevButtonRef, registerListItem, registerSubNavigation]);

    useEffect(() => {
        setListItems(currentListItems, parentRef?.current || null);
    }, [currentListItems, parentRef, setListItems]);

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const buttonEl = buttonRef.current as FocusableElementType;

        switch (e.key) {
            case Keys.HOME:
            case Keys.END:
            case Keys.LEFT:
            case Keys.RIGHT:
                e.preventDefault();
                break;
        }

        _handleKeyDown(e, buttonEl, setFirstFocus, setLastFocus, setNextFocus, setPreviousFocus);
    }, [setFirstFocus, setLastFocus, setNextFocus, setPreviousFocus]);

    const handlePress = () => {
        setIsSubListOpen(!isSubListOpen);
    }

    const buttonProps: ButtonProps = {
        "aria-controls": id,
        "aria-expanded": isSubListOpen,
        "aria-label": `${label} navigation`,
        onKeyDown: handleKeyDown,
        onPress: handlePress,
        ref: buttonRef,
        testId: testId,
    };

    const iconProps: IconProps = {
        IconComponent: ChevronRightIcon,
        isSilent: true,
    }

    const navigationListProps: NavigationListProps = {
        id: id,
        isOpen: isSubListOpen,
        parentRef: buttonRef,
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