import { Fragment, ReactNode } from "react";
import {
  NavigationLink,
  NavigationLinkProps,
  SubNavigation,
} from "@/ui/components";

export function transformNavigation(
  mainMenu: NavigationLinkProps[],
  testId?: string,
): Iterable<ReactNode> {
  return mainMenu.map((item) => (
    <Fragment key={`menu-${item.id}`}>
      {item.menu ? (
        <SubNavigation
          key={item.id}
          id={item.id}
          label={item.label}
          testId={testId && `${testId}-${item.id}`}
        >
          {transformNavigation(item.menu, testId)}
        </SubNavigation>
      ) : (
        <NavigationLink
          id={item.id}
          key={item.id}
          label={item.label}
          href={item.href}
          testId={testId && `${testId}-${item.id}`}
        />
      )}
    </Fragment>
  ));
}
