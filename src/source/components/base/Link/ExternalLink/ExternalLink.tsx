"use client";
import {JSX, RefObject, useEffect, useRef} from "react";
import {Link as RacLink} from "react-aria-components";

import {mergeRefs, returnTrueElementOrUndefined} from "@/source/utilities";

import {ExternalLinkProps} from "../LinkTypes";
import {getNewTab} from "../linkUI";
import useLink from "../useLink";

export function ExternalLink({
     children,
     cx,
     href,
     isDisabled,
     openInNewTab,
     ref,
     suppressNewIcon,
     target,
     testId,
     ...rest
 }: ExternalLinkProps): JSX.Element {
    const {getLinkTarget, getIsTargetSpecific, getSafeHref} = useLink();
    const linkRef = useRef<HTMLAnchorElement>(null);
    const combinedRef = mergeRefs(
        linkRef as RefObject<HTMLAnchorElement>,
        ref,
    ) as RefObject<HTMLAnchorElement>;

    const safeHref = getSafeHref(!!isDisabled, href);

    const linkTarget = getLinkTarget(openInNewTab, target);
    const isTargetSpecific = getIsTargetSpecific(linkTarget);

    const willOpenInNewTab = openInNewTab || isTargetSpecific;
    const newTab = getNewTab(!!suppressNewIcon || !!target);


    useEffect(() => {
        const linkEl = linkRef.current;
        if (isDisabled) {
            linkEl?.setAttribute("aria-disabled", "true");
        } else {
            linkEl?.removeAttribute("aria-disabled");
        }
    }, [linkRef, isDisabled]);



    const racProps = {
        ...rest,
        className: cx,
        "data-testid": testId,
        href: safeHref,
        openInNewTab,
        ref: combinedRef,
        target: linkTarget,
    };

    return (
        <>
            <RacLink {...racProps}>
                {children}
                {willOpenInNewTab && newTab}
            </RacLink>
        </>
    );
}
