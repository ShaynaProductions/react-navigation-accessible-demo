import {Metadata} from "next";
import {BaseComponentsView} from "@/folio/";

import "./page.css";

export const metadata: Metadata = {
    title: "Base Components",
};

export default  function BaseComponentsPage() {

    return <BaseComponentsView />;
}