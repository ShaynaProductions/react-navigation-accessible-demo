import {axe, render} from "@/test";
import {NewWindowIcon} from "@/ui/svg";
import {IconProps} from "./IconTypes";
import Icon from "./Icon";

const renderIcon = (optProps: Omit<IconProps, "IconComponent">) => {
    return render(<Icon IconComponent={NewWindowIcon} {...optProps} />);
};

describe("Icon", () => {
    it("4.1.1 should be WCAG compliant", async () => {
        const {container, getByRole} = renderIcon({label: "New Window"});
        expect(getByRole("img")).toBeInTheDocument();

        const results = await axe(container);

        expect(results).toHaveNoViolations();
    });

    it("4.1.3 should not render when label is not passed in", () => {
        const logSpy = jest.spyOn(console, "error");
        const {queryByRole} = renderIcon({});
        const svgImage = queryByRole("img");
        expect(svgImage).not.toBeInTheDocument();
        expect(logSpy).toHaveBeenCalledWith(
            "Dev Error - WCAG 1.1.1: Label must be provided when isSilent is not set.",
        );
    });
    it("4.1.3 should not render when both isSilent and label are passed in", () => {
        const logSpy = jest.spyOn(console, "error");
        const {queryByRole} = renderIcon({isSilent: true, label: "Silent"});
        const svgImage = queryByRole("img");
        expect(svgImage).not.toBeInTheDocument();
        expect(logSpy).toHaveBeenCalledWith(
            "Dev Error: WCAG 1.1.1 Label may not be defined when isSilent is set to true.",
        );
    });

    it("4.1.2 should render with aria-hidden when isSilent is true", () => {
        const {getByRole} = renderIcon({isSilent: true});
        const svgImage = getByRole("img", {hidden: true});
        expect(svgImage).toBeInTheDocument();
    });
});
