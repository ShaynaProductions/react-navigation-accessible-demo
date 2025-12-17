export const getCommonTestElements = (
  getByRole,
  frontButtonLabel,
  endButtonLabel,
) => {
  return {
    frontButton: getByRole("button", { name: frontButtonLabel }),
    endButton: getByRole("button", { name: endButtonLabel }),
  };
};

export const getSimpleLinkTestElements = (getByRole) => {
  return {
    homeLink: getByRole("link", { name: "Home" }),
    baseComponentsLink: getByRole("link", {
      name: "Accessible Base Components",
    }),
    simpleLink: getByRole("link", { name: "Simple Links" }),
    singleSubNavLink: getByRole("link", { name: "Single SubNavigation" }),
  };
};

export const getSubNavTestElements = (getByRole, getByTestId, testId) => {
  return {
    aboutLink: getByRole("link", { name: "About" }),
    readButton: getByRole("button", { name: "Read" }),
    readList: getByTestId(`${testId}-read-menu-list`),
    storiesLink: getByRole("link", { name: "Stories" }),
    blogLink: getByRole("link", { name: "Musings" }),
    referenceButton: getByRole("button", { name: "Reference" }),
    referenceList: getByTestId(`${testId}-reference-menu-list`),
    charactersLink: getByRole("link", { name: "Characters" }),
    glossaryLink: getByRole("link", { name: "Glossary" }),
    appendicesLink: getByRole("link", { name: "Appendices" }),
  };
};

export const getComplexButtonTestElements = (
  getByRole,
  getByTestId,
  testId,
) => {
  return {
    communityButton: getByRole("button", { name: "Community" }),
    communityList: getByTestId(`${testId}-community-menu-list`),
    blogLink: getByRole("link", { name: "Musings" }),
    forumLink: getByRole("link", { name: "Forum" }),
    storiesButton: getByRole("button", {
      name: "Search, Stories and" + " Commentary",
    }),
    storiesList: getByTestId(`${testId}-stories-menu-list`),
    searchButton: getByRole("button", { name: "Search" }),
    searchList: getByTestId(`${testId}-search-menu-list`),
    basicSearchLink: getByRole("link", { name: "Basic Search" }),
    advancedSearchLink: getByRole("link", { name: "Advanced Search" }),
    allStoriesLink: getByRole("link", { name: "All Stories" }),
    allCommentaryLink: getByRole("link", { name: "All Commentary" }),
    findNextStoryButton: getByRole("button", {
      name: "Find Your Next" + " Story",
    }),
    findNextStoryList: getByTestId(`${testId}-find-next-story-list`),
    byStorytellerLink: getByRole("link", { name: "By Storyteller" }),
    byEraLink: getByRole("link", { name: "By Era" }),
    referenceButton: getByRole("button", { name: "Reference" }),
    aboutButton: getByRole("button", { name: "About" }),
    aboutSiteLink: getByRole("link", { name: "About the Site" }),
    privacyLink: getByRole("link", { name: "Privacy Policy" }),
    accessibleLink: getByRole("link", { name: "Accessibility" }),

    contactLink: getByRole("link", { name: "Contact Us" }),
    donateLink: getByRole("link", { name: "Donate" }),
  };
};

export const getComplexLinkTestElements = (getByRole, getByTestId, testId) => {
  const commonElements = getComplexButtonTestElements(
    getByRole,
    getByTestId,
    testId,
  );

  return {
    homeLink: getByRole("link", { name: "Home" }),
    ...commonElements,
  };
};
