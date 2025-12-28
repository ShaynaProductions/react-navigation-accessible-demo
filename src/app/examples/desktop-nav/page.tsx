import { Metadata } from "next";
import * as fs from "fs";
import { DesktopNavigationView } from "@/folio";
import "./page.css";

export const metadata: Metadata = {
  title: "Styled Desktop Navigation",
};

const jsonObj = fs.readFileSync(
  "public/__static__/complexStructureWithSubNav.json",
  "utf8",
);
const nav = JSON.parse(jsonObj);

export default async function SimpleLinksExamplePage() {
  if (nav) {
    return <DesktopNavigationView navigation={nav} />;
  }
}
