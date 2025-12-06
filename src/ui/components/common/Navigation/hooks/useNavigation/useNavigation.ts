import {NavigationContext} from "@/ui/components/common/Navigation/providers/NavigationProvider/NavigationProvider";
import {use} from "react";
import {returnTrueElementOrUndefined} from "@/ui/utilities";


export default function useNavigation() {
    const navigationContextObj = use(NavigationContext);
    const {_registerNavItem, _registerSubNav, _setListItems} =
        returnTrueElementOrUndefined(!!navigationContextObj, navigationContextObj);
    

    return {
       registerNavigationItem: _registerNavItem,
        registerSubNavigation: _registerSubNav,
        setListItems: _setListItems,
    }

}