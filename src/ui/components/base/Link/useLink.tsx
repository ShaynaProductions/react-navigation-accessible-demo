import { sanitizeUrl } from "@braintree/sanitize-url";
import {NewWindowIcon} from "@/ui/svg";
import {Icon, Text} from "@/ui/components";
import  {UseLinkProps} from "@/ui/components/base/Link";

export default function useLink() {
    const getIsTargetSpecific: UseLinkProps["GetIsTargetSpecificTypes"] = (linkTarget) => {
        const nonTargeted = ["_parent", "_self", "_top"];
        return nonTargeted.indexOf(linkTarget) === -1;
    };

    const getLinkTarget: UseLinkProps["GetLinkTargetTypes"] = (openInNewTab, target) => {
        if (target) {
            return target;
        } else {
            return openInNewTab ? "_blank" : "_self";
        }
    };
    const getNewTab: UseLinkProps["GetNewTabTypes"] = (suppressNewIcon, label) => {
        const newTabText = label || "opens in a new tab";

        const iconProps = {
            cx: "new-window",
            IconComponent: NewWindowIcon,
            label: newTabText,
        }
        if (suppressNewIcon) {
            return (
                <Text isInline={true} isHidden={true}>{newTabText}</Text>
            );
        } else {
            return (
                <Icon {...iconProps}/>
            );
        }
    };

    const getSafeHref: UseLinkProps["GetSafeHrefTypes"] = (isDisabled, url) => {
        if (isDisabled) {
            return;
        }
        return sanitizeUrl(url);
    };



    return {
        getIsTargetSpecific,
        getLinkTarget,
        getNewTab,
        getSafeHref,
    };
}
