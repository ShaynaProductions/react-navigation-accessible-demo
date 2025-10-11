"use client";
import { JSX } from "react";
import { ExternalLink, Text } from "@/source/components";

export const Footer = (): JSX.Element => {
    const today = new Date();

    return (
        <footer>
            <Text>
                <abbr title="copyright">&#169;</abbr> {today.getFullYear()}{" "}
                <ExternalLink
                    href="https://www.shaynaproductions.com/"
                    openInNewTab={true}
                >
                    Shayna Productions
                </ExternalLink>
            </Text>
        </footer>
    );
};
