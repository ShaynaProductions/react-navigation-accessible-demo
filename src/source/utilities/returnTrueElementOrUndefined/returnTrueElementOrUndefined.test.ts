import { returnTrueElementOrUndefined } from "./returnTrueElementOrUndefined";

describe("returnTrueElementOrUndefined", () => {
  it("returns true when a true boolean is passed in", () => {
    const returnValue = returnTrueElementOrUndefined(true);
    expect(returnValue).toBe(true);
  });
  it("returns undefined when the item being passed in is not truthy", () => {
    const returnValue = returnTrueElementOrUndefined(false);
    expect(returnValue).not.toBeDefined();
  });

  it("returns a string when a true boolean and a string are passed in", () => {
    const returnValue = returnTrueElementOrUndefined(true, "stringValue");
    expect(returnValue).toBe("stringValue");
  });

  it("returns an object when a true boolean and object are passed in", () => {
    const returnValue = returnTrueElementOrUndefined(true, {
      id: "stringValue",
    });
    expect(typeof returnValue).toBe("object");
  });
});
