import React, { act } from "react";
import { axe, fireEvent, render } from "@/test";
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
    it("6.1.1 should be WCAG compliant", async () => {
        const optProps = { testId: undefined };
        const { container } = await act(() => renderLink(optProps));

        const results = await act(() => axe(container));

        expect(results).toHaveNoViolations();
    });

    it("6.1.1 should have an href when one is passed in", () => {
        const optProps = {};
        const { getByRole } = renderLink(optProps);

        const link = getByRole("link");
        expect(link).toBeInTheDocument();

        expect(link).not.toHaveAttribute("aria-disabled", "true");
        expect(link).toHaveAttribute("href");
    });

    it("6.1.4 should announce it opens in a new window when a target is set", () => {
        const optProps = { target: "glossary" };
        const { getByRole } = renderLink(optProps);

        const link = getByRole("link");
        expect(link).toBeInTheDocument();
        expect(link).toHaveTextContent("opens in a new tab");
    });
   
    it("6.1.4 should announce it opens in a new window when openInNewTab is true", () => {
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

    it("6.1.4 should announce it opens in a new tab when openInNewTab is true, even if the icon is not available", () => {
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
    it("should not have a data-focused attribute when isFocused is false", () => {
        const optProps = { isFocused: false };

        const { getByTestId } = renderLink(optProps);

        const link = getByTestId(TEST_ID);
        expect(link).toBeInTheDocument();
        expect(link).not.toHaveAttribute("data-focused", "true");
    });

    it("should have a data-focused attribute when isFocused is true", () => {
        const optProps = { isFocused: true };

        const { getByTestId } = renderLink(optProps);

        const link = getByTestId(TEST_ID);
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("data-focused", "true");
    });

    it("should not have a data-hovered attribute when isHovered is false", () => {
        const optProps = { isHovered: false };

        const { getByTestId } = renderLink(optProps);

        const link = getByTestId(TEST_ID);
        expect(link).toBeInTheDocument();
        expect(link).not.toHaveAttribute("data-hovered", "true");
    });

    it("should have a data-hovered attribute when isHovered is true", () => {
        const optProps = { isHovered: true };

        const { getByTestId } = renderLink(optProps);

        const link = getByTestId(TEST_ID);
        expect(link).toBeInTheDocument();
        expect(link).toHaveAttribute("data-hovered", "true");
    });

    it("should handle an onFocusEvent when onFocus is triggered", () => {
        const handleOnFocus = jest.fn();

        const optProps = { onFocus: handleOnFocus };
        const { getByTestId } = renderLink(optProps);

        const link = getByTestId(TEST_ID);
        expect(link).toBeInTheDocument();

        fireEvent.focus(link);


        expect(handleOnFocus).toHaveBeenCalled();
    });
    it("should handle an onBlurEvent when onBlur is triggered", async () => {
        const handleOnBlur = jest.fn();
        const handleOnFocus = jest.fn();

        const optProps = {
            onFocus: handleOnFocus,
            onBlur: handleOnBlur,
        };
        const { getByTestId } = renderLink(optProps);

        const link = getByTestId(TEST_ID);
        expect(link).toBeInTheDocument();
        fireEvent.focus(link);
        expect(handleOnFocus).toHaveBeenCalled();

        fireEvent.blur(link);

        expect(handleOnBlur).toHaveBeenCalled();
    });

    it("should handle onHoverEvents when onMouseEnter is triggered", async () => {
        const handleMouseEnter = jest.fn();
        const handleMouseLeave = jest.fn();

        const optProps = {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave,
        };
        const { getByTestId } = renderLink(optProps);

        const link = getByTestId(TEST_ID);
        expect(link).toBeInTheDocument();

        fireEvent.mouseEnter(link);

        await act(() => {
            expect(handleMouseEnter).toHaveBeenCalled();
        });

        fireEvent.mouseLeave(link);
        await act(() => {
            expect(handleMouseLeave).toHaveBeenCalled();
        });
    });
});
