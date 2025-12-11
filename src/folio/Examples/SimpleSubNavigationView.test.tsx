import React, {act} from "react";
import fs from "fs";
import {axe, render, userEvent} from "@/test";
import {SimpleSubNavigationView} from "@/folio";

const jsonObj = fs.readFileSync(
    "public/__static__/simpleStructureWithSubNav.json",
    "utf8",
);
const nav = JSON.parse(jsonObj);

const renderView = () => {
    return render(<SimpleSubNavigationView navigation={nav} />);
}

describe("SimpleSubNavigationView", () => {
    it("passes auto-wcag", async () => {
        const {container} = renderView();
        const results = await act(() => axe(container));
        expect(results).toHaveNoViolations();
    });

    it('opens and closes the navigation component', async () => {
        const {getByRole} = renderView();
        const menuButton = getByRole("button", {name: "Menu"})
        expect(menuButton).toBeInTheDocument();
        expect(menuButton).toHaveAttribute("aria-expanded", "false");
        await userEvent.click(menuButton);
        expect(menuButton).toHaveAttribute("aria-expanded", "true");
    })
})