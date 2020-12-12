import * as React from 'react';
import {View} from 'react-native';

import {CircuitContext} from '../contexts';
import {FitSvg} from '../components';
import {useCircuit} from '../hooks';
import type {
  AggregateLayout,
  CircuitProviderProps,
  Point,
  PointsBuffer,
  SvgRenderMethod,
  Wire,
  WireBuffer,
} from "../types";
import {WireDirection} from '../types/enums';

export default function CircuitProvider({
  style,
  children,
}: CircuitProviderProps): JSX.Element {
  const ref = React.useRef<View>();
  const defaultValue = useCircuit();
  const [wireBuffer, setWireBuffer] = React.useState<WireBuffer>({});
  const onTerminalMoved = React.useCallback((
    terminalId: string,
    wire: Wire,
    wireDirection: WireDirection,
    point: Point,
  ): void => {
    setWireBuffer((currentWireBuffer: WireBuffer) => {
      const pointsBuffer = (currentWireBuffer[wire.wireId] || {}) as PointsBuffer;
      const nextPoint = {wireDirection, point};
      const {renderWire} = wire;
      const nextPointsBuffer = {
        ...pointsBuffer,
        [terminalId]: nextPoint,
        renderWire,
      } as PointsBuffer;
      return {
        ...currentWireBuffer,
        [wire.wireId]: nextPointsBuffer,
      };
    });
  }, [setWireBuffer]);
  const onTerminalsDestroyed = React.useCallback((terminalIds: readonly string[]) => {
    setWireBuffer((currentWireBuffer: WireBuffer) => {
      return Object.fromEntries(
        Object.entries(currentWireBuffer).filter(([k]) => terminalIds.indexOf(k) < 0),
      );
    });
  }, [setWireBuffer]);
  const value = React.useMemo(
    () => ({
      ...defaultValue,
      onTerminalMoved,
      onTerminalsDestroyed,
    }),
    [defaultValue, onTerminalMoved, onTerminalsDestroyed]
  );
  const render = React.useCallback((layout: AggregateLayout): JSX.Element[] => {
    return Object.entries(wireBuffer).map(
      ([wireId, { renderWire, ...extras }], i) => (
        <React.Fragment key={`k${i}`}>
          {renderWire(
            Object.entries(extras).map(([key, { point, ...extras }]) => ({
              ...extras,
              point: [point[0] - layout.pageX, point[1] - layout.pageY],
              wireId,
            }))
          )}
        </React.Fragment>
      )
    );
  }, [wireBuffer]) as SvgRenderMethod;
  return (
    <CircuitContext.Provider value={value}>
      <FitSvg style={style} render={render}>{children}</FitSvg>
    </CircuitContext.Provider>
  );
}
