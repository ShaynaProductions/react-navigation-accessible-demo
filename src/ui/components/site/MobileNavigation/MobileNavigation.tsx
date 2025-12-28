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
    setOpen(false);
  };

  const handleFocus = () => {
    closeNavigation();
  };

  const handlePress = () => {
    setOpen(!open);
    /* istanbul ignore else */
    if (!open) {
      const nextEl = getFocusableElement(
        buttonRef.current,
        "next",
      ) as FocusableElement;
      nextEl.focus({ preventScroll: true });
    }
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
  return (
    <ClickAwayListener onClickAway={closeNavigation}>
      <Box cx="mobile-navigation">
        <Button {...buttonProps}>Menu</Button>
        <Navigation
          id="mobile-menu"
          cx="mobile"
          isOpen={open}
          parentRef={buttonRef}
          label={label}
          {...rest}
        >
          {children}
        </Navigation>
      </Box>
    </ClickAwayListener>
  );
}
