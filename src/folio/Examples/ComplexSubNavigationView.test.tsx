import React, {act} from "react";
import fs from "fs";
import {axe, render} from "@/test";
import {ComplexSubNavigationView} from "./ComplexSubNavigationView";

const jsonObj = fs.readFileSync(
    "public/__static__/complexStructureWithSubNav.json",
    "utf8",
);
const nav = JSON.parse(jsonObj);

const renderView = () => {
    return render(<ComplexSubNavigationView navigation={nav}/>);
}

describe("ComplexSubNavigationView", () => {
    it("passes auto-wcag", async () => {
        const {container} = renderView();
        const results = await act(() => axe(container));
        expect(results).toHaveNoViolations();
    });
})