import fs from "fs";
import { render, userEvent } from "@/test";
import { Button, MobileNavigation, transformNavigation } from "@/ui/components";
import {
  getCommonTestElements,
  getComplexButtonTestElements,
} from "@/ui/components/common/Navigation/utilities/renderedItems";

const complexSubNavButtonsJsonObj = fs.readFileSync(
  "public/__static__/complexStructureWithSubNav.json",
  "utf8",
);
const complexSubNavButtons = JSON.parse(complexSubNavButtonsJsonObj);

const TEST_ID = "navigation";
const endButtonLabel = "Focusable End";
const frontButtonLabel = "Focusable Front";
const buttonChildren = transformNavigation(complexSubNavButtons, TEST_ID);

const renderMobileNavigation = () => {
  const id = "test-menu";
  const label = "Menu";
  return render(
    <>
      <Button id="front" testId={TEST_ID && `${TEST_ID}-front`}>
        {frontButtonLabel}
      </Button>
      <MobileNavigation id={id} label={label}>
        {buttonChildren}
      </MobileNavigation>
      <Button id="button-end" testId={TEST_ID && `${TEST_ID}-end`}>
        {endButtonLabel}
      </Button>
    </>,
  );
};

describe("MobileNavigation", () => {
  it("should set focus onto the top button when it the menu is opened.", async () => {
    const { getAllByRole, getByRole, getByTestId } = renderMobileNavigation();
    const { communityButton } = getComplexButtonTestElements(
      getByRole,
      getByTestId,
      TEST_ID,
    );
    const menuButton = getByRole("button", { name: "Menu" });
    const navElement = getByRole("navigation");
    const ulArray = getAllByRole("list");
    const topList = ulArray[0];

    expect(menuButton).toBeInTheDocument();
    expect(navElement).toBeInTheDocument();
    expect(topList).toHaveAttribute("id", "mobile-menu");
    expect(topList).toHaveClass("srOnly");
    await userEvent.pointer({ target: menuButton, keys: "[MouseLeft]" });
    expect(topList).not.toHaveClass("srOnly");
    expect(communityButton).toHaveFocus();
  });

  it("should move to end button when navigation is closed and tab is executed on menu button", async () => {
    const { getByRole } = renderMobileNavigation();

    const { frontButton, endButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );

    const menuButton = getByRole("button", { name: "Menu" });
    await userEvent.pointer({ target: frontButton, keys: "[MouseLeft]" });
    await userEvent.tab();
    expect(menuButton).toHaveFocus();
    await userEvent.tab();
    expect(endButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(menuButton).toHaveFocus();
  });

  it(
    "should move to front button when navigation is closed and tab is executed on first focused" +
      " element outside the component",
    async () => {
      const { getByRole } = renderMobileNavigation();

      const { endButton } = getCommonTestElements(
        getByRole,
        frontButtonLabel,
        endButtonLabel,
      );
      const menuButton = getByRole("button", { name: "Menu" });
      await userEvent.pointer({ target: endButton, keys: "[MouseLeft]" });
      expect(endButton).toHaveFocus();
      await userEvent.tab({ shift: true });
      expect(menuButton).toHaveFocus();
    },
  );
});
