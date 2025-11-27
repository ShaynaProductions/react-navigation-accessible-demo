"use client";
import {Link, Text} from "@/ui/components";

export function ExampleOne() {

    return (<>
        <Text><strong><Link href="/examples/base-components">Accessible Base
            Components </Link></strong></Text>
      <Text>Discusses the creation and enhancement of specific base components to be used in
            navigation.</Text>
            <Text>Associated with the article: <Link
                href="https://dev.to/shaynaproductions/base-components-are-key-to-accessibility-2bd8"
                openInNewTab={true}>Base Components are key to accessibility</Link></Text>
    </>);
}