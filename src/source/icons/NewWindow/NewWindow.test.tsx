import { render, axe } from "@/test";
import { NewWindowIcon } from "@/source/icons";
import { SvgProps } from "@/source/types";

const TEST_ID = "NewWindow";

const renderNewWindow = (optProps: SvgProps) => {
  return render(<NewWindowIcon testId={TEST_ID} {...optProps}></NewWindowIcon>);
};

describe("<NewWindow />", () => {
  it("should be WCAG compliant", async () => {
    const { container } = renderNewWindow({ label: "New Window", size: 16 });

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should return a default size of medium when nothing is passed", () => {
    const { getByTestId } = renderNewWindow({});

    const component = getByTestId(TEST_ID);
    expect(component).toBeInTheDocument();
  });
  it("should return aria-hidden undefined when a label is passed in", () => {
    const { getByTestId } = renderNewWindow({
      label: "label",
    });

    const component = getByTestId(TEST_ID);
    expect(component).toBeInTheDocument();

    expect(component).not.toHaveAttribute("aria-hidden");
  });
});
