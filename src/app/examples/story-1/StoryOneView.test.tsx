import React, { act } from "react";
import { axe, render } from "@/test";
import StoryOneView from "./StoryOneView";


const renderStoryView = () => {
    return render(<StoryOneView />);
}

describe("<HomeView Page />", () => {

    it("passes auto-wcag", async () => {
        const {container} = renderStoryView();
        const results = await act(() => axe(container));
        expect(results).toHaveNoViolations();
    });
    });