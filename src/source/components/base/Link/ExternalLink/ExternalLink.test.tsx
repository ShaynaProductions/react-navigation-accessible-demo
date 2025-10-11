import React, { act } from "react";
import { axe, render } from "@/test";
import { ExternalLink } from "./ExternalLink";
import { ExternalLinkProps } from "../LinkTypes";

const label = "Outside Link";

const renderExternalLink = (props: Partial<ExternalLinkProps>) => {
    return render(
        <ExternalLink href="#" {...props}>
            {label}
        </ExternalLink>,
    );
};

describe("<ExternalLink />", () => {
    it("should be WCAG compliant", async () => {
        const optProps = { testId: undefined, target: undefined };
        const { container } = await act(() => renderExternalLink(optProps));

        const results = await axe(container);
        expect(results).toHaveNoViolations();
    });

    it("should not have an href when disabled", () => {
        const optProps = { isDisabled: true };
        const { getByRole } = renderExternalLink(optProps);

        const link = getByRole("link");
        expect(link).toBeInTheDocument();

        expect(link).toHaveAttribute("aria-disabled", "true");
        expect(link).not.toHaveAttribute("href");
    });

    it("should have an href when enabled", () => {
        const optProps = {};
        const { getByRole } = renderExternalLink(optProps);

        const link = getByRole("link");
        expect(link).toBeInTheDocument();

        expect(link).not.toHaveAttribute("aria-disabled", "true");
        expect(link).toHaveAttribute("href");
    });
    it("should announce it opens in a new window when target is set", () => {
        const optProps = { target: "glossary" };
        const { getByRole } = renderExternalLink(optProps);

        const link = getByRole("link");
        expect(link).toBeInTheDocument();
        expect(link).toHaveTextContent("opens in a new tab");
    });

    it("should announce it opens in a new window when openInNewTab is true", () => {
        const optProps = { openInNewTab: true };
        const { getByLabelText, getByRole } = renderExternalLink(optProps);

        const link = getByRole("link");
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
        const { queryAllByRole, getByRole, getByText } =
            renderExternalLink(optProps);

        const link = getByRole("link");
        expect(link).toBeInTheDocument();

        expect(link).toHaveAttribute("target", "_blank");

        const svg = queryAllByRole("img");
        expect(svg).toHaveLength(0);

        const wording = getByText("opens in a new tab");
        expect(wording).toBeInTheDocument();
    });
});
