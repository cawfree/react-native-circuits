import * as React from 'react';
import {Animated, StyleSheet} from 'react-native';
import {nanoid} from 'nanoid/non-secure';

import ActiveComponent from './ActiveComponent';
import {useCircuit} from '../hooks';

import type {ModuleProps, Terminal, Point, Wire} from '../types';
import {WireDirection} from '../types/enums';

function Module({
  style,
  children,
  terminals: maybeTerminals,
}: ModuleProps): JSX.Element {
  const terminals = React.useMemo(() => maybeTerminals || [], [
    maybeTerminals,
  ]);
  const { onTerminalMoved, sensitivityList } = useCircuit();
  const moduleId = React.useMemo(nanoid, []);
  const getTerminalId = React.useCallback(
    (index: number) => {
      return `${moduleId}.${index}`;
    },
    [moduleId]
  );
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
    <Animated.View style={style} onLayout={onLayout}>
      {children}
      <Animated.View style={StyleSheet.absoluteFill} pointerEvents="none">
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
                sensitivityList={sensitivityList}
              >
                <React.Fragment />
              </ActiveComponent>
            );
          }
        )}
        {/* TODO: Terminals. */}
      </Animated.View>
    </Animated.View>
  );
}

export default React.memo(Module);