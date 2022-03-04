import { useState } from 'react';

import useServerHandoffComplete from './use_server_handoff_complete';
import useIsoMorphicEffect from './use_isomorphic_effect';

let id = 0;

function generateId() {
  id += 1;
  return id;
}

export default function useId() {
  const ready = useServerHandoffComplete();
  const [_id, setId] = useState(ready ? generateId : null);

  useIsoMorphicEffect(() => {
    if (_id === null) setId(generateId());
  }, [_id]);

  return `${_id}`;
}
