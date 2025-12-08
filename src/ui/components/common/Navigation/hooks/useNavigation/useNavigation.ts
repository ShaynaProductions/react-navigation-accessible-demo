import {use, useCallback} from "react";
import {returnTrueElementOrUndefined} from "@/ui/utilities";
import {NavigationContext} from "../../providers";
import {UseNavigationTypes} from "./useNavigationTypes";


export default function useNavigation() {
    const navigationContextObj = use(NavigationContext);
    const {_getNavigationArray, _registerNavLink, _registerSubNav, _resetTopNavArray, _setListItems} =
        returnTrueElementOrUndefined(!!navigationContextObj, navigationContextObj);

    const getNavigationParent: UseNavigationTypes["getNavigationParent"] =
        useCallback(() => {
            return _getNavigationArray()[0];
        }, [_getNavigationArray]);


    return {
        getNavigationParent,
        registerNavigationItem: _registerNavLink,
        registerSubNavigation: _registerSubNav,
        _resetTopNavArray: _resetTopNavArray,
        setListItems: _setListItems,
    }

}