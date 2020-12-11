import React from 'react';
import {Text, Animated} from 'react-native';

import Circuits, {Circuit, useWire, renderWire, WireDirection} from './lib';

export default function App(): JSX.Element {
  const wire = useWire({renderWire});
  const progress = React.useMemo(() => new Animated.Value(0), []);
  React.useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [progress]);
  return (
    <Circuits>
      <Circuit.Element
        wires={[
          [
            wire,
            {
              wireDirection: WireDirection.SOURCE,
              width: 20,
              height: 20,
              backgroundColor: "green",
            },
          ],
          [
            wire,
            {
              wireDirection: WireDirection.SINK,
              position: "absolute",
              transform: [{ translateY: Animated.multiply(progress, 100) }],
              right: 0,
              width: 20,
              height: 20,
              backgroundColor: "purple",
            },
          ],
        ]}
      >
        <Text>hihihi aisjdiasjfsanfoanf</Text>
      </Circuit.Element>
    </Circuits>
  );
}
