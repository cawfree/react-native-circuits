import * as React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';

import Circuit, {useWire, useRenderBezier, Junction} from '../lib';

import NotGate from './NotGate';

const styles = StyleSheet.create({
  alignCenter: {alignItems: 'center', flexDirection: 'row'},
  center: {alignItems: 'center', justifyContent: 'center'},
  flex: {flex: 1},
});

export default function Section(): JSX.Element {
  const renderBlackWire = useRenderBezier({stroke: "black", strokeWidth: "0.5"});
  const renderRedWire = useRenderBezier({stroke: "red", strokeWidth: "0.5"});
  const renderGreenWire = useRenderBezier({stroke: "green", strokeWidth: "0.5"});
  const renderPurpleWire = useRenderBezier({stroke: "purple", strokeWidth: "0.5"});

  const a = useWire(renderBlackWire);
  const b = useWire(renderRedWire);
  const c = useWire(renderGreenWire);
  const d = useWire(renderPurpleWire);

  return (
    <ScrollView style={styles.flex} key={Math.random()}>
      {/* Simple */}
      <Circuit style={styles.alignCenter}>
        <NotGate size={50} Output={a} />
          <View style={styles.flex} />
        <NotGate size={50} Input={a} Output={b} />
          <View style={styles.flex} />
        <NotGate size={50} Input={b} Output={c} />
          <View style={styles.flex} />
        <NotGate size={50} Input={c} />
      </Circuit>
      {/* Stippled */}
      <Circuit style={styles.alignCenter}>
        <NotGate size={50} Output={a} />
          <View style={styles.flex} />
        <NotGate size={50} Input={a} Output={b} style={{marginTop: 25}} />
          <View style={styles.flex} />
        <NotGate size={50} Input={b} />
      </Circuit>
      {/* USB */}
      <Circuit style={styles.alignCenter}>
        <NotGate size={50} Output={a} />
          <View style={styles.flex} />
        <Junction Left={[a]} Right={[b]} />
          <View style={styles.flex} />
        <NotGate size={50} Input={a} Output={c} style={{marginTop: -50}} />
          <View style={styles.flex} />
        <NotGate size={50} Input={b} Output={c} style={{marginTop: 50}} />
          <View style={styles.flex} />
        <NotGate size={50} Input={a} />
      </Circuit>
      {/* Junction */}
      <Circuit>
        <View style={styles.alignCenter}>
          <View>
            <NotGate size={50} Output={a} />
            <NotGate size={50} Output={b} />
          </View>
          <View style={styles.flex} />
            <View style={styles.center}>
              <Junction Left={[a, b]} Right={[c, d]}>
                <NotGate size={50} />
              </Junction>
            </View>
          <View style={styles.flex} />
          <View>
            <NotGate size={50} Input={c} />
            <NotGate size={50} Input={d} />
          </View>
        </View>
        

      </Circuit>
    </ScrollView>
  );
}
