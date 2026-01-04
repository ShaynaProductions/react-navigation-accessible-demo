import React, {
  cloneElement,
  HTMLAttributes,
  JSX,
  Ref,
  useEffect,
  useRef,
} from "react";
import { useMergedRef } from "@/ui/hooks";

import {
  eventMapping,
  Events,
  FocusEvents,
  MouseEvents,
  TouchEvents,
} from "@/ui/utilities";

interface ClickAwayProps extends HTMLAttributes<HTMLElement> {
  onClickAway: (event: Events) => void;
  focusEvent?: FocusEvents;
  mouseEvent?: MouseEvents;
  touchEvent?: TouchEvents;
  children: JSX.Element;
  ref?: Ref<HTMLElement> | null;
}

const setCloneElement = (
  children,
  combinedRef,
  handleBubbledEvents,
  mappedFocusEvent,
  mappedMouseEvent,
  mappedTouchEvent,
) => {
  return cloneElement(children as JSX.Element, {
    ref: combinedRef,
    [mappedFocusEvent]: handleBubbledEvents(mappedFocusEvent),
    [mappedMouseEvent]: handleBubbledEvents(mappedMouseEvent),
    [mappedTouchEvent]: handleBubbledEvents(mappedTouchEvent),
  });
};

export const ClickAwayListener = ({
  children,
  onClickAway,
  ref,
  focusEvent = "focusin",
  mouseEvent = "click",
  touchEvent = "touchend",
}: ClickAwayProps) => {
  const domNode = useRef<HTMLElement | null>(null);
  const bubbledEventTarget = useRef<EventTarget | null>(null);
  const mountedRef = useRef(false);

  /* Prevents the bubbled event from triggering immediately */
  useEffect(() => {
    setTimeout(() => {
      mountedRef.current = true;
    }, 0);
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const handleBubbledEvents =
    (type: string) =>
    (event: Events): void => {
      bubbledEventTarget.current = event.target;

      const eventHandler = children?.props[type];
      if (eventHandler) {
        eventHandler(event);
      }
    };

  const combinedRef = useMergedRef(ref, domNode);

  useEffect(() => {
    /* istanbul ignore next*/
    const nodeDocument = domNode.current?.ownerDocument ?? document;

    const handleEvents = (event: Events) => {
      if (!mountedRef.current) {
        return;
      }

      if (
        (domNode.current && domNode.current.contains(event.target as Node)) ||
        bubbledEventTarget.current === event.target ||
        !nodeDocument.contains(event.target as Node)
      ) {
        return;
      }

      /* istanbul ignore else */
      if (onClickAway) {
        onClickAway(event);
      }
    };

    nodeDocument.addEventListener(focusEvent, handleEvents);
    nodeDocument.addEventListener(mouseEvent, handleEvents);
    nodeDocument.addEventListener(touchEvent, handleEvents);

    return () => {
      nodeDocument.removeEventListener(focusEvent, handleEvents);
      nodeDocument.removeEventListener(mouseEvent, handleEvents);
      nodeDocument.removeEventListener(touchEvent, handleEvents);
    };
  }, [
    domNode,
    bubbledEventTarget,
    focusEvent,
    mouseEvent,
    onClickAway,
    touchEvent,
  ]);

  const mappedFocusEvent = eventMapping[focusEvent];
  const mappedMouseEvent = eventMapping[mouseEvent];
  const mappedTouchEvent = eventMapping[touchEvent];

  return React.Children.only(
    setCloneElement(
      children,
      combinedRef,
      handleBubbledEvents,
      mappedFocusEvent,
      mappedMouseEvent,
      mappedTouchEvent,
    ),
  );
};
