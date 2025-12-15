"use client";

import {KeyboardEvent, useCallback, useEffect, useRef, useState} from "react";
import {Button, ButtonProps, Icon, IconProps, ListItem} from "@/ui/components";
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
        registerItemInList,
        setFirstFocus,
        setLastFocus,
        setNextFocus,
        setPreviousFocus,
        setSpecificFocus
    } = useNavigationList();
    const {getNextByButton, getPreviousByButton,  registerSubNavigation, setListItems} = useNavigation();

    const buttonRef = useRef<ParentElementType>(null);
    const [isSubListOpen, setIsSubListOpen] = useState<boolean>(false);


    useEffect(() => {
        const buttonEl = buttonRef.current as FocusableElementType;
        registerItemInList(buttonEl);
        registerSubNavigation(isSubListOpen, buttonEl);
       
    }, [currentListItems, isSubListOpen, parentRef, registerItemInList, registerSubNavigation, setListItems]);

    useEffect(() => {
        setListItems(currentListItems, parentRef.current)
    },[currentListItems, parentRef, setListItems])

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        const buttonEl = buttonRef.current as FocusableElementType;

        switch (e.key) {
            case Keys.HOME:
            case Keys.END:
            case Keys.LEFT:
            case Keys.RIGHT:
            case Keys.UP:
            case Keys.DOWN:
                e.preventDefault();
                break;
        }

        // common between link and button
        _handleKeyDown(e, buttonEl, setFirstFocus, setLastFocus, setNextFocus, setPreviousFocus);
        // specific to button.
        switch (e.key) {
            case Keys.UP:
                const  prevFocusableEl =  getPreviousByButton( buttonEl);
                /* istanbul ignore else */
                if (prevFocusableEl) {
                    setSpecificFocus(prevFocusableEl);
                }
                break;
            case Keys.DOWN:
                const nextFocusableEl = getNextByButton(buttonEl, isSubListOpen);
                /* istanbul ignore else */
                if (nextFocusableEl) {
                    setSpecificFocus(nextFocusableEl);
                }
                break;
        }

    }, [getNextByButton, getPreviousByButton, isSubListOpen, setFirstFocus, setLastFocus, setNextFocus, setPreviousFocus, setSpecificFocus]);

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
        type:"button"
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