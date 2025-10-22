import { NewWindowIcon } from "@/source/svg";
import { render, axe } from "@/test";
import { IconProps } from "./IconTypes";
import Icon from "./Icon";

process.env.MY_TEST_VARIABLE = "test";

const renderIcon = (optProps: Omit<IconProps, "IconComponent">) => {
  return render(<Icon IconComponent={NewWindowIcon} {...optProps} />);
};

describe("Icon", () => {
  it("should be WCAG compliant", async () => {
    const { container, getByRole } = renderIcon({ label: "New Window" });
    expect(getByRole("img")).toBeInTheDocument();

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should not render when label is not passed in", () => {
    const logSpy = jest.spyOn(console, "error");
    const { queryByRole } = renderIcon({});
    const svgImage = queryByRole("img");
    expect(svgImage).not.toBeInTheDocument();
    expect(logSpy).toHaveBeenCalledWith(
      "Dev Error: Label must be provided when isSilent is not set.",
    );
  });
  it("should not render when both isSilent and label are passed in", () => {
    const logSpy = jest.spyOn(console, "error");
    const { queryByRole } = renderIcon({ isSilent: true, label: "Silent" });
    const svgImage = queryByRole("img");
    expect(svgImage).not.toBeInTheDocument();
    expect(logSpy).toHaveBeenCalledWith(
      "Dev Error: Label may not be defined when isSilent is set to true.",
    );
  });

  it("should render with aria-hidden when isSilent is true", () => {
    const { getByRole } = renderIcon({ isSilent: true });
    const svgImage = getByRole("img", { hidden: true });
    expect(svgImage).toBeInTheDocument();
  });
});
