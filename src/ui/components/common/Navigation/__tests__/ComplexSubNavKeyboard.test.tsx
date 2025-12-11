import {render, userEvent} from "@/test"
import fs from "fs"
import {Box, Button, Navigation, transformNavigation} from "@/ui/components";

import {NavigationProps} from "../NavigationTypes";
import {getCommonTestElements, getComplexButtonTestElements} from "../utilities/renderedItems";

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


const renderNavigationButton = ({label, ...rest}: Omit<NavigationProps, "children">) => {
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

// const renderNavigationLinks = ({label, ...rest}: Omit<NavigationProps, "children">) => {
//     return render(
//         <Box cx="simple">
//             <Button id="front" testId={TEST_ID && `${TEST_ID}-front`}>
//                 {frontButtonLabel}
//             </Button>
//             <Navigation label={label} testId={TEST_ID} {...rest}>
//                 {linkChildren}
//             </Navigation>
//             <Button id="button-end" testId={TEST_ID && `${TEST_ID}-end`}>
//                 {endButtonLabel}
//             </Button>
//         </Box>,
//     );
// };
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
    })

});

// describe("Navigation Button Ends keyboard handling", () => {
//
//     const reqProps = {
//         id: "main-menu",
//         label: "Buttons SubNav List",
//     };
//
//
// });