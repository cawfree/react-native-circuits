import * as React from 'react';

import type {CircuitsContextValue, useWireResult, Node} from '../types';

const defaultValue = Object.freeze({
  onElementBounds: (node: Node, wire: useWireResult) => {
    throw new Error("You may only use a <Circuit.Element /> within a Circuit.");
  },
}) as CircuitsContextValue;

export default React.createContext(defaultValue);