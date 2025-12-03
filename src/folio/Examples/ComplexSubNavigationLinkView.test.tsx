import React, {act} from "react";
import fs from "fs";
import {axe, render} from "@/test";
import ComplexSubNavigationLinkView from "./ComplexSubNavigationLinkView";

const jsonObj = fs.readFileSync(
    "public/__static__/complexStructureWithSubNavLinks.json",
    "utf8",
);
const nav = JSON.parse(jsonObj);


const renderView = () => {
     return render(<ComplexSubNavigationLinkView navigation={nav}/>);
}

describe("ComplexSubNavigationLinkView", () => {
    it("passes auto-wcag", async () => {
        const {container} = renderView();
        const results = await act(() => axe(container));
        expect(results).toHaveNoViolations();
    });
})