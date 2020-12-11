import * as React from 'react';

import {CircuitsContext} from '../contexts';
import type {CircuitsContextValue} from '../types';

export default function useCircuits(): CircuitsContextValue {
  return React.useContext(CircuitsContext);
}
