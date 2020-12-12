import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import Svg from 'react-native-svg';

import {CircuitContext} from '../contexts';
import {useCircuit} from '../hooks';
import type {CircuitProviderProps, Point, PointsBuffer, Wire, WireBuffer} from '../types';
import {WireDirection} from '../types/enums';

export default function CircuitProvider({
  style,
  children,
}: CircuitProviderProps): JSX.Element {
  const ref = React.useRef<View>();
  const defaultValue = useCircuit();
  const [wireBuffer, setWireBuffer] = React.useState<WireBuffer>({});
  const [layout, setLayout] = React.useState(null);
  const onMeasureLayout = React.useCallback(
    (
      x: number,
      y: number,
      width: number,
      height: number,
      pageX: number,
      pageY: number
    ) => {
      setLayout({x, y, width, height, pageX, pageY});
    },
    [setLayout]
  );
  const onLayout = React.useCallback(() => {
    ref.current.measure(onMeasureLayout);
  }, [ref, onMeasureLayout]); /* hack */
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
  return (
    <CircuitContext.Provider value={value}>
      <View style={style}>
        <View
          style={StyleSheet.absoluteFill}
          pointerEvents="none"
          onLayout={onLayout}
          ref={ref}
        >
          {!!layout && (
            <Svg
              style={StyleSheet.absoluteFill}
              width={layout.width}
              height={layout.height}
              viewBox={`0 0 ${layout.width} ${layout.height}`}
            >
              {Object.entries(wireBuffer).map(
                ([wireId, {renderWire, ...extras}], i) => (
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
              )}
            </Svg>
          )}
        </View>
        {children}
      </View>
    </CircuitContext.Provider>
  );
}
