import React, { act } from "react";
import { axe, render} from "@/test";
import HomeView from "@/app/HomeView";


const renderHomeComponent = () => {
    return render(<HomeView />);
}

describe("<HomeView Page />", () => {


    it("passes auto-wcag", async () => {
        const {container} = renderHomeComponent();
        const results = await act(() => axe(container));
        expect(results).toHaveNoViolations();
    });
    });