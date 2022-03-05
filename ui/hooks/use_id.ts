import { useRef } from 'react';

export function randomId() {
  return `${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * react 18 has builtin useId hook but until then just copied it from mantine
 */
export default function useId(id?: string, generateId: () => string = randomId) {
  const generatedId = useRef(generateId());
  return id || generatedId.current;
}
