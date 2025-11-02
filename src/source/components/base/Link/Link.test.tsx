import React, { act } from "react";
import { axe, render } from "@/test";
import { LinkProps } from "./LinkTypes";
import { InternalLink as Link } from "./Link";

const TEST_ID = "LinkFacade";
const label = "Internal Link";

const renderLink = (props: Partial<LinkProps>) => {
    return render(
        <Link href="#" testId={TEST_ID} {...props}>
            {label}
        </Link>,
    );
};

describe("<Link />", () => {
    it("1.6.1 should be WCAG compliant", async () => {
        const optProps = { testId: undefined };
        const { container } = await act(() => renderLink(optProps));

        const results = await act(() => axe(container));

        expect(results).toHaveNoViolations();
    });

    it("2.4.2 should not have an href when disabled", () => {
        const optProps = { isDisabled: true };
        const { getByTestId } = renderLink(optProps);

        const link = getByTestId(TEST_ID);
        expect(link).toBeInTheDocument();

        expect(link).toHaveAttribute("aria-disabled", "true");
        expect(link).toHaveAttribute("href", "");
    });

    it("2.4.2 should have an href when enabled", () => {
        const optProps = {};
        const { getByRole } = renderLink(optProps);

        const link = getByRole("link");
        expect(link).toBeInTheDocument();

        expect(link).not.toHaveAttribute("aria-disabled", "true");
        expect(link).toHaveAttribute("href");
    });

    it("1.6.4 should announce it opens in a new window when a target is set", () => {
        const optProps = { target: "glossary" };
        const { getByRole } = renderLink(optProps);

        const link = getByRole("link");
        expect(link).toBeInTheDocument();
        expect(link).toHaveTextContent("opens in a new tab");
    });
   
    it("1.6.4 should announce it opens in a new window when openInNewTab is true", () => {
        const optProps = { openInNewTab: true };
        const { getByLabelText, getByRole, getByTestId } = renderLink(optProps);

        const link = getByTestId(`${TEST_ID}`);
        expect(link).toBeInTheDocument();

        const svg = getByRole("img");
        expect(svg).toBeInTheDocument();

        expect(link).toHaveAttribute("target", "_blank");
        const icon = getByLabelText("opens in a new tab");
        expect(icon).toBeInTheDocument();
    });

    it("1.6.4 should announce it opens in a new tab when openInNewTab is true, even if the icon is not available", () => {
        const optProps = {
            openInNewTab: true,
            suppressNewIcon: true,
        };
        const { queryAllByRole, getByText, getByTestId } = renderLink(optProps);

        const link = getByTestId(`${TEST_ID}`);
        expect(link).toBeInTheDocument();

        expect(link).toHaveAttribute("target", "_blank");

        const svg = queryAllByRole("img");
        expect(svg).toHaveLength(0);

        const wording = getByText("opens in a new tab");
        expect(wording).toBeInTheDocument();
    });
});
