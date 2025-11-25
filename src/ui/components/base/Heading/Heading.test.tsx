import { axe, render } from "@/test";

import Heading from "./Heading";
import { HeadingProps } from "./HeadingTypes";

const headingText = "Read all about it.";

const renderHeading = (optProps: HeadingProps) => {
    return render(<Heading {...optProps}>{headingText}</Heading>);
};

describe("<Heading />", () => {
    it("should be WCAG compliant", async () => {
        const optProps = { headingLevel: 1 };
        const { container } = renderHeading(optProps);

        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });

    it("should return the correct heading for the level passed", () => {
        const optProps = { headingLevel: 2 };
        const { getByRole } = renderHeading(optProps);

        const component = getByRole("heading", { level: 2 });

        expect(component).toBeInTheDocument();
    });

    it("6.1.1 should return an h6 if heading isn't h1-h6", () => {
        const optProps = {
            headingLevel: 7,
        };
        const { getByRole } = renderHeading(optProps);

        const text = getByRole("heading", { level: 6 });

        expect(text).toBeInTheDocument();
    });
    it("should render as an h2 when no headinglevel is passed", () => {
        const { getByRole } = renderHeading({});
        const component = getByRole("heading", { level: 2 });

        expect(component).toBeInTheDocument();
    });

    it("should display with an specific variant class when one is passed in", () => {
        const { container, getByRole } = renderHeading({
            headingLevel: 2,
            variant: "h3",
        });

        const component = getByRole("heading", { level: 2 });

        expect(component).toBeInTheDocument();

        expect(container.getElementsByClassName("h3")).toHaveLength(1);
    });
});
