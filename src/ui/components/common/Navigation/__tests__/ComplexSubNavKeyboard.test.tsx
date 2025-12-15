import {render, userEvent} from "@/test"
import fs from "fs"
import {Box, Button, Navigation, transformNavigation} from "@/ui/components";

import {NavigationProps} from "../NavigationTypes";
import {
    getCommonTestElements,
    getComplexButtonTestElements
} from "../utilities/renderedItems";

const complexSubNavButtonsJsonObj = fs.readFileSync(
    "public/__static__/complexStructureWithSubNav.json",
    "utf8",
)

// const complexSubNavLinksJsonObj = fs.readFileSync(
//     "public/__static__/complexStructureWithSubNavlinks.json",
//     "utf8",
// )

const complexSubNavButtons = JSON.parse(complexSubNavButtonsJsonObj);
// const complexSubNavLinks = JSON.parse(complexSubNavLinksJsonObj)


const TEST_ID = "navigation";
const endButtonLabel = "Focusable End";
const frontButtonLabel = "Focusable Front";
const buttonChildren = transformNavigation(complexSubNavButtons, TEST_ID);
// const linkChildren = transformNavigation(complexSubNavLinks, TEST_ID);


const renderNavigationButton = ({
    label,
    ...rest
}: Omit<NavigationProps, "children">) => {
    return render(
        <Box cx="simple">
            <Button id="front" testId={TEST_ID && `${TEST_ID}-front`}>
                {frontButtonLabel}
            </Button>
            <Navigation label={label} testId={TEST_ID} {...rest}>
                {buttonChildren}
            </Navigation>
            <Button id="button-end" testId={TEST_ID && `${TEST_ID}-end`}>
                {endButtonLabel}
            </Button>
        </Box>,
    );
};

// const renderNavigationLinks = ({label, ...rest}: Omit<NavigationProps,
// "children">) => { return render( <Box cx="simple"> <Button id="front"
// testId={TEST_ID && `${TEST_ID}-front`}> {frontButtonLabel} </Button>
// <Navigation label={label} testId={TEST_ID} {...rest}> {linkChildren}
// </Navigation> <Button id="button-end" testId={TEST_ID && `${TEST_ID}-end`}>
// {endButtonLabel} </Button> </Box>, ); };
describe("Navigation Button Ends keyboard handling", () => {

    const reqProps = {
        id: "main-menu",
        label: "Buttons SubNav List",
    };

    it('should move to top Parent when arrow down on last link in first row', async () => {

        const {getByTestId, getByRole} = renderNavigationButton(reqProps);
        const {frontButton} = getCommonTestElements(getByRole, frontButtonLabel, endButtonLabel);
        const {
            communityButton,
            communityList,
            blogLink,
            forumLink
        } = getComplexButtonTestElements(getByRole, getByTestId, TEST_ID);

        await userEvent.pointer({target: frontButton, keys: "[MouseLeft]"});
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

    it('should move through buttons and links when down is pressed', async () => {

        const {getByTestId, getByRole} = renderNavigationButton(reqProps);
        const {
            searchButton,
            storiesButton,
            storiesList,
            allStoriesLink,
            allCommentaryLink,
            findNextStoryButton
        } = getComplexButtonTestElements(getByRole, getByTestId, TEST_ID);

        expect(storiesList).toHaveClass("srOnly");
        await userEvent.pointer({target: storiesButton, keys: "[MouseLeft]"});
        expect(storiesList).not.toHaveClass("srOnly");


        await userEvent.keyboard("{ArrowDown}");
        expect(searchButton).toHaveFocus();
        await userEvent.keyboard("{ArrowDown}");
        expect(allStoriesLink).toHaveFocus();
        await userEvent.keyboard("{ArrowDown}");
        expect(allCommentaryLink).toHaveFocus();
        await userEvent.keyboard("{ArrowDown}");
        expect(findNextStoryButton).toHaveFocus()
        expect(findNextStoryButton).toHaveAttribute("aria-expanded", "false");

    });
    it("should move to parentRef's sibling", async () => {
        // When focus is on the last child in an expanded list, which is not
        // the ultimate last child for the topmost parentRef, focus moves to
        // the parent elements next sibling.


        const {getByTestId, getByRole} = renderNavigationButton(reqProps);
        const {
            searchButton,
            storiesButton,
            allStoriesLink,
            basicSearchLink,
            advancedSearchLink
        } = getComplexButtonTestElements(getByRole, getByTestId, TEST_ID);
        expect(storiesButton).toHaveAttribute("aria-expanded", "false");
        await userEvent.pointer({target: storiesButton, keys: "[MouseLeft]"});
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

    it ('should move to last child and then up through lists', async () => {
        const {getByTestId, getByRole} = renderNavigationButton(reqProps);
        const {storiesButton, searchButton, allStoriesLink, advancedSearchLink, basicSearchLink }= getComplexButtonTestElements(getByRole, getByTestId, TEST_ID);
        expect(storiesButton).toHaveAttribute("aria-expanded", "false");
        await userEvent.pointer({target: storiesButton, keys: "[MouseLeft]"});
        expect(storiesButton).toHaveAttribute("aria-expanded", "true");
        await userEvent.pointer({target: searchButton, keys: "[MouseLeft]"});
        expect(searchButton).toHaveAttribute("aria-expanded", "true");
        await userEvent.keyboard("{ArrowDown}");
        await userEvent.keyboard("{ArrowDown}");
        await userEvent.keyboard("{ArrowDown}");
        expect(allStoriesLink).toHaveFocus();
        await userEvent.keyboard("{ArrowUp}");
        expect(advancedSearchLink).toHaveFocus()
        await userEvent.keyboard("{ArrowUp}");
        expect(basicSearchLink).toHaveFocus();
        await userEvent.keyboard("{ArrowUp}");
        expect(searchButton).toHaveFocus();


    })

});
