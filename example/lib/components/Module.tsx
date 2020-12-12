import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {nanoid} from 'nanoid/non-secure';

import ActiveComponent from './ActiveComponent';
import {useCircuit} from '../hooks';

import type {ModuleProps, Terminal, Point, Wire} from '../types';
import {WireDirection} from '../types/enums';

export default function Module({
  style,
  children,
  terminals: maybeTerminals,
}: ModuleProps): JSX.Element {
  const terminals = React.useMemo(() => maybeTerminals || [], [
    maybeTerminals,
  ]);
  const { onTerminalMoved, onTerminalsDestroyed } = useCircuit();
  const moduleId = React.useMemo(nanoid, []);
  const getTerminalId = React.useCallback(
    (index: number) => {
      return `${moduleId}.${index}`;
    },
    [moduleId]
  );
  const moduleTerminals = React.useMemo(() => {
    return terminals.map((_, i) => getTerminalId(i));
  }, [moduleId, terminals, getTerminalId]);
  const [lastTerminals, setLastTerminals] = React.useState([]);
  React.useEffect(() => {
    setLastTerminals(moduleTerminals);
    return () => onTerminalsDestroyed(lastTerminals);
  }, [onTerminalsDestroyed, setLastTerminals, moduleTerminals]);
  const onMeasureTerminalBounds = React.useCallback(
    (
      terminalId: string,
      wire: Wire,
      wireDirection: WireDirection,
      x: number,
      y: number,
      width: number,
      height: number,
      pageX: number,
      pageY: number,
    ): void => {
      const point = [pageX + width * 0.5, pageY + height * 0.5] as Point;
      if (wire) {
        return onTerminalMoved(terminalId, wire, wireDirection, point);
      }
    },
    [onTerminalMoved]
  );
  const onLayout = React.useCallback(() => {
  }, [moduleId]);
  return (
    <View style={style} onLayout={onLayout}>
      {children}
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        {terminals.map(
          (
            { wireDirection, style: terminalStyle, wire }: Terminal,
            i: number
          ) => {
            const terminalId = getTerminalId(i);
            return (
              <ActiveComponent
                key={terminalId}
                onMeasureBounds={(...args) =>
                  onMeasureTerminalBounds(
                    terminalId,
                    wire,
                    wireDirection,
                    ...args
                  )
                }
                style={terminalStyle}
              />
            );
          }
        )}
      </View>
    </View>
  );
}
