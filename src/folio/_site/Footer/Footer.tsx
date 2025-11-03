"use client";
import { JSX } from "react";
import { Link, Text } from "@/source/components";

export const Footer = (): JSX.Element => {
    const today = new Date();

    return (
        <footer>
            <Text>
                <abbr title="copyright">&#169;</abbr> {today.getFullYear()}{" "}
                <Link
                    href="https://www.shaynaproductions.com/"
                    openInNewTab={false}
                >
                    Shayna Productions
                </Link>
            </Text>
        </footer>
    );
};
