import {Text} from "@/source/components/base";
import {NewWindowIcon} from "@/source/icons";

export const getNewTab = (suppressNewIcon?: boolean) => {
    const newTabText = "opens in a new tab";
    if (suppressNewIcon) {
        return (
            <Text isInline={true} isHidden={true}>{newTabText}</Text>
        );
    } else {
        return (
            <NewWindowIcon cx="new-window" label={newTabText}/>
        );
    }
};
