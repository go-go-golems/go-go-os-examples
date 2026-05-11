import type { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { createAppStore } from '../app/store';

export function WithStore({ children }: { children: ReactNode }) {
  return <Provider store={createAppStore()}>{children}</Provider>;
}
