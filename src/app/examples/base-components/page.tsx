import {Metadata} from "next";
import {BaseComponentsView} from "@/folio/";


export const metadata: Metadata = {
    title: "Base Components",
};

export default  function BaseComponentsPage() {

    return <BaseComponentsView />;
}