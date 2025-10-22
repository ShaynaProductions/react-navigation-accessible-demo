import {Icon, Text} from "@/source/components/base";
import {NewWindowIcon} from "@/source/svg";

export const getNewTab = (suppressNewIcon?: boolean) => {
    const newTabText = "opens in a new tab";

    const iconProps = {
        cx: "new-window",
        IconComponent: NewWindowIcon,
        label: "opens in a new tab",
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
