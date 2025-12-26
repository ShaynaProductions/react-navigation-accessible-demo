import { JSX, useRef, useState } from "react";
import { Box, Button, Navigation, ParentElementType } from "@/ui/components";

export function MobileMenu({ children, label, ...rest }): JSX.Element {
  const menuRef = useRef<ParentElementType>(null);
  const [open, setOpen] = useState(false);
  const handlePress = () => {
    setOpen(!open);
  };
  const buttonProps = {
    ref: menuRef,
    "aria-expanded": open,
    "aria-controls": "mobile-menu",
    onPress: handlePress,
    id: "mobile",
  };
  return (
    <Box cx="simple">
      <Button {...buttonProps}>Menu</Button>
      <Navigation id="mobile-menu" parentRef={menuRef} label={label} {...rest}>
        {children}
      </Navigation>
    </Box>
  );
}
