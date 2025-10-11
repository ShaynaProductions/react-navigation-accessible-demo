import { act } from "react";
import { axe, render } from "@/test";
import Box from "./Box";
import { BoxProps } from "./BoxTypes";

const TEST_ID = "Box";

const renderBox = (optProps: BoxProps) => {
  return render(<Box testId={TEST_ID} {...optProps}></Box>);
};

describe("<Box />", () => {
  it("should be WCAG compliant", async () => {
    const optProps = {};
    const { container } = await act(() => renderBox(optProps));

    const results = await axe(container);

    expect(results).toHaveNoViolations();
  });

  it("should load as inline", () => {
    const optProps = { inline: true, testId: TEST_ID };
    const { getByTestId } = renderBox(optProps);
    const component =getByTestId(TEST_ID);
    
    expect(component).toBeInTheDocument();

  });

  it("should be visually hidden when isHidden is true", () => {
    const optProps = { isHidden: true, testId: TEST_ID };
    const { container } = renderBox(optProps);

    expect(container.getElementsByClassName("srOnly")).toHaveLength(1);
  });
});
