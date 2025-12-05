import { Metadata } from "next";

import {HomeView} from "@/folio/Home/";
import "./page.css";


export const metadata: Metadata = {
    title: "React Navigation, an Accessible Demonstration",
};

export default function HomePage() {
    return (<HomeView />);
}
