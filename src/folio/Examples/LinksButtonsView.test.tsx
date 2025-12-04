import React, {act} from "react";
import fs from "fs";
import {axe, render} from "@/test";
import LinksButtonsView from "./LinksButtonsView";

const jsonObj = fs.readFileSync(
    "public/__static__/simpleStructure.json",
    "utf8",
);

const nav = JSON.parse(jsonObj);

const renderView = () => {
    return render(<LinksButtonsView navigation={nav}/>);
}

describe("LinksButtonsView", () => {
    it("passes auto-wcag", async () => {
        const {container} = renderView();
        const results = await act(() => axe(container));
        expect(results).toHaveNoViolations();
    });
})