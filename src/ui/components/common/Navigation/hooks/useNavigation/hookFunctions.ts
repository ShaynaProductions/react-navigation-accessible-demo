import {ParentElementType} from "@/ui/components";
import {
    FocusableElementType
} from "@/ui/components/common/Navigation/NavigationTypes";
import {
    ExternalNavHookProps
} from "@/ui/components/common/Navigation/hooks/useNavigation/useNavigationTypes";


export const getRecursiveLastElementByParent: ExternalNavHookProps["getRecursiveLastElementByParent"] = ((parentEl, getNavObjectByParent) => {

    const currentNavObject = getNavObjectByParent(parentEl);

    /* istanbul ignore next */
    const {storedList = []} = currentNavObject;
    const lastIndex = storedList.length - 1;
    if (storedList[lastIndex].type === "button") {
        const nextParentEl= storedList[lastIndex];
        return getRecursiveLastElementByParent(
            nextParentEl as ParentElementType,
            getNavObjectByParent,
        );
    } else {
        return storedList[lastIndex];
    }
});

export const getRecursiveTopParentByElement =
    (focusableEl, getNavObjectContainingElement, getIndexInTopRow) => {
        const {storedParentEl} = getNavObjectContainingElement(focusableEl);
        const indexInTopRow = getIndexInTopRow(
            storedParentEl as FocusableElementType,
        );
        if (storedParentEl && indexInTopRow < 0) {
            const parentNavObject = getNavObjectContainingElement(storedParentEl as FocusableElementType);

            return getRecursiveTopParentByElement(parentNavObject.storedParentEl as FocusableElementType, getIndexInTopRow, getNavObjectContainingElement);
        } else {
            return storedParentEl as ParentElementType;
        }
    };