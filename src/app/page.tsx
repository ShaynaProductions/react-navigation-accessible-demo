import { Metadata } from "next";

import HomeView from "@/app/HomeView";
import "./page.css";


export const metadata: Metadata = {
    title: "Home",
};

export default function HomePage() {
    return <HomeView />;
}
