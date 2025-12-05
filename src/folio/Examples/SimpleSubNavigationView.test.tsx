import React, {act} from "react";
import fs from "fs";
import {axe, render} from "@/test";
import {SimpleSubNavigationView} from "./SimpleSubNavigationView";

const jsonObj = fs.readFileSync(
    "public/__static__/simpleStructureWithSubNav.json",
    "utf8",
);
const nav = JSON.parse(jsonObj);

const renderView = () => {
    return render(<SimpleSubNavigationView navigation={nav}/>);
}

describe("SimpleSubNavigationView", () => {
    it("passes auto-wcag", async () => {
        const {container} = renderView();
        const results = await act(() => axe(container));
        expect(results).toHaveNoViolations();
    });
})