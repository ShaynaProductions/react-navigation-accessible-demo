import fs from "fs";
import {act, axe, render, userEvent} from "@/test";
import {transformNavigation} from "../utilities/transformNavigation";
import {NavigationProps} from "../NavigationTypes";
import Navigation from "../components/Navigation";

const TEST_ID = "Navigation";

jest.mock("next/navigation", () => ({
    usePathname: () => "/#about",
}));

const renderNavigation = (
    filename: string,
    optProps: Partial<NavigationProps>,
) => {
    const jsonObj = fs.readFileSync(`public/__static__/${filename}.json`, "utf8");

    const navObject = JSON.parse(jsonObj);
    const navigation = transformNavigation(navObject, TEST_ID);

    return render(
        <Navigation id="nav-id" testId={TEST_ID} label="test" {...optProps}>
            {navigation}
        </Navigation>,
    );
};

describe("<Navigation /> Base Structure", () => {


    it("Simple Sub Navigation should be WCAG compliant", async () => {
        const optProps = {};
        const {container} = await act(() =>
            renderNavigation("simpleStructure", optProps),
        );

        const results = await act(() => axe(container));

        expect(results).toHaveNoViolations();
    });
    it("Complex Sub Navigation should be WCAG compliant", async () => {
        const optProps = {};
        const {container} = await act(() =>
            renderNavigation("ComplexStructureWithSubNav", optProps),
        );

        const results = await act(() => axe(container));

        expect(results).toHaveNoViolations();
    });

    it("4.1.3 should handle an OnClick", async () => {
        const optProps = {};
        const {getByTestId, getByLabelText} = await act(() =>
            renderNavigation("SimpleStructureWithSubNav", optProps),
        );
        const readButton = getByLabelText("Read navigation");
        const readList = getByTestId(`${TEST_ID}-read-menu-list`);

        expect(readButton).toBeInTheDocument();
        expect(readList).toBeInTheDocument();
        expect(readButton).not.toHaveAttribute("aria-expanded", "true");
        await userEvent.click(readButton);
        expect(readButton).toHaveAttribute("aria-expanded", "true");
    });

    it("3.1.2 should return an aria-current when the href matches the current url", () => {
        const optProps = {};
        const {getByRole} = renderNavigation("simpleStructureWithSubNav", optProps);
        const currentLink = getByRole("link", {name: "About"});
        expect(currentLink).toBeInTheDocument();
        expect(currentLink).toHaveAttribute("aria-current", "true");
    })
});
