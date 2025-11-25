import React, {act} from "react";
import {axe, render, userEvent} from "@/test";

import Button from "./Button";
import {ButtonProps} from "./ButtonTypes";

const buttonLabel = "Press Me";

const renderButton = (optProps: Partial<ButtonProps>) => {
    return render(
        <Button {...optProps}>
            {buttonLabel}
        </Button>,
    );
};

describe("<Button />", () => {
    it("loads", () => {
        const optProps = {};
        const {getByRole} = renderButton(optProps);

        const button = getByRole("button", {name: buttonLabel});
        expect(button).toBeInTheDocument();
    });

    it("should be WCAG compliant", async () => {
        const optProps = {};
        const {container} = renderButton(optProps);

        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });

    it("should pass WCAG when disabled", async () => {
        const optProps = {isDisabled: true};
        const {container} = renderButton(optProps);

        const results = await act(() => axe(container));
        expect(results).toHaveNoViolations();
    });

    it("5.2.1 handles a press event via pointer and keyboard", async () => {
        const handlePress = jest.fn();
        const optProps = {onPress: handlePress};
        const {getByRole} = renderButton(optProps);

        const button = getByRole("button", {name: buttonLabel});
        expect(button).toBeInTheDocument();

        await userEvent.click(button);
        expect(handlePress).toHaveBeenCalled();
        await userEvent.keyboard("{Enter}");
        expect(handlePress).toHaveBeenCalledTimes(2);
        await userEvent.click(button);
        expect(button).toHaveFocus();
        await userEvent.keyboard(" ");
        expect(handlePress).toHaveBeenCalledTimes(4);
    });



    it("5.2.2 does not handle a press event when disabled", async () => {
        const handlePress = jest.fn();
        const optProps = {onPress: handlePress, isDisabled: true};
        const {getByRole} = renderButton(optProps);

        const button = getByRole("button", {name: buttonLabel});
        expect(button).toBeInTheDocument();

        await userEvent.click(button);

        expect(handlePress).not.toHaveBeenCalled();
    });
    it("5.2.2 when disabled, an aria-disabled attribute should be in the button", () => {
        const optProps = {isDisabled: true};
        const {getByRole} = renderButton(optProps);

        expect(getByRole("button", {name: buttonLabel})).toHaveAttribute(
            "aria-disabled",
            "true",
        );
    });
});
