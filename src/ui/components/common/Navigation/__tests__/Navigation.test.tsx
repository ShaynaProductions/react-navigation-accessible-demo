import React from "react";
import fs from "fs";
import { act, axe, render, userEvent } from "@/test";
import { Box, Button, transformNavigation } from "@/ui/components";
import { useMergedRef } from "@/ui/hooks";

import Navigation from "../components/Navigation";
import { NavigationProps, ParentElementType } from "../NavigationTypes";
import {
  getCommonTestElements,
  getSubNavTestElements,
} from "../utilities/renderedItems";

const TEST_ID = "Navigation";
const endButtonLabel = "Focusable End";
const frontButtonLabel = "Focusable Front";

jest.mock("next/navigation", () => ({
  usePathname: () => "/#about",
}));

const renderNavigation = (
  filename: string,
  optProps: Partial<NavigationProps>,
) => {
  const jsonObj = fs.readFileSync(`public/__static__/${filename}.json`, "utf8");

  const navObject = JSON.parse(jsonObj);
  const navigation = transformNavigation(navObject, TEST_ID);

  return render(
    <Navigation id="nav-id" testId={TEST_ID} label="test" {...optProps}>
      {navigation}
    </Navigation>,
  );
};

const renderNavigationWithParent = ({
  filename,
  parentRef,
  buttonComponent,
  ...rest
}) => {
  const jsonObj = fs.readFileSync(`public/__static__/${filename}.json`, "utf8");

  const navObject = JSON.parse(jsonObj);
  const navigation = transformNavigation(navObject, TEST_ID);
  return render(
    <Box cx="simple">
      {buttonComponent}
      <Navigation
        id="parent-ref-test"
        parentRef={parentRef}
        label="With ParentRef"
        testId={TEST_ID}
        {...rest}
      >
        {navigation}
      </Navigation>
      <Button id="end" testId={TEST_ID && `${TEST_ID}-end`}>
        {endButtonLabel}
      </Button>
    </Box>,
  );
};

describe("<Navigation />", () => {
  it("Simple Sub Navigation should be WCAG compliant", async () => {
    const optProps = {};
    const { container } = await act(() =>
      renderNavigation("simpleStructureWithSubNav", optProps),
    );

    const results = await act(() => axe(container));

    expect(results).toHaveNoViolations();
  });

  it("should render with a parentRef", async () => {
    let frontRef;
    const FrontButton = (frontRef) => {
      const ref = React.useRef<ParentElementType>(null);
      const combinedRef = useMergedRef(
        ref,
        frontRef,
      ) as unknown as React.RefObject<HTMLButtonElement>;

      return (
        <Button id="front" ref={combinedRef}>
          {frontButtonLabel}
        </Button>
      );
    };

    const optProps = {
      filename: "simpleStructureWithSubNav",
      buttonComponent: <FrontButton />,
      parentRef: frontRef,
    };
    const { container, getByRole, getByTestId } =
      renderNavigationWithParent(optProps);
    const { frontButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const { aboutLink, readButton } = getSubNavTestElements(
      getByRole,
      getByTestId,
      TEST_ID,
    );

    expect(aboutLink).toBeInTheDocument();
    expect(frontButton).toBeInTheDocument();
    expect(readButton).toBeInTheDocument();

    const results = await act(() => axe(container));

    expect(results).toHaveNoViolations();
  });
  it("Complex Sub Navigation should be WCAG compliant", async () => {
    const optProps = {};
    const { container } = await act(() =>
      renderNavigation("ComplexStructureWithSubNav", optProps),
    );

    const results = await act(() => axe(container));

    expect(results).toHaveNoViolations();
  });

  it("4.1.3 should handle an OnClick", async () => {
    const optProps = {};
    const { getByTestId, getByRole } = await act(() =>
      renderNavigation("SimpleStructureWithSubNav", optProps),
    );
    const { readButton, readList } = getSubNavTestElements(
      getByRole,
      getByTestId,
      TEST_ID,
    );

    expect(readButton).toBeInTheDocument();
    expect(readList).toBeInTheDocument();
    expect(readButton).not.toHaveAttribute("aria-expanded", "true");
    await userEvent.click(readButton);
    expect(readButton).toHaveAttribute("aria-expanded", "true");
  });

  it("3.1.2 should return an aria-current when the href matches the current url", () => {
    const optProps = {};
    const { getByRole } = renderNavigation(
      "simpleStructureWithSubNav",
      optProps,
    );
    const currentLink = getByRole("link", { name: "About" });
    expect(currentLink).toBeInTheDocument();
    expect(currentLink).toHaveAttribute("aria-current", "true");
  });
});
