import { useState, useEffect } from 'react';

const state = { serverHandoffComplete: false };

export default function useServerHandoffComplete() {
  const [serverHandoffComplete, setServerHandoffComplete] = useState(state.serverHandoffComplete);

  useEffect(() => {
    if (serverHandoffComplete) return;

    setServerHandoffComplete(true);
  }, [serverHandoffComplete]);

  useEffect(() => {
    if (!state.serverHandoffComplete) state.serverHandoffComplete = true;
  }, []);

  return serverHandoffComplete;
}
