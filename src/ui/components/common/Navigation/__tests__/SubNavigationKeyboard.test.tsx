import { render, userEvent } from "@/test";
import fs from "fs";
import { Box, Button, Navigation, transformNavigation } from "@/ui/components";

import { NavigationProps } from "../components/NavigationTypes";
import {
  getCommonTestElements,
  getSubNavTestElements,
} from "../utilities/renderedItems";

const singleSubNavJsonObj = fs.readFileSync(
  "public/__static__/simpleStructureWithSubNav.json",
  "utf8",
);
const singleSubNavObj = JSON.parse(singleSubNavJsonObj);

const TEST_ID = "navigation";
const endButtonLabel = "Focusable End";
const frontButtonLabel = "Focusable Front";
const children = transformNavigation(singleSubNavObj, TEST_ID);

const renderNavigation = ({
  label,
  ...rest
}: Omit<NavigationProps, "children">) => {
  return render(
    <Box cx="simple">
      <Button id="front" testId={TEST_ID && `${TEST_ID}-front`}>
        {frontButtonLabel}
      </Button>
      <Navigation label={label} testId={TEST_ID} {...rest}>
        {children}
      </Navigation>
      <Button id="button-end" testId={TEST_ID && `${TEST_ID}-end`}>
        {endButtonLabel}
      </Button>
    </Box>,
  );
};
describe("Navigation simple keyboard handling", () => {
  const reqProps = {
    id: "main-menu",
    label: "Simple Link List",
  };
  it("4.2.1.5.1.1 - should move down the list when the sub navigation is collapsed.", async () => {
    const { getByTestId, getByRole } = renderNavigation(reqProps);
    const { frontButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const { aboutLink, readButton, readList, blogLink } = getSubNavTestElements(
      getByRole,
      getByTestId,
      TEST_ID,
    );

    expect(readList).toHaveClass("srOnly");
    await userEvent.pointer({ target: frontButton, keys: "[MouseLeft]" });
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(aboutLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(readButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(blogLink).toHaveFocus();
  });

  it("4.2.1.5.2 - should move into it's child when the list is expanded.", async () => {
    const { getByTestId, getByRole } = renderNavigation(reqProps);
    const { frontButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );

    const { aboutLink, readButton, readList, storiesLink } =
      getSubNavTestElements(getByRole, getByTestId, TEST_ID);

    expect(readList).toHaveClass("srOnly");
    await userEvent.pointer({ target: frontButton, keys: "[MouseLeft]" });
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(aboutLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(readButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(readList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesLink).toHaveFocus();
  });

  it(
    "4.2.1.5.1.2 should move to its topmost parent when the last item is a button with a" +
      " collapsed list.",
    async () => {
      const { getByTestId, getByRole } = renderNavigation(reqProps);
      const { frontButton } = getCommonTestElements(
        getByRole,
        frontButtonLabel,
        endButtonLabel,
      );

      const { aboutLink, readButton, readList, referenceButton, storiesLink } =
        getSubNavTestElements(getByRole, getByTestId, TEST_ID);

      expect(readList).toHaveClass("srOnly");
      await userEvent.pointer({ target: frontButton, keys: "[MouseLeft]" });
      expect(frontButton).toHaveFocus();
      await userEvent.tab();
      expect(aboutLink).toHaveFocus();
      await userEvent.keyboard("{ArrowDown}");
      expect(readButton).toHaveFocus();
      await userEvent.keyboard("{Enter}");
      expect(readList).not.toHaveClass("srOnly");
      await userEvent.keyboard("{ArrowDown}");
      expect(storiesLink).toHaveFocus();
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{ArrowDown}");
      expect(referenceButton).toHaveFocus();
      await userEvent.keyboard("{ArrowDown}");
      expect(readButton).toHaveFocus();
    },
  );

  it("3.2.1.5.2/4.2.1.5.1.1 - should move to it's topmost parent when the last child in the tree is reached.", async () => {
    const { getByTestId, getByRole } = renderNavigation(reqProps);
    const { frontButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const {
      aboutLink,
      readButton,
      readList,
      storiesLink,
      referenceButton,
      referenceList,
      charactersLink,
      appendicesLink,
    } = getSubNavTestElements(getByRole, getByTestId, TEST_ID);

    expect(readList).toHaveClass("srOnly");
    await userEvent.pointer({ target: frontButton, keys: "[MouseLeft]" });
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(aboutLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(readButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(readList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    expect(referenceButton).toHaveFocus();
    expect(referenceList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(referenceList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(charactersLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    expect(appendicesLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(readButton).toHaveFocus();
  });

  it(
    "4.2.1.6.* - should move to it's parent when the item is the first child in" +
      " it's list and not move when in the top row.",
    async () => {
      const { getByTestId, getByRole } = renderNavigation(reqProps);
      const {
        aboutLink,
        readButton,
        readList,
        referenceButton,
        charactersLink,
        glossaryLink,
        appendicesLink,
      } = getSubNavTestElements(getByRole, getByTestId, TEST_ID);

      await userEvent.click(readButton);
      expect(readList).not.toHaveClass("srOnly");
      await userEvent.click(referenceButton);
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{ArrowDown}");
      expect(appendicesLink).toHaveFocus();
      await userEvent.keyboard("{ArrowDown}");
      expect(readButton).toHaveFocus();
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{ArrowDown}");
      await userEvent.keyboard("{ArrowDown}");
      expect(appendicesLink).toHaveFocus();
      await userEvent.keyboard("{ArrowUp}");
      expect(glossaryLink).toHaveFocus();
      await userEvent.keyboard("{ArrowUp}");
      expect(charactersLink).toHaveFocus();
      await userEvent.keyboard("{ArrowUp}");
      expect(referenceButton).toHaveFocus();
      await userEvent.keyboard("{ArrowUp}");
      await userEvent.keyboard("{ArrowUp}");
      await userEvent.keyboard("{ArrowUp}");
      expect(readButton).toHaveFocus();
      await userEvent.keyboard("{ArrowUp}");
      expect(aboutLink).toHaveFocus();
      await userEvent.keyboard("{ArrowUp}");
      expect(aboutLink).toHaveFocus();
    },
  );
});
