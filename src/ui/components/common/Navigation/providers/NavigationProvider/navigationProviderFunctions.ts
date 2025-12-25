import { NavigationProviderFunctionsProps } from "./";

export const registerTopLevelParent: NavigationProviderFunctionsProps["registerTopLevelParent"] =
  (parentEl, setTopLevelParent) => {
    setTopLevelParent(parentEl);
  };
