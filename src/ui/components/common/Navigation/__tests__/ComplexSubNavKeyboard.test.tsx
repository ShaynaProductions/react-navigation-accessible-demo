import { render, userEvent } from "@/test";
import fs from "fs";
import { Box, Button, Navigation, transformNavigation } from "@/ui/components";
import {
  getCommonTestElements,
  getComplexButtonTestElements,
  getComplexLinkTestElements,
} from "../utilities/renderedItems";

const complexSubNavButtonsJsonObj = fs.readFileSync(
  "public/__static__/complexStructureWithSubNav.json",
  "utf8",
);

const complexSubNavLinksJsonObj = fs.readFileSync(
  "public/__static__/complexStructureWithSubNavlinks.json",
  "utf8",
);

const complexSubNavButtons = JSON.parse(complexSubNavButtonsJsonObj);
const complexSubNavLinks = JSON.parse(complexSubNavLinksJsonObj);

const TEST_ID = "navigation";
const endButtonLabel = "Focusable End";
const frontButtonLabel = "Focusable Front";
const buttonChildren = transformNavigation(complexSubNavButtons, TEST_ID);
const linkChildren = transformNavigation(complexSubNavLinks, TEST_ID);

const renderNavigation = ({ label, children, ...rest }) => {
  return render(
    <Box cx="simple">
      <Button id="front" testId={TEST_ID && `${TEST_ID}-front`}>
        {frontButtonLabel}
      </Button>
      <Navigation id="test-menu" label={label} testId={TEST_ID} {...rest}>
        {children}
      </Navigation>
      <Button id="button-end" testId={TEST_ID && `${TEST_ID}-end`}>
        {endButtonLabel}
      </Button>
    </Box>,
  );
};

describe("Navigation Button Ends keyboard handling with arrow keys", () => {
  const reqProps = {
    id: "main-menu",
    label: "Buttons SubNav List",
  };

  const buttonProps = {
    ...reqProps,
    children: buttonChildren,
  };

  it("3.2.1.5.2 - should move to top Parent when arrow down on last link in first row", async () => {
    const { getByTestId, getByRole } = renderNavigation(buttonProps);
    const { frontButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const { communityButton, communityList, blogLink, forumLink } =
      getComplexButtonTestElements(getByRole, getByTestId, TEST_ID);

    await userEvent.pointer({ target: frontButton, keys: "[MouseLeft]" });
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    expect(communityList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(communityList).not.toHaveClass("srOnly");
    await userEvent.keyboard("{ArrowDown}");
    expect(blogLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(forumLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(communityButton).toHaveFocus();
  });

  it("should move through buttons and links when down is pressed", async () => {
    const { getByTestId, getByRole } = renderNavigation(buttonProps);
    const {
      searchButton,
      storiesButton,
      storiesList,
      allStoriesLink,
      allCommentaryLink,
      findNextStoryButton,
    } = getComplexButtonTestElements(getByRole, getByTestId, TEST_ID);

    expect(storiesList).toHaveClass("srOnly");
    await userEvent.pointer({ target: storiesButton, keys: "[MouseLeft]" });
    expect(storiesList).not.toHaveClass("srOnly");

    await userEvent.keyboard("{ArrowDown}");
    expect(searchButton).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(allStoriesLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(allCommentaryLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(findNextStoryButton).toHaveFocus();
    expect(findNextStoryButton).toHaveAttribute("aria-expanded", "false");
  });
  it("3.2.1.6.4 - should move to parentRef's sibling", async () => {
    // When focus is on the last child in an expanded list, which is not
    // the ultimate last child for the topmost parentRef, focus moves to
    // the parent elements next sibling.

    const { getByTestId, getByRole } = renderNavigation(buttonProps);
    const {
      searchButton,
      storiesButton,
      allStoriesLink,
      basicSearchLink,
      advancedSearchLink,
    } = getComplexButtonTestElements(getByRole, getByTestId, TEST_ID);
    expect(storiesButton).toHaveAttribute("aria-expanded", "false");
    await userEvent.pointer({ target: storiesButton, keys: "[MouseLeft]" });
    expect(storiesButton).toHaveAttribute("aria-expanded", "true");
    await userEvent.keyboard("{ArrowDown}");
    expect(searchButton).toHaveFocus();
    expect(searchButton).toHaveAttribute("aria-expanded", "false");
    await userEvent.keyboard("{Enter}");
    expect(searchButton).toHaveAttribute("aria-expanded", "true");
    await userEvent.keyboard("{ArrowDown}");
    expect(basicSearchLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(advancedSearchLink).toHaveFocus();
    await userEvent.keyboard("{ArrowDown}");
    expect(allStoriesLink).toHaveFocus();
  });

  it("3.2.1.6.* should move to last child and then up through lists", async () => {
    const { getByTestId, getByRole } = renderNavigation(buttonProps);
    const {
      storiesButton,
      searchButton,
      allStoriesLink,
      advancedSearchLink,
      basicSearchLink,
    } = getComplexButtonTestElements(getByRole, getByTestId, TEST_ID);
    expect(storiesButton).toHaveAttribute("aria-expanded", "false");
    await userEvent.pointer({ target: storiesButton, keys: "[MouseLeft]" });
    expect(storiesButton).toHaveAttribute("aria-expanded", "true");
    await userEvent.pointer({ target: searchButton, keys: "[MouseLeft]" });
    expect(searchButton).toHaveAttribute("aria-expanded", "true");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    await userEvent.keyboard("{ArrowDown}");
    expect(allStoriesLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(advancedSearchLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(basicSearchLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(searchButton).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(storiesButton).toHaveFocus();
  });
});

describe("Navigation Button Ends keyboard handling with tabs", () => {
  const reqProps = {
    id: "main-menu",
    label: "Buttons SubNav List",
  };

  const buttonProps = {
    ...reqProps,
    children: buttonChildren,
  };

  it(
    "3.2.1.5.2 - should move to top Parent's sibling when arrow down on last link in first" +
      " row",
    async () => {
      const { getByTestId, getByRole } = renderNavigation(buttonProps);
      const { frontButton } = getCommonTestElements(
        getByRole,
        frontButtonLabel,
        endButtonLabel,
      );
      const {
        communityButton,
        communityList,
        blogLink,
        forumLink,
        storiesButton,
      } = getComplexButtonTestElements(getByRole, getByTestId, TEST_ID);

      await userEvent.pointer({ target: frontButton, keys: "[MouseLeft]" });
      expect(frontButton).toHaveFocus();
      await userEvent.tab();
      expect(communityButton).toHaveFocus();
      expect(communityList).toHaveClass("srOnly");
      await userEvent.keyboard("{Enter}");
      expect(communityList).not.toHaveClass("srOnly");
      await userEvent.tab();
      expect(blogLink).toHaveFocus();
      await userEvent.tab();
      expect(forumLink).toHaveFocus();
      await userEvent.tab();
      expect(storiesButton).toHaveFocus();
    },
  );

  it("should move between top level components up and back using Tab", async () => {
    const { getByTestId, getByRole } = renderNavigation(buttonProps);
    const { frontButton, endButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const { communityButton, storiesButton, referenceButton, aboutButton } =
      getComplexButtonTestElements(getByRole, getByTestId, TEST_ID);
    await userEvent.pointer({ target: frontButton, keys: "[MouseLeft]" });
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.tab();
    expect(storiesButton).toHaveFocus();
    await userEvent.tab();
    expect(referenceButton).toHaveFocus();
    await userEvent.tab();
    expect(aboutButton).toHaveFocus();
    await userEvent.tab();
    expect(endButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(aboutButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(referenceButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(storiesButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(communityButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(frontButton).toHaveFocus();
  });

  it("should move through buttons and links when tab is pressed", async () => {
    const { getByTestId, getByRole } = renderNavigation(buttonProps);
    const { frontButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const {
      communityButton,
      searchButton,
      storiesButton,
      storiesList,
      allStoriesLink,
      allCommentaryLink,
      findNextStoryButton,
      referenceButton,
      aboutButton,
      aboutSiteLink,
      accessibleLink,
    } = getComplexButtonTestElements(getByRole, getByTestId, TEST_ID);

    expect(storiesList).toHaveClass("srOnly");
    await userEvent.pointer({ target: frontButton, keys: "[MouseLeft]" });
    expect(frontButton).toHaveFocus();
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.tab();
    expect(storiesButton).toHaveFocus();
    expect(storiesList).toHaveClass("srOnly");
    await userEvent.keyboard("{Enter}");
    expect(storiesList).not.toHaveClass("srOnly");
    await userEvent.tab();
    expect(searchButton).toHaveFocus();
    await userEvent.tab();
    expect(allStoriesLink).toHaveFocus();
    await userEvent.tab();
    expect(allCommentaryLink).toHaveFocus();
    await userEvent.tab();
    expect(findNextStoryButton).toHaveFocus();
    expect(findNextStoryButton).toHaveAttribute("aria-expanded", "false");
    await userEvent.tab();
    expect(referenceButton).toHaveFocus();
    await userEvent.tab();
    expect(aboutButton).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.tab();
    expect(aboutSiteLink).toHaveFocus();
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    expect(accessibleLink).toHaveFocus();
    // await userEvent.tab();
    // expect(donateLink).toHaveFocus();

    await userEvent.tab();
  });
  it("3.2.1.6.4 - should move to parentRef's sibling", async () => {
    // When focus is on the last child in an expanded list, which is not
    // the ultimate last child for the topmost parentRef, focus moves to
    // the parent elements next sibling.

    const { getByTestId, getByRole } = renderNavigation(buttonProps);
    const {
      searchButton,
      storiesButton,
      allStoriesLink,
      basicSearchLink,
      advancedSearchLink,
    } = getComplexButtonTestElements(getByRole, getByTestId, TEST_ID);
    expect(storiesButton).toHaveAttribute("aria-expanded", "false");
    await userEvent.pointer({ target: storiesButton, keys: "[MouseLeft]" });
    expect(storiesButton).toHaveAttribute("aria-expanded", "true");
    await userEvent.tab();
    expect(searchButton).toHaveFocus();
    expect(searchButton).toHaveAttribute("aria-expanded", "false");
    await userEvent.keyboard("{Enter}");
    expect(searchButton).toHaveAttribute("aria-expanded", "true");
    await userEvent.tab();
    expect(basicSearchLink).toHaveFocus();
    await userEvent.tab();
    expect(advancedSearchLink).toHaveFocus();
    await userEvent.tab();
    expect(allStoriesLink).toHaveFocus();
  });

  it("3.2.1.6.* should move to last child and then up through lists", async () => {
    const { getByTestId, getByRole } = renderNavigation(buttonProps);
    const {
      storiesButton,
      searchButton,
      allStoriesLink,
      advancedSearchLink,
      basicSearchLink,
    } = getComplexButtonTestElements(getByRole, getByTestId, TEST_ID);
    expect(storiesButton).toHaveAttribute("aria-expanded", "false");
    await userEvent.pointer({ target: storiesButton, keys: "[MouseLeft]" });
    expect(storiesButton).toHaveAttribute("aria-expanded", "true");
    await userEvent.pointer({ target: searchButton, keys: "[MouseLeft]" });
    expect(searchButton).toHaveAttribute("aria-expanded", "true");
    await userEvent.tab();
    await userEvent.tab();
    await userEvent.tab();
    expect(allStoriesLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(advancedSearchLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(basicSearchLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(searchButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(storiesButton).toHaveFocus();
  });
});

describe("ComplexSubNav Keyboard with Links", () => {
  const reqProps = {
    id: "main-menu",
    label: "Links SubNav List",
  };
  const linkProps = {
    ...reqProps,
    children: linkChildren,
  };

  it("should move from first link to next button when Tab is pressed", async () => {
    const { getByTestId, getByRole } = renderNavigation(linkProps);
    const { frontButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const { homeLink, communityButton } = getComplexLinkTestElements(
      getByRole,
      getByTestId,
      TEST_ID,
    );
    await userEvent.pointer({ target: frontButton, keys: "[MouseLeft]" });
    await userEvent.tab();
    expect(homeLink).toHaveFocus();
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
  });

  it("it should move to next focusable element out of component when last item is tabbed", async () => {
    const { getByTestId, getByRole } = renderNavigation(linkProps);
    const { frontButton, endButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const {
      homeLink,
      communityButton,
      storiesButton,
      referenceButton,
      aboutButton,
      contactLink,
    } = getComplexLinkTestElements(getByRole, getByTestId, TEST_ID);
    await userEvent.pointer({ target: frontButton, keys: "[MouseLeft]" });
    await userEvent.tab();
    expect(homeLink).toHaveFocus();
    await userEvent.tab();
    expect(communityButton).toHaveFocus();
    await userEvent.tab();
    expect(storiesButton).toHaveFocus();
    await userEvent.tab();
    expect(referenceButton).toHaveFocus();
    await userEvent.tab();
    expect(aboutButton).toHaveFocus();
    await userEvent.tab();
    expect(contactLink).toHaveFocus();
    await userEvent.tab();
    expect(endButton).toHaveFocus();
  });

  it("should move between top row elements when shift tab is pressed on the top row", async () => {
    const { getByTestId, getByRole } = renderNavigation(linkProps);
    const { frontButton, endButton } = getCommonTestElements(
      getByRole,
      frontButtonLabel,
      endButtonLabel,
    );
    const {
      homeLink,
      communityButton,
      storiesButton,
      referenceButton,
      aboutButton,
      contactLink,
    } = getComplexLinkTestElements(getByRole, getByTestId, TEST_ID);
    await userEvent.pointer({ target: endButton, keys: "[MouseLeft]" });
    await userEvent.tab({ shift: true });
    expect(contactLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(aboutButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(referenceButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(storiesButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(communityButton).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(homeLink).toHaveFocus();
    await userEvent.tab({ shift: true });
    expect(frontButton).toHaveFocus();
  });

  it("3.2.1.6.3 - if the link is on the topmost row, do nothing.", async () => {
    const { getByTestId, getByRole } = renderNavigation(linkProps);
    const { homeLink, communityButton } = getComplexLinkTestElements(
      getByRole,
      getByTestId,
      TEST_ID,
    );
    await userEvent.pointer({ target: communityButton, keys: "[MouseLeft]" });
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(communityButton).toHaveFocus();
    await userEvent.keyboard("{ArrowLeft}");
    expect(homeLink).toHaveFocus();
    await userEvent.keyboard("{ArrowUp}");
    expect(homeLink).toHaveFocus();
  });
});
