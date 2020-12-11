import * as React from 'react';
import Svg, {Path} from 'react-native-svg';
import {StyleSheet} from 'react-native';

import type {Nodes} from '../types';
import nodesToPoints from './nodesToPoints';
import findCenterPoint from './findCenterPoint';
import drawCurve from './drawCurve';
import { WireDirection } from '../types/enums';

const styles = StyleSheet.create({
  flex: {flex: 1},
})

export default function renderWire(nodes: Nodes): JSX.Element {
  if (Object.keys(nodes).length < 2) {
    return <React.Fragment />;
  }

  const nodesArray = Object.values(nodes);

  const points = nodesToPoints(nodesArray);
  const center = findCenterPoint(points); // likely delete

  const [source] = nodesArray.filter(
    ({ wireDirection }) => wireDirection === WireDirection.SOURCE
  );
  const [...sinks] = nodesArray.filter(
    ({ wireDirection }) => wireDirection === WireDirection.SINK
  );

  if (!source || !sinks.length) {
    return <React.Fragment />;
  }

  const [sourcePoint] = nodesToPoints([source]);
  return (
    <Svg style={styles.flex}>
      {sinks.map((sink, i) => {
        const [sinkPoint] = nodesToPoints([sink]);
        const d = drawCurve(sourcePoint, sinkPoint);
        return <Path key={`k${i}`} stroke="red" strokeWidth="2" d={d} fill="none" />;
      })}
    </Svg>
  );
}
