import React, {act} from "react";
import fs from "fs";
import {axe, render} from "@/test";
import SimpleLinksView from "./SimpleLinksView";

const jsonObj = fs.readFileSync(
    "public/__static__/simpleStructure.json",
    "utf8",
);
const nav = JSON.parse(jsonObj);

const renderView = () => {
  return render(<SimpleLinksView navigation={nav}/>);
}

describe("SimpleLinksView", () => {
    it("passes auto-wcag", async () => {
        const {container} = renderView();
        const results = await act(() => axe(container));
        expect(results).toHaveNoViolations();
    });
})