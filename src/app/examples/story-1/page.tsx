import {Metadata} from "next";
import StoryOneView from "./StoryOneView";

export const metadata: Metadata = {
    title: "Story 1 Base Components",
};

export default  function StoryOnePage() {

    return <StoryOneView />;
}