export type FocusEvents = "focusin" | "focusout";
export type MouseEvents = "click" | "mousedown" | "mouseup";
export type TouchEvents = "touchstart" | "touchend";
export type Events = FocusEvent | KeyboardEvent | MouseEvent | TouchEvent;

export const eventMapping = {
  click: "onClick",
  focusin: "onFocus",
  focusout: "onBlur",
  KEY_DOWN: "onKeyDown",
  mousedown: "onMouseDown",
  mouseup: "onMouseUp",
  touchstart: "onTouchStart",
  touchend: "onTouchEnd",
};

export const Keys = Object.freeze({
  DOWN: "ArrowDown",
  END: "End",
  ENTER: "Enter",
  ESC: "Escape",
  HOME: "Home",
  LEFT: "ArrowLeft",
  RIGHT: "ArrowRight",
  SPACE: " ",
  TAB: "Tab",
  UP: "ArrowUp",
});
