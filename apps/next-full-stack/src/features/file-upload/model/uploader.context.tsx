'use client';

import { type ReactNode, createContext, useContext, useState } from 'react';
import { useStore } from 'zustand';
import { createUploaderStore, initUploaderStore } from '~/features/file-upload/lib/uploader';

type UploaderStoreApi = ReturnType<typeof createUploaderStore>;

const UploaderStoreContext = createContext<UploaderStoreApi | undefined>(undefined);

export const UploaderStoreProvider = ({ children }: { children: ReactNode }) => {
  // useState의 lazy initialization을 사용하여 store를 한 번만 초기화
  const [store] = useState(() => createUploaderStore(initUploaderStore()));

  return <UploaderStoreContext.Provider value={store}>{children}</UploaderStoreContext.Provider>;
};

export const useUploaderStore = <T,>(selector: (store: ReturnType<UploaderStoreApi['getState']>) => T): T => {
  const uploaderStoreContext = useContext(UploaderStoreContext);
  if (!uploaderStoreContext) {
    throw new Error(`useUploaderStore must be used within UploaderStoreProvider`);
  }

  return useStore(uploaderStoreContext, selector);
};
