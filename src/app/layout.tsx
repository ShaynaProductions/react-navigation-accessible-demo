import {ReactNode} from "react";
import type {Metadata} from "next";
import {Footer, Header} from "@/folio/_site/";
import "./globals.css";
import "./layout.css";

export const metadata: Metadata = {
    title: "React Accessible Navigation Demo",
    description: "Examples",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <title>{metadata.title as string}</title>
        </head>
        <body>
            <Header/>
            <main id="default">{children}</main>
            <Footer/>
        </body>
        </html>
    );
}
