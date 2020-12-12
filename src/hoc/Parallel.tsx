import * as React from 'react';
import {View, ViewStyle, StyleSheet} from 'react-native';
import {ReactChildren, Wire} from '../types';

import Junction from './Junction';
import {useWire} from '../hooks';
import { Module } from '../components';

const styles = StyleSheet.create({
  flex: {flex: 1},
  left: {position: 'absolute', left: 0, top: '50%'},
  top: {position: 'absolute', left: '50%', top: 0},
  bottom: {position: 'absolute', left: '50%', bottom: 0},
  right: {position: 'absolute', right: 0, top: '50%'},
});

export default function Parallel({
  style,
  children,
  Input,
  Output,
} : {
  readonly style?: ViewStyle;
  readonly children?: ReactChildren;
  readonly Input: Wire;
  readonly Output: Wire;
}): JSX.Element {
  const a = useWire(Input);
  const b = useWire(Input);
  const c = useWire(Input);
  return (
    <View style={style}>
      {children}
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        <Junction Left={[Input]} style={styles.left} />
        <Junction Right={[Output]} style={styles.right} />
        <Junction Right={[a]} style={styles.left} />
        <Junction Left={[a]} Right={[b]} style={styles.top} />
        <Junction Left={[a]} Right={[c]} style={styles.bottom} />
        <Junction Left={[b]} style={styles.right} />
        <Junction Left={[c]} style={styles.right} />
      </View>
    </View>
  );
}
//<Junction Left={[Input]} Right={[Output]} style={style}>
//      <Junction Right={[a]} style={styles.left} />
//      <Junction Left={[a]} style={styles.top} />
//      <View style={styles.flex}>
//        {children}
//      </View>
//    </Junction>
