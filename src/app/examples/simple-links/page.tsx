import { Metadata } from "next";
import {SimpleLinksView} from "@/folio";
import * as fs from "fs";

const jsonObj = fs.readFileSync(
    "public/__static__/simpleStructure.json",
    "utf8",
);
const nav = JSON.parse(jsonObj);

export const metadata: Metadata = {
    title: "Simple Links Example",
};

export default async function SimpleLinksExamplePage() {
  if (nav) {
    return <SimpleLinksView navigation={nav} />;
  }
}
