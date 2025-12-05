import {Metadata} from "next";
import * as fs from "fs";

import {ComplexSubNavigationView} from "@/folio";
import "./page.css";

export const metadata: Metadata = {
    title: "Complex Subnavigation Example",
};

const jsonObj = fs.readFileSync(
    "public/__static__/complexStructureWithSubNav.json",
    "utf8",
);
const nav = JSON.parse(jsonObj);

export default async function ComplexSubMenuExamplePage() {
if (nav) {
        return <ComplexSubNavigationView navigation={nav}/>;
    }
}
