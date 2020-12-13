import * as React from 'react';
import {SvgXml} from 'react-native-svg';
import {ViewStyle, StyleSheet} from 'react-native';

import {parseStrokeWidth} from '../constants';
import {Module} from "../components";
import {WireDirection} from '../types/enums';
import type {Wire, Terminal} from '../types';

const styles = StyleSheet.create({
  left: {
    position: 'absolute',
    top: '50%',
    left: 0,
  },
  right: {
    position: 'absolute',
    top: '50%',
    right: 0,
  },
});

export default function Battery({
  style,
  Input: maybeInput,
  Output: maybeOutput,
  color,
}: {
  readonly style?: ViewStyle;
  readonly Input?: readonly Wire[];
  readonly Output?: readonly Wire[];
  readonly color: string;
}): JSX.Element {
  const Input = React.useMemo(() => {
    return Array.isArray(maybeInput) ? maybeInput : [];
  }, [maybeInput]);
  const Output = React.useMemo(() => {
    return Array.isArray(maybeOutput) ? maybeOutput : [];
  }, [maybeOutput]);

  const inputStrokeWidth = React.useMemo((): number => {
    return Math.max(
      ...Input.map(({ pathProps }: Wire) => parseStrokeWidth(pathProps))
    );
  }, [Input]);

  const size = inputStrokeWidth * 11;
  return (
    <Module
      style={StyleSheet.flatten([style, {width: size, height: size}])}
      terminals={[
        ...Input.map((wire) => (
          {
            wire,
            wireDirection: WireDirection.SINK,
            style: styles.left,
          }
        )),
        ...Output.map((wire) => (
          {
            wire,
            wireDirection: WireDirection.SOURCE,
            style: styles.right,
          }
        )),
      ] as readonly Terminal[]}
    >
      <SvgXml
        style={{
          transform: [{scale: 1.1}],
        }}
        width={size}
        height={size}
        xml={`
<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg
   xmlns:dc="http://purl.org/dc/elements/1.1/"
   xmlns:cc="http://creativecommons.org/ns#"
   xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
   xmlns:svg="http://www.w3.org/2000/svg"
   xmlns="http://www.w3.org/2000/svg"
   xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
   xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
   id="svg2"
   sodipodi:docname="cell.svg"
   viewBox="0 0 100 100"
   version="1.0"
   inkscape:version="1.0beta2 (2b71d25, 2019-12-03)"
   width="100"
   height="100">
  <defs
     id="defs19" />
  <sodipodi:namedview
     id="namedview11"
     bordercolor="#666666"
     inkscape:pageshadow="2"
     guidetolerance="10"
     pagecolor="#ffffff"
     gridtolerance="10"
     inkscape:window-maximized="1"
     inkscape:zoom="5.658007"
     objecttolerance="10"
     borderopacity="1"
     inkscape:current-layer="svg2"
     inkscape:cx="50"
     inkscape:cy="50.921755"
     inkscape:window-y="23"
     inkscape:window-x="0"
     inkscape:window-width="1440"
     showgrid="false"
     inkscape:pageopacity="0"
     inkscape:window-height="803"
     inkscape:document-rotation="0" />
  <g
     id="g9397"
     transform="matrix(0,-2.3529412,2.3339228,0,0.52083739,104.2353)">
    <path
       id="path8384"
       style="fill:none;stroke:${color};stroke-width:1mm;stroke-linecap:square"
       inkscape:connector-curvature="0"
       d="M 23,26.6 V 40.7" />
    <path
       id="path8386"
       style="fill:none;stroke:${color};stroke-width:1mm;stroke-linecap:square"
       inkscape:connector-curvature="0"
       d="M 23,1.7 V 15.9" />
    <path
       id="path8391"
       style="fill:none;stroke:${color};stroke-width:2mm"
       inkscape:connector-curvature="0"
       d="M 37.2,24.8 H 8.9" />
    <path
       id="path9362"
       style="fill:none;stroke:${color};stroke-width:1mm"
       inkscape:connector-curvature="0"
       d="M 44.3,15.9 H 1.8" />
    <path
       id="path9378"
       style="fill:none;stroke:${color};stroke-width:0.5mm"
       inkscape:connector-curvature="0"
       d="M 32.8,7.5 H 44.3 M 38.6,1.7 v 11.6" />
  </g>
</svg>
        `}
      />
    </Module>
  );
}
