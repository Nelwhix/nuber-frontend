import { createSlice, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const loaderSlice = createSlice({
    name: 'loader',
    initialState: {
        isAnimating: false,
        key: 0
    },
    reducers: {
        start(state) {
            state.isAnimating = true;
            state.key = 1;
        },
        stop(state) {
            state.isAnimating = false;
            state.key = 0;
        }
    },
    extraReducers: {
        [HYDRATE]: (state) => {
          return {
            ...state,
          };
        },
    }
})

export const { start, stop } = loaderSlice.actions

export const makeStore = () => configureStore({
  reducer: {
    [loaderSlice.name]: loaderSlice.reducer
  },
  devTools: true  
})

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const wrapper = createWrapper<AppStore>(makeStore);

