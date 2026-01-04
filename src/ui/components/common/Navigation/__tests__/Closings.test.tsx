import fs from "fs";
import { render, userEvent } from "@/test";
import {
  Box,
  Button,
  MobileNavigation,
  transformNavigation,
} from "@/ui/components";

import Navigation from "../components/Navigation";
import {
  getCommonTestElements,
  getComplexButtonTestElements,
  getComplexLinkTestElements,
  getSubNavTestElements,
} from "@/ui/components/common/Navigation/utilities/renderedItems";

const complexSubNavButtonsJsonObj = fs.readFileSync(
  "public/__static__/complexStructureWithSubNav.json",
  "utf8",
);

const complexSubNavLinksJsonObj = fs.readFileSync(
  "public/__static__/complexStructureWithSubNavlinks.json",
  "utf8",
);
const singleSubNavJsonObj = fs.readFileSync(
  "public/__static__/simpleStructureWithSubNav.json",
  "utf8",
);

const complexSubNavButtons = JSON.parse(complexSubNavButtonsJsonObj);
const complexSubNavLinks = JSON.parse(complexSubNavLinksJsonObj);
const singleSubNavObj = JSON.parse(singleSubNavJsonObj);

const TEST_ID = "Navigation";
const endButtonLabel = "Focusable End";
const frontButtonLabel = "Focusable Front";
const buttonChildren = transformNavigation(complexSubNavButtons, TEST_ID);
const linkChildren = transformNavigation(complexSubNavLinks, TEST_ID);
const mobileChildren = transformNavigation(singleSubNavObj, TEST_ID);

const renderNavigation = ({ label, children, ...rest }) => {
  return render(
    <Box cx="simple">
      <Button id="front" testId={TEST_ID && `${TEST_ID}-front`}>
        {frontButtonLabel}
      </Button>
      <Navigation id="nav-id" testId={TEST_ID} label={label} {...rest}>
        {children}
      </Navigation>
      <Button id="button-end" testId={TEST_ID && `${TEST_ID}-end`}>
        {endButtonLabel}
      </Button>
    </Box>,
  );
};

const renderNavigationWithParent = ({ label, children, ...rest }) => {
  return render(
    <MobileNavigation label={label} {...rest}>
      {children}
    </MobileNavigation>,
  );
};
describe("<Navigation Closings />", () => {
  const reqProps = {
    id: "test-menu",
    label: "Test Menu",
  };

  const buttonProps = {
    ...reqProps,
    children: buttonChildren,
  };

  const linkProps = {
    ...reqProps,
    children: linkChildren,
  };

  const mobileProps = {
    ...reqProps,
    children: mobileChildren,
  };
  it("should close any open nested subnavigation lists when closed", async () => {
    const { getByRole, getByTestId } = renderNavigation(buttonProps);
    const { frontButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const {
      communityButton,
      storiesButton,
      storiesList,
      searchButton,
      searchList,
      findNextStoryButton,
      findNextStoryList,
    } = getComplexButtonTestElements(getByRole, getByTestId, TEST_ID);

    expect(storiesList).toHaveClass("srOnly");
    expect(searchList).toHaveClass("srOnly");
    expect(findNextStoryList).toHaveClass("srOnly");

    await userEvent.pointer({ target: frontButton, keys: "[MouseLeft]" });
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.tab();
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(storiesList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(searchButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(searchList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    expect(findNextStoryButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(findNextStoryList).not.toHaveClass("srOnly");

    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    expect(storiesButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(storiesList).toHaveClass("srOnly");
    expect(searchList).toHaveClass("srOnly");
    expect(findNextStoryList).toHaveClass("srOnly");
  });

  it("top level list should close any open navigation on siblings when it receives focus", async () => {
    const { getByRole, getByTestId } = renderNavigation(linkProps);

    const {
      homeLink,
      communityButton,
      communityList,
      storiesButton,
      storiesList,
    } = getComplexLinkTestElements(getByRole, getByTestId, TEST_ID);

    expect(communityList).toHaveClass("srOnly");
    expect(storiesList).toHaveClass("srOnly");

    await userEvent.pointer({ target: communityButton, keys: "[MouseLeft]" });
    expect(communityButton).toHaveFocus();
    expect(communityList).not.toHaveClass("srOnly");
    await userEvent.tab({ shift: true });
    expect(homeLink).toHaveFocus();
    await userEvent.pointer({ target: storiesButton, keys: "[MouseLeft]" });
    expect(communityList).toHaveClass("srOnly");
    expect(storiesList).not.toHaveClass("srOnly");
    await userEvent.pointer({ target: communityButton, keys: "[MouseLeft]" });
    expect(communityList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowLeft}");
    expect(homeLink).toHaveFocus();
    expect(communityList).toHaveClass("srOnly");
  });

  it("a top level button should close open sublists when leaving the component", async () => {
    const { getByRole, getByTestId } = renderNavigation(buttonProps);

    const { frontButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const {
      communityButton,
      communityList,
      storiesList,
      searchList,
      findNextStoryList,
    } = getComplexButtonTestElements(getByRole, getByTestId, TEST_ID);

    expect(storiesList).toHaveClass("srOnly");
    expect(searchList).toHaveClass("srOnly");
    expect(findNextStoryList).toHaveClass("srOnly");

    await userEvent.pointer({ target: frontButton, keys: "[MouseLeft]" });
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(communityList).not.toHaveClass("srOnly");
    await userEvent.tab({ shift: true });
    expect(frontButton).toHaveFocus();
    expect(communityList).toHaveClass("srOnly");
  });

  it("a top level link or the last link in the component should close open sublists when leaving the component", async () => {
    const { getByRole, getByTestId } = renderNavigation(buttonProps);
    const { frontButton, endButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const {
      communityButton,
      aboutButton,
      aboutList,
      aboutSiteLink,
      contactLink,
      privacyLink,
      accessibleLink,
      donateLink,
    } = getComplexButtonTestElements(getByRole, getByTestId, TEST_ID);

    expect(aboutList).toHaveClass("srOnly");
    await userEvent.pointer({ target: frontButton, keys: "[MouseLeft]" });
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    expect(aboutButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    expect(aboutList).not.toHaveClass("srOnly");
    await userEvent.tab();
    expect(aboutSiteLink).toHaveFocus();
    await userEvent.tab();
    expect(contactLink).toHaveFocus();
    await userEvent.tab();
    expect(privacyLink).toHaveFocus();
    await userEvent.tab();
    expect(accessibleLink).toHaveFocus();
    await userEvent.tab();
    expect(donateLink).toHaveFocus();
    await userEvent.tab();
    expect(endButton).toHaveFocus();
    expect(aboutList).toHaveClass("srOnly");
  });
  it(
    "should close component and set focus on parent in the top list when Escape is pressed and" +
      " top level parent is null.",
    async () => {
      const { getByRole, getByTestId } = renderNavigation(buttonProps);
      const { frontButton } = getCommonTestElements(
        getByRole,
        frontButtonLabel,
        endButtonLabel,
      );
      const { communityButton, storiesButton, storiesList, allCommentaryLink } =
        getComplexButtonTestElements(getByRole, getByTestId, TEST_ID);

      await userEvent.pointer({ target: frontButton, keys: "[MouseLeft]" });
      expect(frontButton).toHaveFocus();
      await userEvent.tab();
      expect(communityButton).toHaveFocus();
      await userEvent.tab();
      expect(storiesButton).toHaveFocus();
      await userEvent.keyboard("{Enter}");
      expect(storiesList).not.toHaveClass("srOnly");
      await userEvent.tab();
      await userEvent.tab();
      await userEvent.tab();
      expect(allCommentaryLink).toHaveFocus();
      await userEvent.keyboard("{Escape}");
      expect(storiesList).toHaveClass("srOnly");
      expect(storiesButton).toHaveFocus();
    },
  );
  it("should close component and set focus on controlling parent when Escape is pressed and top level parent is an element ", async () => {
    const menuProps = {
      ...mobileProps,
      label: "mobile test",
    };
    const { getByRole, getByTestId } = renderNavigationWithParent(menuProps);
    const menuButton = getByRole("button", { name: "Menu" });
    const { aboutLink, readButton, readList, storiesLink } =
      getSubNavTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.pointer({ target: menuButton, keys: "[MouseLeft]" });
    expect(aboutLink).toHaveFocus();
    await userEvent.tab();
    expect(readButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.tab();
    expect(storiesLink).toHaveFocus();
    expect(readList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{Escape}");
    expect(readList).toHaveClass("srOnly");
    expect(menuButton).toHaveFocus();
  });
  it("should close component when a pointer/click event is made outside of the component.", async () => {
    const { getByTestId, getByRole } = renderNavigation(linkProps);
    const { endButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const { communityButton, communityList } = getComplexLinkTestElements(
      getByRole,
      getByTestId,
      TEST_ID,
    );
    await userEvent.pointer({ target: communityButton, keys: "[MouseLeft]" });
    expect(communityButton).toHaveFocus();
    expect(communityList).not.toHaveClass("srOnly");
    await userEvent.pointer({ target: endButton, keys: "[MouseLeft]" });
    expect(communityList).toHaveClass("srOnly");
  });
});
