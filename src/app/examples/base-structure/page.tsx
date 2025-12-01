import * as fs from "fs";
import {Metadata} from "next";
import {BaseStructureView} from "@/folio/BaseStructure/BaseStructureView";

export const metadata: Metadata = {
    title: "Basic Structure",
};
const jsonObj = fs.readFileSync(
    "public/__static__/complexStructureWithSubNav.json",
    "utf8",
);
export default function BasicStructurePage() {
    const nav = JSON.parse(jsonObj);
    if(nav){
        return <BaseStructureView navigation={nav}/>;
    }
}