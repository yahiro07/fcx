import * as React from "react";
import { FC, ReactNode } from "react";

export function domStyled(
  jsxNode: React.JSX.Element,
  additionalClassName: string | undefined
): ReactNode {
  return {
    ...jsxNode,
    props: {
      ...jsxNode.props,
      className: [jsxNode.props.className, additionalClassName]
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
