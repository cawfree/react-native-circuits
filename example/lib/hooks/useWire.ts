import * as React from 'react';
import {nanoid} from 'nanoid/non-secure';

import type {Wire, useRenderWireResult} from '../types';

export default function useWire({renderWire, pathProps}: useRenderWireResult): Wire {
  const wireId = React.useMemo(nanoid, []);
  return React.useMemo(() => ({ wireId, renderWire, pathProps }), [
    renderWire,
    pathProps,
  ]);
}
