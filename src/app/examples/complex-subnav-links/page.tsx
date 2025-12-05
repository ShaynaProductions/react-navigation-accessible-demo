import {Metadata} from "next";
import * as fs from "fs";
import {ComplexSubNavigationLinkView} from "@/folio";
import "./page.css";

export const metadata: Metadata = {
    title: "Complex Subnavigation with Link End Example",
};
const jsonObj = fs.readFileSync(
    "public/__static__/complexStructureWithSubNavLinks.json",
    "utf8",
);

const nav = JSON.parse(jsonObj);

export default async function ComplexSubMenuLinkExamplePage() {
    if (nav) {
        return <ComplexSubNavigationLinkView navigation={nav}/>;
    }
}
