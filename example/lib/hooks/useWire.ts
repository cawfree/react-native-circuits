import * as React from 'react';
import {nanoid} from 'nanoid/non-secure';

import {useWireParams, useWireResult} from '../types';

export default function useWire({ renderWire }: useWireParams): useWireResult {
  const wireId = React.useMemo(nanoid, []);
  return React.useMemo(() => ({ wireId, renderWire }), [wireId, renderWire]);
}
