import { createSlice, configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const appSlice = createSlice({
    name: 'appStore',
    initialState: {
        isAnimating: false,
        key: 0,
        mobile: ""
    },
    reducers: {
        start(state) {
            state.isAnimating = true;
            state.key = 1;
        },
        stop(state) {
            state.isAnimating = false;
            state.key = 0;
        },
        setMobile(state, action) {
            state.mobile = action.payload
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

export const { start, stop, setMobile } = appSlice.actions

export const makeStore = () => configureStore({
  reducer: {
    [appSlice.name]: appSlice.reducer
  },
  devTools: true  
})

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const wrapper = createWrapper<AppStore>(makeStore);

