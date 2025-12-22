'use client';

import { type ReactNode, createContext, useContext, useState } from 'react';
import { useStore } from 'zustand';
import { createCounterStore, initCounterStore } from './counter.store';

type CounterStoreApi = ReturnType<typeof createCounterStore>;

const CounterStoreContext = createContext<CounterStoreApi | undefined>(undefined);

export const CounterStoreProvider = ({ children }: { children: ReactNode }) => {
  // useState의 lazy initialization을 사용하여 store를 한 번만 초기화
  const [store] = useState(() => createCounterStore(initCounterStore()));

  return <CounterStoreContext.Provider value={store}>{children}</CounterStoreContext.Provider>;
};

export const useCounterStore = <T,>(selector: (store: ReturnType<CounterStoreApi['getState']>) => T): T => {
  const counterStoreContext = useContext(CounterStoreContext);
  if (!counterStoreContext) {
    throw new Error(`useCounterStore must be used within CounterStoreProvider`);
  }

  return useStore(counterStoreContext, selector);
};
