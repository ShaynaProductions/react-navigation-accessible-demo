import {Metadata} from "next";
import * as fs from "fs";
import {LinksButtonsView} from "@/folio";
import "./page.css";

export const metadata: Metadata = {
    title: "Simple Links Navigation with buttons outside of the component",
};

const jsonObj = fs.readFileSync(
    "public/__static__/simpleStructure.json",
    "utf8",
);
const nav = JSON.parse(jsonObj);

export default async function SimpleLinksExamplePage() {
    if (nav) {
        return <LinksButtonsView navigation={nav}/>;
    }
}
