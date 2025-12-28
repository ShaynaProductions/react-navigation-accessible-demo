import { Metadata } from "next";

import * as fs from "fs";
import "./page.css";
import { MobileNavigationView } from "@/folio/Examples";

export const metadata: Metadata = {
  title: "Mobile Navigation Example",
};

export default async function SimpleSubNavExamplePage() {
  const jsonObj = fs.readFileSync(
    "public/__static__/complexStructureWithSubNav.json",
    "utf8",
  );

  const nav = JSON.parse(jsonObj);
  if (nav) {
    return <MobileNavigationView navigation={nav} />;
  }
}
