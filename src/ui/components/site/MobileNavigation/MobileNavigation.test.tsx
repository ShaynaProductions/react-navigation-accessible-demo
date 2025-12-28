import fs from "fs";
import { render, userEvent } from "@/test";
import { MobileNavigation, transformNavigation } from "@/ui/components";
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
    <MobileNavigation id={id} label={label}>
      {buttonChildren}
    </MobileNavigation>,
  );
};

describe("MobileNavigation", () => {
  it("should set focus onto the top button when it the menu is opened.", async () => {
    const { getAllByRole, getByRole, getByTestId } = renderMobileNavigation();
    const {
      communityButton,
      storiesButton,
      storiesList,
      searchButton,
      searchList,
      findNextStoryButton,
      findNextStoryList,
    } = getComplexButtonTestElements(getByRole, getByTestId, TEST_ID);
    const menuButton = getByRole("button", { name: "Menu" });
    const navElement = getByRole("navigation");
    const ulArray = getAllByRole("list");
    const topList = ulArray[0];

    expect(menuButton).toBeInTheDocument();
    expect(navElement).toBeInTheDocument();
    expect(topList).toHaveAttribute("id", "test-menu");
    expect(topList).toHaveClass("srOnly");
    await userEvent.pointer({ target: menuButton, keys: "[MouseLeft]" });
    expect(topList).not.toHaveClass("srOnly");
  });
});
