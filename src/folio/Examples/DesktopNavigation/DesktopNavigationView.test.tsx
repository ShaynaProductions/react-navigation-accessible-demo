import React, { act } from "react";
import fs from "fs";
import { axe, render } from "@/test";
import { DesktopNavigationView } from "./DesktopNavigationView";

const jsonObj = fs.readFileSync(
  "public/__static__/complexStructureWithSubNav.json",
  "utf8",
);
const nav = JSON.parse(jsonObj);

const renderView = () => {
  return render(<DesktopNavigationView navigation={nav} />);
};

describe("DesktopNavigationView", () => {
  it("passes auto-wcag", async () => {
    const { container } = renderView();
    const results = await act(() => axe(container));
    expect(results).toHaveNoViolations();
  });
});
