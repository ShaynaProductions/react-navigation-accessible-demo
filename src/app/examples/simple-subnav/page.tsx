import { Metadata } from "next";
import {SimpleSubNavigationView} from "@/folio";
import * as fs from "fs";

export const metadata: Metadata = {
  title: "Simple Subnavigation Example",
};

const jsonObj = fs.readFileSync(
    "public/__static__/SimpleStructureWithSubNav.json",
    "utf8",
);
const nav = JSON.parse(jsonObj);

export default async function SimpleSubNavExamplePage() {
  if (nav) {
    return <SimpleSubNavigationView navigation={nav} />;
  }
}
