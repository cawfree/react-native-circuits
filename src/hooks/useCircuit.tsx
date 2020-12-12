import * as React from 'react';

import {CircuitContext} from '../contexts';
import type {CircuitContextValue} from '../types';

export default function useCircuit(): CircuitContextValue {
  return React.useContext(CircuitContext);
}