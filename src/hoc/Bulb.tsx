import * as React from "react";
import { Circle, StrokeProps } from "react-native-svg";

import { parseStrokeWidth } from "../constants";
import { FitSvg } from "../components";
import { AggregateLayout, JunctionProps, ReactChildren } from "../types";
import Junction from "./Junction";

export default function Bulb({
  style,
  children,
  strokeProps,
  Top,
  Left,
  Bottom,
  Right,
}: JunctionProps & {
  readonly strokeProps: StrokeProps;
}): JSX.Element {
  const render = React.useCallback(
    ({ width, height }: AggregateLayout): ReactChildren => {
      return (
        <Circle
          cx={width * 0.5}
          cy={height * 0.5}
          r={width * 0.5}
          {...(strokeProps || {})}
          fill="none"
        />
      );
    },
    [strokeProps]
  );
  return (
    <Junction Top={Top} Left={Left} Bottom={Bottom} Right={Right}>
      <FitSvg
        style={style}
        render={render}
        extraPadding={parseStrokeWidth(strokeProps)}
      >
        {children}
      </FitSvg>
    </Junction>
  );
}
