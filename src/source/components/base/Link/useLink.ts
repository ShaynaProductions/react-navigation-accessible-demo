import { sanitizeUrl } from "@braintree/sanitize-url";

export default function useLink() {
    const getIsTargetSpecific = (linkTarget: string) => {
        const nonTargeted = ["_parent", "_self", "_top"];
        return nonTargeted.indexOf(linkTarget) === -1;
    };

    const getLinkTarget = (openInNewTab?: boolean, target?: string): string => {
        if (target) {
            return target;
        } else {
            return openInNewTab ? "_blank" : "_self";
        }
    };

    const getSafeHref = (isDisabled: boolean, url: string) => {
        if (isDisabled) {
            return;
        }
        return sanitizeUrl(url);
    };

    return {
        getLinkTarget,
        getIsTargetSpecific,
        getSafeHref,
    };
}
