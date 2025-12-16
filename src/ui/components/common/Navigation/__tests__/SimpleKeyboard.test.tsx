import {render, userEvent} from "@/test"
import fs from "fs"
import {NavigationProps} from "../NavigationTypes";
import {Box, Button, Navigation, transformNavigation} from "@/ui/components";
import {
    getCommonTestElements,
    getSimpleLinkTestElements,
    getSubNavTestElements
} from "../utilities/renderedItems";

const simpleJsonObj = fs.readFileSync(
    "public/__static__/simpleStructure.json",
    "utf8",
)

const singleSubNavJsonObj = fs.readFileSync(
    "public/__static__/simpleStructureWithSubNav.json",
    "utf8",
)

const simpleNavObj = JSON.parse(simpleJsonObj);
const singleSubNavObj = JSON.parse(singleSubNavJsonObj);


const TEST_ID = "navigation";
const endButtonLabel = "Focusable End";
const frontButtonLabel = "Focusable Front";

const renderNavigation = ({children, label, ...rest}: NavigationProps) => {
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
    it('should move up and down the list using the home, end, right and left arrow key', async () => {
        const navigation = transformNavigation(simpleNavObj);
        const optProps = {
            ...reqProps,
            children: navigation,
        }
        const {getByRole} = renderNavigation(optProps);
        const {frontButton} = getCommonTestElements(getByRole, frontButtonLabel, endButtonLabel);
        const  {homeLink, baseComponentsLink, simpleLink, singleSubNavLink } = getSimpleLinkTestElements(getByRole)

         expect(simpleLink).toBeInTheDocument();
        await userEvent.tab();
        expect(frontButton).toHaveFocus();
        await userEvent.tab();
        expect(frontButton).not.toHaveFocus();
        expect(homeLink).toHaveFocus();
        await userEvent.keyboard("{ArrowRight}");
        expect(baseComponentsLink).toHaveFocus();
        await userEvent.keyboard("{ArrowRight}");
        expect(simpleLink).toHaveFocus();
        await userEvent.keyboard("{Home}");
        expect(homeLink).toHaveFocus();
        await userEvent.keyboard("{End}");
        expect(singleSubNavLink).toHaveFocus();

        await userEvent.keyboard("{ArrowLeft}");
        expect(simpleLink).toHaveFocus();
        await userEvent.keyboard("{ArrowRight}");
        await userEvent.keyboard("{ArrowRight}");
        expect(homeLink).toHaveFocus();
        await userEvent.keyboard("{ArrowLeft}");
        expect(singleSubNavLink).toHaveFocus();
        

    });
    it('should move up and down the closed subnavigation using the home, end, right and left arrow key', async () => {
        const navigation = transformNavigation(singleSubNavObj, TEST_ID);
        const optProps = {
            ...reqProps,
            children: navigation,
        }
        const {getByRole, getByTestId} = renderNavigation(optProps);
       const {frontButton} = getCommonTestElements(getByRole, frontButtonLabel, endButtonLabel);
       const {aboutLink, readButton, blogLink } = getSubNavTestElements(getByRole, getByTestId, TEST_ID)

        await userEvent.tab();
        expect(frontButton).toHaveFocus();
        await userEvent.tab();
        expect(frontButton).not.toHaveFocus();
        expect(aboutLink).toHaveFocus();
        await userEvent.keyboard("{ArrowRight}");
        expect(readButton).toHaveFocus();
        await userEvent.keyboard("{ArrowRight}");
        expect(blogLink).toHaveFocus();
        await userEvent.keyboard("{ArrowLeft}");
        expect(readButton).toHaveFocus();
        await userEvent.keyboard("{Home}");
        expect(aboutLink).toHaveFocus();
        await userEvent.keyboard("{ArrowRight}");
        expect(readButton).toHaveFocus();
        await userEvent.keyboard("{End}");
        expect(blogLink).toHaveFocus();
        await userEvent.keyboard("{ArrowLeft}");
        expect(readButton).toHaveFocus();
        await userEvent.keyboard("{ArrowLeft}");
        expect(aboutLink).toHaveFocus();
    })

});
