import React, { act } from "react";
import { axe, render } from "@/test";
import {Header} from "@/folio/_site/Header/Header";


const renderHeaderComponent = () => {
    return render(<Header />);
}

describe("<HomeView Page />", () => {

    it("passes auto-wcag", async () => {
        const {container} = renderHeaderComponent();
        const results = await act(() => axe(container));
        expect(results).toHaveNoViolations();
    });
    });