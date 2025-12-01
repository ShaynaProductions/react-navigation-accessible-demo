"use client";
import {Link, Text} from "@/ui/components";

export function ExampleTwo() {

    return (<>
        <Text><strong><Link href="/examples/base-structure">Implementing Basic Structure</Link></strong></Text>
        <Text>A component is only as accessible as its semantic structure. By creating the base first, design can start
            implementing a look and feel while the developer concentrates on functionality and accessibility. A
            clickable prototype includes base aria states and properties.</Text>
        <Text>Associated with the article: <Link
            href=""
            openInNewTab={true}>First Layer - Implementing Basic Structure</Link></Text>
    </>);
}