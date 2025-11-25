import { Metadata } from "next";

import {HomeView} from "@/folio/Home/";


export const metadata: Metadata = {
    title: "Home",
};

export default function HomePage() {
    return <HomeView />;
}
