import * as React from "react";
import { FC, ReactNode } from "react";

export function domStyled(
  vdom: React.JSX.Element,
  additionalClassName: string | undefined
): ReactNode {
  return {
    ...vdom,
    props: {
      ...vdom.props,
      className: [vdom.props.className, additionalClassName]
        .filter((it) => !!it)
        .join(" "),
    },
  };
}

export function createFCX<T extends {}>(
  baseFC: FC<T>,
  attachedCssClassName?: string
): FC<T> {
  if (!attachedCssClassName) {
    return baseFC;
  }
  return (props: T) => {
    const jsxNode = baseFC(props);
    if (jsxNode) {
      return domStyled(jsxNode as React.JSX.Element, attachedCssClassName);
    }
    return jsxNode;
  };
}
