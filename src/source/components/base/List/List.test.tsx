import {axe, render} from "@/test";

import List from "./List";
import {ListItem} from "./ListItem";
import {ListProps, ListRoles} from "./ListTypes";
import {Heading} from "@/source/components";
import {Orientation} from "@/source/types";

const TEST_ID = "List";

const renderList = (optProps: ListProps) => {
    return render(
        <List testId={TEST_ID} {...optProps}>
            <ListItem id="one" key="one">
                List Item One
            </ListItem>
            <ListItem id="two" key="two">
                List Item Two
            </ListItem>
        </List>,
    );
};

const renderMenu = (optProps: ListProps) => {
    return render(
        <List testId={TEST_ID} {...optProps}>
            <ListItem role="menuitem" id="one" key="one">
                List Item One
            </ListItem>
            <ListItem role="menuitem" id="two" key="two">
                List Item Two
            </ListItem>
        </List>,
    );
};

const renderNonCompliantList = (optProps: ListProps) => {
    return render(
        <List testId={TEST_ID} {...optProps}>
            <Heading level={2}>Invalid</Heading>
            <ListItem role="menuitem" id="one" key="one">
                List Item One
            </ListItem>
            <ListItem role="menuitem" id="two" key="two">
                List Item Two
            </ListItem>
        </List>,
    );
};

describe("<List />", () => {
    it("1.2.1 - should be WCAG compliant", async () => {
        const optProps = {};
        const { container } = renderList(optProps);

        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });

    it("1.2.1 should render as non WCAG compliant", async () => {
        const optProps = {};
        const { container } = renderNonCompliantList(optProps);

        const results = await axe(container);

        expect(results).not.toHaveNoViolations();
    });

    it("1.2.1 should render as a vertical ordered list", () => {
        const optProps = { isOrdered: true };
        const { getByTestId, getAllByRole } = renderList(optProps);

        const orderedList =  getByTestId(TEST_ID);
        expect(orderedList).toBeInTheDocument();
        expect(getAllByRole("listitem")).toHaveLength(2);
        expect(orderedList).toHaveAttribute("data-orientation","vertical");
    });

    it("1.2.2 should render as a horizontal menu", () => {
        const optProps = { role: "menu" as ListRoles, orientation: "horizontal" as Orientation };
        const { getByTestId, getAllByRole } = renderMenu(optProps);
        const menu = getByTestId(TEST_ID);
        expect(menu).toBeInTheDocument();
        expect(getAllByRole("menu")).toHaveLength(1);
        expect(menu).toHaveAttribute("data-orientation", "horizontal");

    });
});
