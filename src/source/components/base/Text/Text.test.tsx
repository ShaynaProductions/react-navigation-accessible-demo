import { render, axe } from "@/test";
import Text from "./Text";
import { TextProps } from "@/source/components/base";

const TEST_ID = "Text";

const renderText = (optProps: TextProps) => {
    return render(<Text testId={TEST_ID} {...optProps}>Hello World</Text>);
};

describe("<Text />", () => {
    it("2.1.1 should be WCAG compliant as a Phrase control", async () => {
        const optProps = { isInline: true, testId: TEST_ID };
        const { container } = renderText(optProps);

        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });

    it("2.1.1 should be WCAG compliant as a Flow control", async () => {
        const optProps = {};
        const { container } = renderText(optProps);

        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });

    it("2.1.1 should load as inline", () => {
        const optProps = { isInline: true, testId: TEST_ID };
        const { getByTestId } = renderText(optProps);

        expect(getByTestId(TEST_ID)).toBeInTheDocument();
    });

    it("1.1.1 should be visually hidden when hidden is true", () => {
        const optProps = { isHidden: true, testId: TEST_ID };
        const { container } = renderText(optProps);

        expect(container.getElementsByClassName("srOnly")).toHaveLength(1);
    });
});
