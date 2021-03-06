import * as React from "react";
import { Path } from "react-native-svg";
import type {PathProps} from "react-native-svg";

import type { AggregatePoint, RenderWire, useRenderWireResult } from "../types";
import { bezier } from "../constants";
import { WireDirection } from "../types/enums";

export default function useRenderBezier(pathProps: PathProps): useRenderWireResult {
  const renderWire = React.useCallback(
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

      if (sinks.length === 1 && !!source) {
        const [sink] = sinks;
        const {wireId: sourceWire} = source;
        const {wireId: sinkWire} = sink;

        // TODO: Loop back.
        if (sourceWire === sinkWire) {}
      }

      return (
        <>
          {sinks.map((sink: AggregatePoint, i) => (
            <Path
              {...pathProps}
              key={`k${i}`}
              fill="none"
              d={bezier(source.point, sink.point)}
            />
          ))}
        </>
      );
    },
    [pathProps]
  ) as RenderWire;
  return {renderWire, pathProps};
}
