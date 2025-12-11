export const getCommonTestElements = (getByRole, frontButtonLabel, endButtonLabel) => {
    return ({
        frontButton: getByRole("button", {name: frontButtonLabel}),
        endButton: getByRole("button", {name: endButtonLabel}),

    })
}

export const getSimpleLinkTestElements = (getByRole) => {
    return ({
        homeLink: getByRole("link", {name: "Home"}),
        baseComponentsLink: getByRole("link", {name: "Accessible Base Components"}),
        simpleLink: getByRole("link", {name: "Simple Links"}),
        singleSubNavLink: getByRole("link", {name: "Single SubNavigation"}),
    })
};


export const getSubNavTestElements = (getByRole, getByTestId, testId) => {
    return ({
        aboutLink: getByRole("link", {name: "About"}),
        readButton: getByRole("button", {name: "Read navigation"}),
        readList: getByTestId(`${testId}-read-menu-list`),
        storiesLink: getByRole("link", {name: "Stories"}),
        blogLink: getByRole("link", {name: "Musings"}),
        referenceButton: getByRole("button", {name: "Reference navigation"}),
        referenceList: getByTestId(`${testId}-reference-menu-list`),
        charactersLink: getByRole("link", {name: "Characters"}),
        glossaryLink: getByRole("link", {name: "Glossary"}),
        appendicesLink: getByRole("link", {name: "Appendices"}),
    })
}

export const getComplexButtonTestElements = (getByRole, getByTestId, testId) => {
    return ({
        communityButton: getByRole("button", {name: "Community navigation"}),
        communityList: getByTestId(`${testId}-community-menu-list`),
        blogLink: getByRole("link", {name: "Musings"}),
        forumLink: getByRole("link", {name: "Forum"}),

    })
}