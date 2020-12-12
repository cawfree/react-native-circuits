import React from 'react';
import {Text, Animated, useWindowDimensions} from 'react-native';

import Circuits, {Circuit, useWire, renderWire, WireDirection} from './lib';

export default function App(): JSX.Element {
  const {height} = useWindowDimensions();
  const wire = useWire({renderWire});
  const progress = React.useMemo(() => new Animated.Value(0), []);
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
              right: 0,
              top: height,
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
