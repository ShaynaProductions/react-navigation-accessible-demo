import {Metadata} from "next";
import {BaseComponentsView} from "@/folio/BaseComponents";


export const metadata: Metadata = {
    title: "Base Components",
};

export default  function StoryOnePage() {

    return <BaseComponentsView />;
}