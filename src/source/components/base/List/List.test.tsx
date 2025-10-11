import { axe, render } from "@/test";

import List from "./List";
import { ListItem } from "./ListItem";
import { ListProps, ListRoles } from "./ListTypes";
import { Heading } from "@/source/components";

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
    it("should be WCAG compliant", async () => {
        const optProps = {};
        const { container } = renderList(optProps);

        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });

    it("should render as non WCAG compliant", async () => {
        const optProps = {};
        const { container } = renderNonCompliantList(optProps);

        const results = await axe(container);

        expect(results).not.toHaveNoViolations();
    });

    it("should render as an ordered list", () => {
        const optProps = { ordered: true };
        const { getByTestId, getAllByRole } = renderList(optProps);

        expect(getByTestId(TEST_ID)).toBeInTheDocument();
        expect(getAllByRole("listitem")).toHaveLength(2);
    });

    it("should render as a menu", () => {
        const optProps = { role: "menu" as ListRoles };
        const { getByTestId, getAllByRole } = renderMenu(optProps);

        expect(getByTestId(TEST_ID)).toBeInTheDocument();
        expect(getAllByRole("menu")).toHaveLength(1);
    });
});
