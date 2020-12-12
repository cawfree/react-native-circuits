import * as React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';

import {Module} from '../components';
import { ReactChildren, Wire, Terminal } from '../types';
import { WireDirection } from '../types/enums';

const styles = StyleSheet.create({
  left: {
    position: 'absolute',
    left: 0,
    top: '50%',
  },
  top: {
    position: 'absolute',
    left: '50%',
    top: 0,
  },
  bottom: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
  },
  right: {
    position: 'absolute',
    top: '50%',
    right: 0,
  },
});

export default function Junction({
  style,
  children,
  Left,
  Top,
  Bottom,
  Right,
}: {
  readonly style?: ViewStyle;
  readonly children?: ReactChildren;
  readonly Left?: Wire[];
  readonly Top?: Wire[];
  readonly Bottom?: Wire[];
  readonly Right?: Wire[];
}): JSX.Element {
  const terminals = React.useMemo((): readonly Terminal[] => {
    return [
      ...(Left || []).map((wire) => ({wire, style: styles.left, wireDirection: WireDirection.SINK})),
      ...(Top || []).map((wire) => ({wire, style: styles.top, wireDirection: WireDirection.SINK})),
      ...(Bottom || []).map((wire) => ({wire, style: styles.bottom, wireDirection: WireDirection.SOURCE})),
      ...(Right || []).map((wire) => ({wire, style: styles.right, wireDirection: WireDirection.SOURCE})),
    ];
  }, [Left, Top, Bottom, Right]);
  return (
    <Module style={style} terminals={terminals}>
      {children}
    </Module>
  );
}
