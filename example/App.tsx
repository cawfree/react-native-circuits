import * as React from 'react';
import { Text, ScrollView, View, Image, StyleSheet, TouchableOpacity } from "react-native";
import {StrokeProps} from 'react-native-svg';

import Circuit, {
  useWire,
  useRenderBezier,
  Junction,
  Bulb,
  Parallel,
} from "./lib";
//"react-native-circuits";

import {NotGate} from './components';

const styles = StyleSheet.create({
  alignCenter: {alignItems: 'center', flexDirection: 'row'},
  center: {alignItems: 'center', justifyContent: 'center'},
  flex: {flex: 1},
  row: {flexDirection: 'row'},
});

export default function App(): JSX.Element {
  const redStroke = React.useMemo(
    () => ({
      stroke: "red",
      strokeWidth: "0.5",
    }),
    []
  ) as StrokeProps;

  const renderBlackWire = useRenderBezier({stroke: "black", strokeWidth: "0.5"});
  const renderRedWire = useRenderBezier(redStroke);
  const renderGreenWire = useRenderBezier({stroke: "green", strokeWidth: "0.5"});
  const renderPurpleWire = useRenderBezier({stroke: "purple", strokeWidth: "0.5"});
  const renderBlueWire = useRenderBezier({stroke: "blue", strokeWidth: "0.5"});
  const renderLimeWire = useRenderBezier({stroke: "lime", strokeWidth: "0.5"});
  
  const prettyColor = "#F7B9A5";
  const renderChunkyWire = useRenderBezier({stroke: prettyColor, strokeWidth: "3"});

  const a = useWire(renderBlackWire);
  const b = useWire(renderRedWire);
  const c = useWire(renderGreenWire);
  const d = useWire(renderPurpleWire);
  const e = useWire(renderBlueWire);
  const f = useWire(renderLimeWire);

  const g = useWire(renderChunkyWire);
  const h = useWire(renderChunkyWire);

  return (
    <ScrollView style={styles.flex}>
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
        <NotGate size={50} Input={a} Output={b} style={{ marginTop: 25 }} />
        <View style={styles.flex} />
        <NotGate size={50} Input={b} />
      </Circuit>
      {/* USB */}
      <Circuit style={styles.alignCenter}>
        <NotGate size={50} Output={a} />
        <View style={styles.flex} />
        <Junction Left={[a]} Right={[b]} />
        <View style={styles.flex} />
        <NotGate size={50} Input={a} Output={c} style={{ marginTop: -50 }} />
        <View style={styles.flex} />
        <NotGate size={50} Input={b} Output={c} style={{ marginTop: 50 }} />
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
      {/* Bulb */}
      <Circuit>
        <View style={styles.alignCenter}>
          <View style={styles.center}>
            <NotGate size={50} Output={a} />
          </View>
          <View style={styles.flex} />
          <View style={styles.center}>
            <Bulb
              style={{
                width: 100,
                height: 100,
                borderRadius: 50,
                overflow: "hidden",
                alignItems: "center",
                justifyContent: "center",
              }}
              Left={[a]}
              Right={[b]}
              strokeProps={redStroke}
            >
              <TouchableOpacity style={StyleSheet.absoluteFill}>
                <Image
                  style={StyleSheet.absoluteFill}
                  source={{
                    uri:
                      "https://99designs-blog.imgix.net/blog/wp-content/uploads/2018/12/Gradient_builder_2.jpg?auto=format&q=60&w=1815&h=1200&fit=crop&crop=faces",
                  }}
                />
              </TouchableOpacity>
            </Bulb>
          </View>
          <View style={styles.flex} />
          <View>
            <NotGate size={50} Input={b} />
            <NotGate size={50} Input={b} />
            <NotGate size={50} Input={b} />
          </View>
        </View>
      </Circuit>
      {/* Curvy */}
      <Circuit style={styles.row}>
        <View>
          <Junction Right={[a, b, c]} />
        </View>
        <View style={styles.flex} />
        <View>
          <NotGate size={50} Input={a} Output={d} />
          <NotGate size={50} Input={b} Output={e} />
          <NotGate size={50} Input={c} Output={f} />
        </View>
        <View style={styles.flex} />
        <View>
          <Junction Left={[d, e, f]} />
        </View>
      </Circuit>
      {/* Parallel Text */}
      <Circuit
        style={StyleSheet.flatten([styles.alignCenter, { padding: 10 }])}
      >
        <View>
          <Junction Right={[g]} />
        </View>
        <View style={styles.flex} />
        <Parallel Input={g} Output={h}>
          <Text
            style={{
              paddingVertical: 20,
              paddingHorizontal: 80,
              fontSize: 20,
              fontWeight: 'bold',
              color: prettyColor,
            }}
          >
            react-native-circuits
          </Text>
        </Parallel>
        <View style={styles.flex} />
        <View>
          <Junction Left={[h]} />
        </View>
      </Circuit>
      {/* Bulb Stress Test */}
      <Circuit>
        <View style={styles.alignCenter}>
          <View style={styles.center}>
            <NotGate size={50} Output={a} />
          </View>
          <View style={styles.flex} />
          <View style={styles.center}>
            <Bulb
              style={{
                width: 100,
                height: 100,
              }}
              Left={[a]}
              Right={[b]}
              strokeProps={redStroke}
            />
          </View>
          <View style={styles.flex} />
          <View>
            <NotGate size={50} Input={b} />
            <NotGate size={50} Input={b} />
            <NotGate size={50} Input={b} />
          </View>
        </View>
      </Circuit>
    </ScrollView>
  );
}
