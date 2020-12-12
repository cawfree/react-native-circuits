import * as React from "react";
import { Path } from "react-native-svg";
import type {PathProps} from "react-native-svg";

import type { AggregatePoint, RenderWire } from "../types";
import { bezier } from "../constants";
import { WireDirection } from "../types/enums";

export default function useRenderWire(pathProps: PathProps): RenderWire {
  return React.useCallback(
    (points): JSX.Element => {
      if (points.length < 2) {
        return <React.Fragment />;
      }
      const [maybeSource] = points.filter(
        ({ wireDirection }) => wireDirection === WireDirection.SOURCE
      );
      const [...sinks] = points.filter(
        ({ wireDirection }) => wireDirection === WireDirection.SINK
      );
      if (!maybeSource || sinks.length === 0) {
        return <React.Fragment />;
      }
      const source = maybeSource as AggregatePoint;
      return (
        <>
          {sinks.map((sink: AggregatePoint, i) => (
            <Path
              {...pathProps}
              key={`k${i}`}
              d={bezier(source.point, sink.point)}
            />
          ))}
        </>
      );
    },
    [pathProps]
  );
}
