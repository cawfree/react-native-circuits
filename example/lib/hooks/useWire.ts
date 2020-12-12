import * as React from 'react';
import {nanoid} from 'nanoid/non-secure';

import type {Wire, useWireParams} from '../types';

export default function useWire({renderWire}: useWireParams): Wire {
  const wireId = React.useMemo(nanoid, []);
  return React.useMemo(() => ({wireId, renderWire}), [renderWire]);
}
