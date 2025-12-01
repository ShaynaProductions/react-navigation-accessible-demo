import React, {act} from "react";
import fs from "fs";
import {axe, render} from "@/test";
import {BaseStructureView} from "./BaseStructureView";

const jsonObj = fs.readFileSync(
    "public/__static__/complexStructureWithSubNav.json",
    "utf8",
);

const renderBaseStructureView = () => {
    const nav = JSON.parse(jsonObj);
    return render(<BaseStructureView navigation={nav}/>);
}

describe("PrototypeView", () => {
    it("passes auto-wcag", async () => {
        const {container} = renderBaseStructureView();
        const results = await act(() => axe(container));
        expect(results).toHaveNoViolations();
    });
})