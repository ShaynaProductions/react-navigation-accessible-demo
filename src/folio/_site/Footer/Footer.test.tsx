import React, { act } from "react";
import { axe, render } from "@/test";
import {Footer} from "@/folio/_site/Footer/Footer";


const renderFooterComponent = () => {
    return render(<Footer />);
}

describe("<HomeView Page />", () => {
    
    it("passes auto-wcag", async () => {
        const {container} = renderFooterComponent();
        const results = await act(() => axe(container));
        expect(results).toHaveNoViolations();
    });
    });