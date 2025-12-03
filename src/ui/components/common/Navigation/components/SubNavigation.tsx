"use client";

import {KeyboardEvent, use, useCallback, useEffect, useRef, useState} from "react";
import {Button, ButtonProps, Icon, IconProps, ListItem} from "@/ui/components";
import {usePrevious} from "@/ui/hooks";
import {ChevronRightIcon} from "@/ui/svg";
import {Keys, returnTrueElementOrUndefined} from "@/ui/utilities";

import {FocusableElementType, NavigationListProps, ParentElementType, SubNavigationProps} from "../NavigationTypes";
import {NavigationListContext} from "../providers/NavigationListProvider";
import NavigationList from "./NavigationList";

export function SubNavigation({
    children,
    cx,
    id,
    label,
    testId,
}: SubNavigationProps) {
    const navigationListContextObject = use(NavigationListContext);

    const {registerListItem, setFirstFocus, setLastFocus, setNextFocus, setPreviousFocus} = returnTrueElementOrUndefined(!!navigationListContextObject, navigationListContextObject);

    const buttonRef = useRef<ParentElementType>(null);
    const prevButtonRef = usePrevious(buttonRef);

    const [isSubListOpen, setIsSubListOpen] = useState<boolean>(false);


    useEffect(() => {
        if (buttonRef !== prevButtonRef && buttonRef.current) {
            registerListItem(buttonRef.current);
        }
    }, [buttonRef, prevButtonRef, registerListItem]);

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
        switch (e.key) {
            case Keys.HOME:
                setFirstFocus();
                break;
            case Keys.END:
                setLastFocus();
                break;
            case Keys.LEFT:
                setPreviousFocus(buttonEl);
                break;
            case Keys.RIGHT:
                setNextFocus(buttonEl);
                break;
        }

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