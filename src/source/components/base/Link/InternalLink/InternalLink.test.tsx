import React, { act } from "react";
import { axe, fireEvent, render } from "@/test";
import { InternalLinkProps } from "../LinkTypes";
import { InternalLink } from "./InternalLink";

const TEST_ID = "LinkFacade";
const label = "Internal Link";

const renderLink = (props: Partial<InternalLinkProps>) => {
    return render(
        <InternalLink href="#" testId={TEST_ID} {...props}>
            {label}
        </InternalLink>,
    );
};

describe("<InternalLink />", () => {
    it("should be WCAG compliant", async () => {
        const optProps = { testId: undefined };
        const { container } = await act(() => renderLink(optProps));

        const results = await act(() => axe(container));

        expect(results).toHaveNoViolations();
    });

    it("should not have an href when disabled", () => {
        const optProps = { isDisabled: true };
        const { getByTestId } = renderLink(optProps);

        const link = getByTestId(TEST_ID);
        expect(link).toBeInTheDocument();

        expect(link).toHaveAttribute("aria-disabled", "true");
        expect(link).toHaveAttribute("href", "");
    });

    it("should have an href when enabled", () => {
        const optProps = {};
        const { getByRole } = renderLink(optProps);

        const link = getByRole("link");
        expect(link).toBeInTheDocument();

        expect(link).not.toHaveAttribute("aria-disabled", "true");
        expect(link).toHaveAttribute("href");
    });

   
    it("should announce it opens in a new window when openInNewTab is true", () => {
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

    it("should announce it opens in a new tab when openInNewTab is true, even if the icon is not available", () => {
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
