import {createStore} from 'zustand/vanilla'

export type CounterState = {
    count: number
}

export type CounterAction = {
    decrementCount: () => void
    incrementCount: () => void
}

export type CounterStore = CounterAction & CounterState

export const defaultInitState:CounterState = {
    count: 0,
}

export const createCounterStore = (
    initState:CounterState = defaultInitState
) => {
    return createStore<CounterStore>()((set) => ({
        ...initState,
        decrementCount: () => set((state) => ({count : state.count - 1})),
        incrementCount: () => set((state) => ({ count: state.count + 1 })),
    }))
}