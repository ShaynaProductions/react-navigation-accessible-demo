"use client";
import { JSX, useRef, useState } from "react";
import { Box, Button, Navigation, ParentElementType } from "@/ui/components";
import {
  ClickAwayListener,
  FocusableElement,
  getFocusableElement,
} from "@/ui/utilities";

export function MobileNavigation({ children, label, ...rest }): JSX.Element {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<ParentElementType>(null);

  const closeNavigation = () => {
    if (open) {
      setOpen(false);
    }
  };

  const handleFocus = () => {
    closeNavigation();
  };

  const handlePress = () => {
    /* istanbul ignore else */
    if (!open) {
      const nextEl = getFocusableElement(
        buttonRef.current,
        "next",
      ) as FocusableElement;
      nextEl.focus({ preventScroll: true });
    }
    setOpen(!open);
  };

  const buttonProps = {
    ref: buttonRef,
    "aria-expanded": open,
    "aria-controls": "mobile-menu",
    isOpen: open,
    onFocus: handleFocus,
    onPress: handlePress,
    id: "mobile",
  };

  const navigationProps = {
    ...rest,
    id: "mobile-menu",
    cx: "mobile",
    isOpen: open,
    parentRef: buttonRef,
    passthrough: !open,
    label: label,
  };
  return (
    <ClickAwayListener onClickAway={closeNavigation}>
      <Box cx="mobile-navigation">
        <Button {...buttonProps}>Menu</Button>

        <Navigation {...navigationProps}>{children}</Navigation>
      </Box>
    </ClickAwayListener>
  );
}
