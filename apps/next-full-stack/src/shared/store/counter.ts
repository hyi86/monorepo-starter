import { createStore } from 'zustand/vanilla';

type CounterState = {
  count: number;
  isLoading: boolean;
  lastUpdated: Date | null;
};

type CounterActions = {
  increment: () => void;
  decrement: () => void;
  incrementBy: (amount: number) => void;
  decrementBy: (amount: number) => void;
  reset: () => void;
  setCount: (count: number) => void;
  setLoading: (loading: boolean) => void;
  init: () => void;
};

export const initCounterStore = (): CounterState => ({
  count: 0,
  isLoading: false,
  lastUpdated: null,
});

export const createCounterStore = (initState = initCounterStore()) =>
  createStore<CounterState & CounterActions>()((set) => {
    return {
      ...initState,
      increment: () =>
        set((state) => ({
          count: state.count + 1,
          lastUpdated: new Date(),
        })),
      decrement: () =>
        set((state) => ({
          count: state.count - 1,
          lastUpdated: new Date(),
        })),
      incrementBy: (amount: number) =>
        set((state) => ({
          count: state.count + amount,
          lastUpdated: new Date(),
        })),
      decrementBy: (amount: number) =>
        set((state) => ({
          count: state.count - amount,
          lastUpdated: new Date(),
        })),
      reset: () =>
        set({
          count: 0,
          lastUpdated: new Date(),
        }),
      setCount: (count: number) =>
        set({
          count,
          lastUpdated: new Date(),
        }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
      init: () => {
        set(initCounterStore());
      },
    };
  });
